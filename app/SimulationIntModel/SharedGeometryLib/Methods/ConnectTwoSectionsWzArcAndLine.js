

import getIntersectedPointByPoints from "./GetIntersectedPointByPoints";
import getDistBtwTwoPoints from "./GetDistBtwTwoPoints";
import getPerpendicularLineByTwoPoints from "./GetPerpendicularLineByTwoPoints";
import getIntersectedPointBySlopeAndIntersect from "./GetIntersectedPointBySlopeAndIntersect";
import getArc from "./GetArc";

import getAbFromTwoPoints from "./GetAbFromTwoPoints";
import testIfPointOnRay from "./TestIfPointOnRay";
import testIfPointOnLineByTwoPoints from "./TestIfPointOnLineByTwoPoints";
/************************************************************************
	Connect two sections with arc and lines (which will be merged as a curve
	by using Three.js

	 - Input:
	 	1. l1sp: [x, y]  //start point of line 1, which will be the start point of the result curve
	 	2. l1ep: [x, y]  //end point of line 1
	 	3. l2sp: [x, y]	 //start point of line 2, which will be the end point of the result curve
	 	4. l2ep: [x, y]  //end point of line 2
	 	5. ifClockWise: boolean  //in case of parallel rays sharing the same direction, ifClockWise would decide
	 						//the cap arc clockwise or nor
	 	5. accuracy: a number

	 - Output:
	 	An instance of THREE.Path if the two lines intersected or the two rays share the same direction.
	 	Null, if the two lines have no intersect point and the two rays have opposite direction.

	Note:
		The path may be a pure arc or an arc and a line. The path would start
		from l1sp and end at l2sp.
************************************************************************/


const connectTwoSectionsWzArcAndLine = (THREE, l1sp, l1ep, l2sp, l2ep, ifClockWise, accuracy) => {

	let connectedCurve = null;

	const ifL2spOnl1 = testIfPointOnLineByTwoPoints(
						l2sp[0], l2sp[1],
						l1sp[0], l1sp[1],
						l1ep[0], l1ep[1],
						accuracy
					);
	const ifL2epOnl1 = testIfPointOnLineByTwoPoints(
						l2ep[0], l2ep[1],
						l1sp[0], l1sp[1],
						l1ep[0], l1ep[1],
						accuracy
					);

	// *************** check if l1 and l2sp are the same ****************
	if (Math.abs(l1sp[0] - l2sp[0]) < accuracy && Math.abs(l1sp[1] - l2sp[1]) < accuracy) {
		connectedCurve = new THREE.Path();
		connectedCurve.moveTo(l1sp[0], l1sp[1]);
		connectedCurve.lineTo(l2sp[0], l2sp[1]);
	}
	// *************** check if l1 and l2 are one the same line ****************
	else if (ifL2spOnl1 && ifL2epOnl1) {
		connectedCurve = new THREE.Path();
		connectedCurve.moveTo(l1sp[0], l1sp[1]);
		connectedCurve.lineTo(l2sp[0], l2sp[1]);
	}
	// else:
	else {
		// *************** get inter point *******************
		const getInterPoint = getIntersectedPointByPoints;
		const interPoint = getInterPoint(
							l1sp[0], l1sp[1],
							l1ep[0], l1ep[1],
							l2sp[0], l2sp[1],
							l2ep[0], l2ep[1],
							accuracy
						);
		//need to continue calculation when the two lines has intersect point
		if (interPoint) {
			// *************** get the dist btw interPoint and the two start points *******************
			const dist1 = getDistBtwTwoPoints(l1sp[0], l1sp[1], interPoint[0], interPoint[1]);
			const dist2 = getDistBtwTwoPoints(l2sp[0], l2sp[1], interPoint[0], interPoint[1]);

			// *************** decide arc start and end points *******************
			const dist = Math.min(dist1, dist2);

			let arcSp, arcEp;
			if (dist === dist1) {
				arcSp = l1sp;

				const arcEpVec = new THREE.Vector2(
									l2sp[0] - interPoint[0],
									l2sp[1] - interPoint[1]
								);
				arcEpVec.setLength(dist);
				arcEpVec.add(new THREE.Vector2(interPoint[0], interPoint[1]));
				arcEp = [arcEpVec.x, arcEpVec.y];
			}
			else {
				const arcSpVec = new THREE.Vector2(
									l1sp[0] - interPoint[0],
									l1sp[1] - interPoint[1]
								);
				arcSpVec.setLength(dist);
				arcSpVec.add(new THREE.Vector2(interPoint[0], interPoint[1]));
				arcSp = [arcSpVec.x, arcSpVec.y];

				arcEp = l2sp;
			}

			// *************** decide arc circle center point *******************
			const arcSpSpoke = getPerpendicularLineByTwoPoints(
								arcSp[0], arcSp[1],
								interPoint[0], interPoint[1],
								arcSp[0], arcSp[1],
								accuracy
							);   //{a:xxx, b:xxx}

			const arcEpSpoke = getPerpendicularLineByTwoPoints(
								arcEp[0], arcEp[1],
								interPoint[0], interPoint[1],
								arcEp[0], arcEp[1],
								accuracy
							);   //{a:xxx, b:xxx}

			const centerP = getIntersectedPointBySlopeAndIntersect(
								arcSpSpoke.a, arcSpSpoke.b,
								arcEpSpoke.a, arcEpSpoke.b,
								accuracy
							);

			// *************** decide arc radius *******************
			const r = getDistBtwTwoPoints(arcSp[0], arcSp[1], centerP[0], centerP[1]);


			// *************** build arc *******************
			const arc = getArc(
							THREE, centerP[0], centerP[1],
							arcSp[0], arcSp[1], arcEp[0], arcEp[1],
							r
						);

			// *************** build connected curve *******************
			connectedCurve = new THREE.Path();
			connectedCurve.moveTo(l1sp[0], l1sp[1]);
			connectedCurve.lineTo(arcSp[0], arcSp[1]);
			connectedCurve.add(arc);
			connectedCurve.moveTo(arcEp[0], arcEp[1]);
			connectedCurve.lineTo(l2sp[0], l2sp[1]);

		}
		//else, the two rays have no intersect point but may share the same direction
		else {
			const l1Vec = new THREE.Vector2(
							l1ep[0] - l1sp[0],
							l1ep[1] - l1ep[1]
						);
			const l2Vec = new THREE.Vector2(
							l2ep[0] - l2sp[0],
							l2ep[1] - l2ep[1]
						);

			const ifSameDir = (l1Vec.angle() === l2Vec.angle()) ? true : false;

			//if same direction, need to calculate:
			if (ifSameDir) {
				// ******************* decide interPoint1, interPoint2 ********************
				const l1PerpLine = getPerpendicularLineByTwoPoints(
									l1sp[0], l1sp[1],
									l1ep[0], l1ep[1],
									l1sp[0], l1sp[1],
									accuracy
								);   //{a:xxx, b:xxx}

				const l2ab = getAbFromTwoPoints(
								l2sp[0], l2ep[0], l2sp[1], l2ep[1], accuracy
							);   //{a:xxx, b:xxx}

				const interPoint1 = getIntersectedPointBySlopeAndIntersect(
									l1PerpLine.a, l1PerpLine.b,
									l2ab.a, l2ab.b,
									accuracy
								);  //intersect point of perp line 1 and line 2

				const ifInterPoint1OnL2 = testIfPointOnRay(
											interPoint1[0], interPoint1[1],
											l2sp[0], l2sp[1],
											l2ep[0], l2ep[1],
											accuracy
										);


				const l2PerpLine = getPerpendicularLineByTwoPoints(
									l2sp[0], l2sp[1],
									l2ep[0], l2ep[1],
									l2sp[0], l2sp[1],
									accuracy
								);   //{a:xxx, b:xxx}

				const l1ab = getAbFromTwoPoints(
								l1sp[0], l1ep[0], l1sp[1], l1ep[1], accuracy
							);   //{a:xxx, b:xxx}

				const interPoint2 = getIntersectedPointBySlopeAndIntersect(
									l2PerpLine.a, l2PerpLine.b,
									l1ab.a, l1ab.b,
									accuracy
								);  //intersect point of perp line 2 and line 1

				//console.log(interPoint1, l2sp, l2ep, interPoint2)

				// ******************* decide arcSp, arcEp, centerP ********************
				let arcSp, arcEp, centerP;
				if (ifInterPoint1OnL2) {
					arcSp = interPoint2;
					arcEp = l2sp;
				}
				else {
					arcSp = l1sp;
					arcEp = interPoint1;
				}

				centerP = [(arcSp[0] + arcEp[0]) / 2, (arcSp[1] + arcEp[1]) / 2];

				// ******************* decide radius *******************
				const r = getDistBtwTwoPoints(
							arcSp[0], arcSp[1], centerP[0], centerP[1]
						);

				// ******************* build arc *******************
				const arcSpVec = new THREE.Vector2(
									arcSp[0] - centerP[0],
									arcSp[1] - centerP[1]
								);
				const arcEpVec = new THREE.Vector2(
									arcEp[0] - centerP[0],
									arcEp[1] - centerP[1]
								);

				const startAngle = arcSpVec.angle();
				const endAngle = arcEpVec.angle();

				const arcShape = new THREE.Shape([new THREE.Vector2(arcSp[0], arcSp[1])]);
				arcShape.absarc(
					centerP[0], centerP[1], r,
					startAngle, endAngle, ifClockWise
				);

				const arc = arcShape.curves[0];

				// ******************* build curve *******************
				connectedCurve = new THREE.Path();
				connectedCurve.moveTo(l1sp[0], l1sp[1]);
				connectedCurve.lineTo(arcSp[0], arcSp[1]);
				connectedCurve.add(arc);
				connectedCurve.moveTo(arcEp[0], arcEp[1]);
				connectedCurve.lineTo(l2sp[0], l2sp[1]);
			}
		}
	}


	return connectedCurve;
};



export default connectTwoSectionsWzArcAndLine;
