
import SharedGeometryLib from "../../../../SharedGeometryLib";


/**************************************************************************
	Would model:
		Outline curves of the approach.

	Would update:

		approach.appGeo.rightSideCps = [[x1, y1], [x2, y2]];
			(right side bezier curve control points)
		approach.appGeo.leftSideCp2 = [[x1, y1], [x2, y2]];
			(left side bezier curve control points)

		approach.appShape.curves = an intance of THREE.Shape

	Note:
		Approach curves would start from outer right side start point
			-> right inner side end point
			-> left inner side end point
			-> left outer side start point
			-> back to start
		For roundabout, the last curve (from left outer side start point -> back to start)
		would be an arc
**************************************************************************/

const modelAppCurves = (approach, intSize, type, meterToPixel, accuracy) => {

	//************************** Prepare index to use ********************************
	const sharedGeometryLib = new SharedGeometryLib(approach.THREE);


	const rightOsSp = approach.appGeo.outerRightSp;  //right outer side start point
	const leftOsSp = approach.appGeo.outerLeftSp;  //left outer side start point
	const rightOsEp = approach.appGeo.outerRightEndPoint; //right outer side end point
	const leftOsEp = approach.appGeo.outerLeftEndPoint;  //left outer side end point

	const rightIsEp = approach.appGeo.innerRightEp;  //right inner side end point
	const leftIsEp = approach.appGeo.innerLeftEp;   //left inner side end point


	const rightStorageWidth = approach.inboundStorageWidth; //in meters
	const leftStorageWidth = approach.outboundStorageWidth; //in meters


	const neiAppIndex = (approach.appId === approach.intersection.approaches.length - 1) ? 0 : approach.appId + 1;
	const neiApp = approach.intersection.approaches[neiAppIndex];
	const rightCorner = approach.corner;
	const leftCorner = neiApp.corner;
	let rightCornerLength = rightCorner.cornerGeo.intCornerGeo.curAppCornerLength;  //in meters
	let leftCornerLength = leftCorner.cornerGeo.intCornerGeo.neiAppCornerLength;  //in meters

	//in certain cases, there could be no corner at all:
	rightCornerLength = (rightCornerLength) ? rightCornerLength : 0;
	leftCornerLength = (leftCornerLength) ? leftCornerLength : 0;

	const rightStDist = approach.inboundStorageLength * meterToPixel + rightCornerLength;  //right storage distance (in pixel)
	const rightSlopeDist = approach.inboundSlipLength * meterToPixel;  //right storage slope length (in pixel)
	const leftStDist = approach.outboundStorageLength * meterToPixel + leftCornerLength;  //left storage distance (in pixel)
	const leftSlopeDist = approach.outboundSlipLength * meterToPixel;  //left storage slope length (in pixel)
	const cornerRadius = approach.corner.cornerRadius; //in meters
	const r = (cornerRadius > 5 && cornerRadius < 11) ? (cornerRadius * meterToPixel) : 5 * meterToPixel; //radius in meters


	const getPointMovedDistFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;  //geometry function to use
	const getTwoLineInterPoint = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;
	const connectTwoLineWzCurves = sharedGeometryLib.connectParaLinesWzCurves;


	//************************** Right side curves **************************
	let rightCurves; //right curves would start from "start point" to "end point"

	//only need to prepare bezier curves when there is a storage:
	if (rightStorageWidth !== 0) {
		//Prepare control point 1 (on outer side)
		const rightCp1 =  getPointMovedDistFromAtoB(
								rightOsSp[0], rightOsSp[1],
								rightOsEp[0], rightOsEp[1],
								rightStDist
							);


		//Prepare control point 2 (on inner side)
		const osSpLineA = (Math.abs(rightOsSp[0] - leftOsSp[0]) < accuracy) ? null : ((rightOsSp[1] - leftOsSp[1]) / (rightOsSp[0] - leftOsSp[0]));
		const osSpLineB = (Math.abs(rightOsSp[0] - leftOsSp[0]) < accuracy) ? rightOsSp[0] : rightOsSp[1] - osSpLineA * rightOsSp[0];

		const rightInnerSide = approach.appGeo.innerSides[0]; //in the form of {a: xx, b: xx}

		const rightIsSp = getTwoLineInterPoint(
							osSpLineA, osSpLineB,
							rightInnerSide.a, rightInnerSide.b
						);

		const rightCp2 = getPointMovedDistFromAtoB(
							rightIsSp[0], rightIsSp[1],
							rightIsEp[0], rightIsEp[1],
							rightStDist + rightSlopeDist
						);

		rightCurves = connectTwoLineWzCurves(
						rightCp1, rightCp2,
						rightOsSp, rightIsEp,
						r
					);

		approach.appGeo.rightSideCps = [rightCp1, rightCp2];

	}
	//else, no storage
	else {
		const p1 = new approach.THREE.Vector2(rightOsSp[0], rightOsSp[1]);
		const p2 = new approach.THREE.Vector2(rightIsEp[0], rightIsEp[1]);
		rightCurves = new approach.THREE.Shape([p1, p2]);

		approach.appGeo.rightSideCps = [rightOsSp, rightIsEp];
	}


	//************************** Left side curves **************************
	let leftCurves;  //left curves would start from "end point" to "start point"

	if (leftStorageWidth !== 0) {
		//Prepare control point 1 (on outer side)
		const leftCp1 = getPointMovedDistFromAtoB(
								leftOsSp[0], leftOsSp[1],
								leftOsEp[0], leftOsEp[1],
								leftStDist
							);

		//Prepare control point 2 (on inner side)
		const osSpLineA = (Math.abs(rightOsSp[0] - leftOsSp[0]) < accuracy) ? null : ((rightOsSp[1] - leftOsSp[1]) / (rightOsSp[0] - leftOsSp[0]));
		const osSpLineB = (Math.abs(rightOsSp[0] - leftOsSp[0]) < accuracy) ? rightOsSp[0] : rightOsSp[1] - osSpLineA * rightOsSp[0];

		const leftInnerSide = approach.appGeo.innerSides[1]; //in the form of {a: xx, b: xx}

		const leftIsSp = getTwoLineInterPoint(
							osSpLineA, osSpLineB,
							leftInnerSide.a, leftInnerSide.b
						);

		const leftCp2 = getPointMovedDistFromAtoB(
							leftIsSp[0], leftIsSp[1],
							leftIsEp[0], leftIsEp[1],
							leftStDist + leftSlopeDist
						);


		leftCurves = connectTwoLineWzCurves(
						leftCp2, leftCp1,
						leftIsEp, leftOsSp,
						r
					);

		approach.appGeo.leftSideCps = [leftCp1, leftCp2];
	}
	//else, no storage
	else {
		const p1 = new approach.THREE.Vector2(leftIsEp[0], leftIsEp[1]);
		const p2 = new approach.THREE.Vector2(leftOsSp[0], leftOsSp[1]);
		leftCurves = new approach.THREE.Shape([p1, p2]);

		approach.appGeo.leftSideCps = [leftOsSp, leftIsEp];
	}


	//************************** Build approach curves **************************
	//Approach curves would start from outer right side start point
	//-> right inner side end point
	//-> left inner side end point
	//-> left outer side start point
	//-> back to start
	//Note that for roundabout, the last curve (from left outer side start point -> back to start)
	//would be an arc
	let appCurves;

	const startP = new approach.THREE.Vector2(rightOsSp[0], rightOsSp[1]);
	appCurves = new approach.THREE.Shape([startP]);

	//merge right curves:
	rightCurves.curves.forEach((oneCurve) => {
		appCurves.add(oneCurve);
	});
	appCurves.moveTo(rightCurves.currentPoint.x, rightCurves.currentPoint.y);

	//merge approach end line:
	appCurves.lineTo(leftIsEp[0], leftIsEp[1]);

	//merge left curves:
	leftCurves.curves.forEach((oneCurve) => {
		appCurves.add(oneCurve);
	});
	appCurves.moveTo(leftCurves.currentPoint.x, leftCurves.currentPoint.y);

	//for normal intersection, just close path:
	if (type === "int") {
		appCurves.closePath();
	}
	//for roundabout, it is need to merge an arc of the center roundabout
	else {
		//TBD!
	}

	approach.appShape.curves = appCurves;




};


export default modelAppCurves;

