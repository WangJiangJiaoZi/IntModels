

import SharedGeometryLib from "../../../../../SharedGeometryLib";
/**************************************************************************
	Would model:
		End points of the crosswalk (for intersection only, not roundabout).

	Would update:
		1. crosswalk.crosswalkGeo.endPoints = [[x1, y1], [x2, y2]];
		 	([x1, y1] would be the inner end point while [x2, y2] is the outer one.)
		2. crosswalk.crosswalkGeo.ifIslandEnd = true / false;
			(if the crosswalk ends at an island or not.)

	Note:
		The crosswalkAngle would be ignored if the crosswalk would
		end at neighbor approach island while the island is wide enough.

		The crosswalkAngle would function if the crosswalk would NOT
		end at an island either because the island is too small or because
		there is no island at all. In this case the crosswalk would end at
		approach left outer side no matter what.
**************************************************************************/

const modelIntCrosswalkEps = (crosswalk, intSize, meterToPixel, accuracy) => {

	const sharedGeometryLib = new SharedGeometryLib(crosswalk.THREE);

	//*************************** Prepare parameters **************************
	const curApp = crosswalk.approach;
	const neiAppIndex = (curApp.appId === curApp.intersection.approaches.length - 1) ? 0 : curApp.appId + 1;
	const neiApp = curApp.intersection.approaches[neiAppIndex];
	const neiCorner = neiApp.corner;
	const neiCornerType = neiCorner.cornerType;

	const cwWidth = crosswalk.crossswalkWidth * meterToPixel;  //in pixel
	let cwOffset = crosswalk.crosswalkOffset * meterToPixel;  //in pixel
	let cwAngle = crosswalk.crosswalkAngle;
	let neiAppIslandLength = 0;


	//****************** Decide if crosswalk ends at island ******************
	let ifIslandEnd;

	//if there is no island, won't end at island...
	if (neiCornerType < 3) {
		ifIslandEnd = false;
	}
	//if there is island:
	else {
		neiAppIslandLength = neiCorner.cornerGeo.intCornerGeo.neiAppIslandLength;

		//if the island is wide enough, end at it.
		ifIslandEnd = (neiAppIslandLength > 1.5 * cwWidth) ? true : false;
	}

	let innerEp, outerEp;
	const getPointMovedFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;



	//****************** Calculate end points if ends at island ******************
	if (ifIslandEnd) {
		const islandTip = neiCorner.cornerGeo.intCornerGeo.islandTip;
		const islandArcEp = neiCorner.cornerGeo.intCornerGeo.innerArcPoints[1];
		const neiAppIslandMidPoint = neiCorner.cornerGeo.intCornerGeo.neiAppIslandMidPoint;

		innerEp = getPointMovedFromAtoB(
					neiAppIslandMidPoint[0], neiAppIslandMidPoint[1],
					islandTip[0], islandTip[1],
					cwWidth * 0.88
				);

		outerEp = getPointMovedFromAtoB(
					neiAppIslandMidPoint[0], neiAppIslandMidPoint[1],
					islandArcEp[0], islandArcEp[1],
					cwWidth * 0.12
				);

		crosswalk.crosswalkGeo.ifIslandEnd = true;

	}


	//****************** Calculate end points if ends road side ******************
	//In this case the crosswalk would end at approach left outer side no matter what.
	//(The storage length might be too short thus the crosswalk might extend outside approach...)
	else {
		//****************** if crosswalkAngle is 0 (which means "auto") ******************
		if (cwAngle === 0) {
			const curAppOuterLeftSp = curApp.appGeo.outerLeftSp;
			const curAppOuterLeftEp = curApp.appGeo.outerLeftEndPoint;

			innerEp = getPointMovedFromAtoB(
					curAppOuterLeftSp[0], curAppOuterLeftSp[1],
					curAppOuterLeftEp[0], curAppOuterLeftEp[1],
					cwOffset
				);

			outerEp = getPointMovedFromAtoB(
					curAppOuterLeftSp[0], curAppOuterLeftSp[1],
					curAppOuterLeftEp[0], curAppOuterLeftEp[1],
					cwOffset + cwWidth
				);
		}
		//****************** else, crosswalkAngle does matter ******************
		else {
			cwAngle = Math.PI * cwAngle / 180; //degree to radian
			const innerSp = crosswalk.crosswalkGeo.startPoints[0];
			const outerSp = crosswalk.crosswalkGeo.startPoints[1];

			const curAppOuterLeftSide = curApp.appGeo.outerSides[1];

			//const xAxis = new THREE.Vector3(1, 1, 0);
			const zAxis = new crosswalk.THREE.Vector3(0, 0, 1);
			//vector to rotate
			const vector = new crosswalk.THREE.Vector3(
				-innerSp[0] + outerSp[0], -innerSp[1] + outerSp[1], 0
			);

			//rotate the vector to get the desired vector:
			vector.applyAxisAngle(zAxis, cwAngle);
			vector.normalize();

			let a, innerB, outerB;  //slope and intersect of the crosswalk inner line and outer line
			a = (Math.abs(vector.x) > accuracy) ? (vector.y / vector.x) : null;
			innerB = (a === null) ? innerSp[0] : (innerSp[1] - a * innerSp[0]);
			outerB = (a === null) ? outerSp[0] : (outerSp[1] - a * outerSp[0]);

			const getInterPointBy = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;
			innerEp = getInterPointBy(
						curAppOuterLeftSide.a, curAppOuterLeftSide.b,
						a, innerB, accuracy
					);

			outerEp = getInterPointBy(
						curAppOuterLeftSide.a, curAppOuterLeftSide.b,
						a, outerB, accuracy
					);

		}

		crosswalk.crosswalkGeo.ifIslandEnd = false;


	}

	crosswalk.crosswalkGeo.endPoints = [innerEp, outerEp];

};


export default modelIntCrosswalkEps;
