
import SharedGeometryLib from "../../../../SharedGeometryLib";


/**************************************************************************
	Would model:
		Outer sides start points

	Would update:
		approach.appGeo.outerRightSp = [x1, y1];
		approach.appGeo.outerLeftSp = [x2, y2];

	Note:
		"type" refers to "int" or "roundabout"
**************************************************************************/
const modelAppOuterStartPoints = (approach, intSize, type, accuracy) => {

	const sharedGeometryLib = new SharedGeometryLib(approach.THREE);
	let rightSp, leftSp;
	const rightSpCandidates = [];
	const leftSpCandidates = [];

	const rightA = approach.appGeo.outerSides[0].a;  //right side slope
	const rightB = approach.appGeo.outerSides[0].b;  //right side intersect
	const leftA = approach.appGeo.outerSides[1].a;   //left side slope
	const leftB = approach.appGeo.outerSides[1].b;   //left side intersect
	const rightEp = approach.appGeo.outerRightEndPoint;  //right side end point
	const leftEp = approach.appGeo.outerLeftEndPoint;  //left side end point

	//if calculating start points for "int" intersection (not roundabout):
	if (type === "int") {
		const centerPolyVertex = approach.intersection.intGeo.initCenterPoly;

		//***************************** get candidate points **************************
		//get intersect points of the approach sides and each side (a line segment) of the polygon
		//for each approach side, there could be one or two intesect points (if none, it is an error)
		centerPolyVertex.forEach((curVertex, curVertexIndex) => {
			const nextVertexIndex = curVertexIndex === (centerPolyVertex.length - 1) ? 0 : curVertexIndex + 1;
			const nextVertex = centerPolyVertex[nextVertexIndex];
			const getIntersectPointOfSegmentAndLineByAB = sharedGeometryLib.getIntersectPointOfSegmentAndLineByAB;

			//right side:
			const oneRightP = getIntersectPointOfSegmentAndLineByAB(
									curVertex[0], curVertex[1],
									nextVertex[0], nextVertex[1],
									rightA, rightB, accuracy
								);
			if (oneRightP) {
				rightSpCandidates.push(oneRightP);
			}

			//left side:
			const oneLeftP = getIntersectPointOfSegmentAndLineByAB(
									curVertex[0], curVertex[1],
									nextVertex[0], nextVertex[1],
									leftA, leftB, accuracy
								);
			if (oneLeftP) {
				leftSpCandidates.push(oneLeftP);
			}
		});


		const rightSpCanLength = rightSpCandidates.length;
		const leftSpCanLength = leftSpCandidates.length;

		//***************************** get the correct point **************************
		//since there could be two points for one approach side,
		//it is necessary to find out the correct one,
		//which is the closer one to the approach side's end point.

		//Each side must have one or two intersect point(s) with the convex center polygon.
		//However, due to the computer accuracy, there could be cases that there are more than
		//two points
		if (rightSpCanLength < 1 || leftSpCanLength < 1) {
			const error = new Error("Convex center polygon calculation wrong.");
			throw error;
		}
		else {
			const rightDistBtwEpAndSp = [];
			const leftDistBtwEpAndSp = [];
			const getDistBtwTwoPoints = sharedGeometryLib.getDistBtwTwoPoints;

			//right side:
			rightSpCandidates.forEach((oneSp) => {
				const dist = getDistBtwTwoPoints(oneSp[0], oneSp[1], rightEp[0], rightEp[1]);
				rightDistBtwEpAndSp.push(dist);
			});
			const rightSpIndex = rightDistBtwEpAndSp.indexOf(Math.min(...rightDistBtwEpAndSp));
			rightSp = rightSpCandidates[rightSpIndex];

			//left side:
			leftSpCandidates.forEach((oneSp) => {
				const dist = getDistBtwTwoPoints(oneSp[0], oneSp[1], leftEp[0], leftEp[1]);
				leftDistBtwEpAndSp.push(dist);
			});
			const leftSpIndex = leftDistBtwEpAndSp.indexOf(Math.min(...leftDistBtwEpAndSp));
			leftSp = leftSpCandidates[leftSpIndex];

			approach.appGeo.outerRightSp = rightSp;
			approach.appGeo.outerLeftSp = leftSp;

		}


	}
};


export default modelAppOuterStartPoints;
