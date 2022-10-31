


//import getTangentPointsOf3pAndRadius from "./GetTangentPointsOf3pAndRadius";
import testIfPointOnLineByTwoPoints from "./TestIfPointOnLineByTwoPoints";
import getPointMovedDistFromAtoB from "./GetPointMovedDistFromAtoB";
import getDistBtwTwoPoints from "./GetDistBtwTwoPoints";

/************************************************************************
	Connect two parallel lines with bezier curves (by using Three.js)

	 - Input:
	 	1. control point1: [cp1x, cp2x]  //control point1 should be on line1
	 	2. control point2: [cp2x, cp2y]  //control point2 should be on line2
	 	3. line1 end point: [l1epx, l1epy]
	 	4. line2 end point: [l2epx, l2epy]
	 	5. radius: r  //radius to calculate the bezier curve start and end point
	 - Output: connectionCurve which is an intance of Three.shape

	Note: The four points should be totally different.
************************************************************************/

const connectParaLinesWzCurves = (THREE, cp1, cp2, l1ep, l2ep, r) => {

	/*
	//calculate curves start point:
	let startPoint, startP1, startP2;
	const startPCandidates = getTangentPointsOf3pAndRadius(
								l1ep[0], l1ep[1],
								cp2[0], cp2[1],
								cp1[0], cp1[1],
								r
						);
	startP1 = startPCandidates[0];
	startP2 = startPCandidates[1];
	const ifP1onL1 = testIfPointOnLineByTwoPoints(
						startP1[0], startP1[1],
						l1ep[0], l1ep[1],
						cp1[0], cp1[1]
					);
	startPoint = (ifP1onL1) ? startP1 : startP2;

	//calculate curves end point:
	let endPoint, endP1, endP2;
	const endPCandidates = getTangentPointsOf3pAndRadius(
								l2ep[0], l2ep[1],
								cp1[0], cp1[1],
								cp2[0], cp2[1],
								r
						);
	endP1 = endPCandidates[0];
	endP2 = endPCandidates[1];
	const ifP1onL2 = testIfPointOnLineByTwoPoints(
						endP1[0], endP1[1],
						l2ep[0], l2ep[1],
						cp2[0], cp2[1]
					);
	endPoint = (ifP1onL2) ? endP1 : endP2;

	//calculate the connectionCurve

	const connectionCurve = new THREE.Shape(
							[new THREE.Vector2(startPoint[0], startPoint[1])]
						);
	*/
	const l1epToCp1Dist = getDistBtwTwoPoints(l1ep[0], l1ep[1], cp1[0], cp1[1]);
	const l2epToCp2Dist = getDistBtwTwoPoints(l2ep[0], l2ep[1], cp2[0], cp2[1]);

	let bzStartP = getPointMovedDistFromAtoB(THREE, cp1[0], cp1[1], l1ep[0], l1ep[1], r);
	let bzEndP = getPointMovedDistFromAtoB(THREE, cp2[0], cp2[1], l2ep[0], l2ep[1], r);

	bzStartP = (l1epToCp1Dist > r) ? bzStartP : l1ep;  //bezierCurve start point
	bzEndP = (l2epToCp2Dist > r) ? bzEndP : l2ep;  //bezierCurve end point

	const connectedCurves = new THREE.Shape(
							[new THREE.Vector2(l1ep[0], l1ep[1])]
						);


	connectedCurves.lineTo(bzStartP[0], bzStartP[1]);

	connectedCurves.bezierCurveTo(
		cp1[0], cp1[1],
		cp2[0], cp2[1],
		bzEndP[0], bzEndP[1]
	);

	connectedCurves.lineTo(l2ep[0], l2ep[1]);



	return connectedCurves;

};


export default connectParaLinesWzCurves;
