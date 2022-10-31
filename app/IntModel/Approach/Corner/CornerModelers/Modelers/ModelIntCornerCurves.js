

import SharedGeometryLib from "../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		corner outline (curves) of the int corner

	Would update:
		1. corner.cornerGeo.intCornerGeo.outerArcPoints = an array of [x, y]
			(Refers to points on the outer arc. The array would start from the point on the
			curApp outer right side and end with the point on the neiApp outer left
			side. In normal case, there would be only two points. In special case, there
			would be four points.)
		2. corner.cornerGeo.intCornerGeo.curAppCornerLength = d1;
			(Refers to the corner length in meters on the current approach side.)
		3. corner.cornerGeo.intCornerGeo.neiAppCornerLength = d2;
			(Refers to the corner length in meters on the neighbor approach side.)
		4. corner.cornerGeo.intCornerGeo.outerArcMidPoint = [x, y];
			(Refers to the middle point of the outer arc.)
		5. corner.cornerShape.intCornerShape.cornerCurves = [instance], an array instance of THREE.js Shape.
			(In normal case, there would be one instance. In some cases, there would be two instances.
				In special case, there is no need to calculate and draw corner when the angle between
				the two approaches is greater than 180. Thus cornerCurves would be [].
			)
**************************************************************************/
const modelIntCornerCurves = (curApp, corner, intSize, meterToPixel, accuracy) => {

	//************************ Prepare necessary parameters **********************
	const sharedGeometryLib = new SharedGeometryLib(corner.THREE);
	//current approach parameters:
	const curAppRightSp = curApp.appGeo.outerRightSp;  //current approach right outer side start point [x, y]
	const curAppRightEp = curApp.appGeo.outerRightEndPoint; //right outer side end point
	const curAppRightOs = curApp.appGeo.outerSides[0]; //current approach right outer side {a:xx, b:xx}
	const curAppAngle = curApp.appAngle;  //current approach angle
	const appCount = curApp.intersection.approaches.length; //number of approaches of the intersection

	//neighbor approach refers to the counter clockwise neighbor approach:
	const curAppIndex = curApp.appId;
	const neiAppIndex = (curAppIndex > 0) ? (curAppIndex - 1) : (appCount - 1);
	const neiApp = curApp.intersection.approaches[neiAppIndex];

	const neiAppLeftSp = neiApp.appGeo.outerLeftSp;  //neighbor approach left outer side start point
	const neiAppLeftEp = neiApp.appGeo.outerLeftEndPoint; //neighbor approach left outer side end point
	const neiAppLeftOs = neiApp.appGeo.outerSides[1];  //neighbor approach left outer side {a:xx, b:xx}
	const neiAppAngle = neiApp.appAngle;  //neighbor approach angle

	//***************** Check counter clockwise angle between the two approaches **************
	//counter clockwise angle between current approach and its neighbor approach:

	let angleBetween;
	//usually, curAppAngle should be greater than its counter clockwise neighbor:
	if (curAppAngle > neiAppAngle) {
		angleBetween = curAppAngle - neiAppAngle;  //in degrees
	}
	//else, curApp is the first approach:
	else {
		angleBetween = curAppAngle + 360 - neiAppAngle;  //in degrees
	}

	//need to draw corner only if angle between the two approaches is less than 180 degrees:
	if (angleBetween < 180) {
		const getPointOfTwoLine = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;

		const curNeiAppInterPoint = getPointOfTwoLine(
										curAppRightOs.a, curAppRightOs.b,
										neiAppLeftOs.a, neiAppLeftOs.b
									);


		const getCcwAngleBtwTwoLine = sharedGeometryLib.getCcwAngleBtwTwoLine;
		const ccwAngle = getCcwAngleBtwTwoLine(
							curAppRightEp[0], curAppRightEp[1],
							neiAppLeftEp[0], neiAppLeftEp[1],
							curNeiAppInterPoint[0], curNeiAppInterPoint[1],
							accuracy
						);

		//it is an error if null
		if (getCcwAngleBtwTwoLine === null) {
			const error = new Error("Two approaches shared the same end point. Model went wrong...");
			throw error;
		}
		//only need to add corner if angle is less than 180 degrees
		else if (ccwAngle < Math.PI) {
			//***************** Check if normal or special case **************
			let ifNormalCase;
			let checkCurve; //an THREE.js shape instance to check if special case
			let tangentCircleCp; //circle center point [x, y]
			const r = corner.cornerRadius * meterToPixel;
			const ifPointBtwTwoPoints = sharedGeometryLib.testIfPointBtwTwoPoints;
			const getTangentCenterPoint = sharedGeometryLib.getTangentCenterPoint;
			const connectLinesWzArc = sharedGeometryLib.connectIntersectedLinesWzArc;
			const getDistFromPointToLine = sharedGeometryLib.getDistFromPointToLine;
			const distBtwPoints = sharedGeometryLib.getDistBtwTwoPoints;
			checkCurve = connectLinesWzArc(
							curAppRightEp[0], curAppRightEp[1],
							neiAppLeftEp[0], neiAppLeftEp[1],
							curNeiAppInterPoint[0], curNeiAppInterPoint[1],
							r, accuracy
						);

			tangentCircleCp = getTangentCenterPoint(
							curAppRightEp[0], curAppRightEp[1],
							neiAppLeftEp[0], neiAppLeftEp[1],
							curNeiAppInterPoint[0], curNeiAppInterPoint[1],
							r, accuracy
						);

			//if curApp right end point and neiApp left end point are the same, it is normal case:
			if ((Math.abs(curAppRightSp[0] - neiAppLeftSp[0]) < accuracy) && (Math.abs(curAppRightSp[1] - neiAppLeftSp[1]) < accuracy)) {
				ifNormalCase = true;
			}
			//else it needs further check:
			else {
				const checkCurveSp = checkCurve.curves[0].getPoint(0);
				const checkCurveEp = checkCurve.curves[0].getPoint(1);
				//check if arc sp is between right outer start point and inter point:
				const ifArcSpBtw = ifPointBtwTwoPoints(
									checkCurveSp.x, checkCurveSp.y,
									curAppRightSp[0], curAppRightSp[1],
									curNeiAppInterPoint[0], curNeiAppInterPoint[0],
									accuracy
								);
				//check if arc ep is between left outer start point and inter point:
				const ifArcEpBtw = ifPointBtwTwoPoints(
									checkCurveEp.x, checkCurveEp.y,
									neiAppLeftSp[0], neiAppLeftSp[1],
									curNeiAppInterPoint[0], curNeiAppInterPoint[1],
									accuracy
								);

				/*
				//check if current right side sp is between arc sp and inter point:
				const ifSpBtw = ifPointBtwTwoPoints(
								curAppRightSp[0], curAppRightSp[1],
								checkCurveSp.x, checkCurveSp.y,
								curNeiAppInterPoint[0], curNeiAppInterPoint[0],
								accuracy
							);


				//check if nei left side sp is between arc ep and inter point:
				const ifEpBtw = ifPointBtwTwoPoints(
								neiAppLeftSp[0], neiAppLeftSp[1],
								checkCurveEp.x, checkCurveEp.y,
								curNeiAppInterPoint[0], curNeiAppInterPoint[0],
								accuracy
							);
				*/

				//check dist from circle center to line of approach sides' start points:
				const dist = getDistFromPointToLine(
								tangentCircleCp[0], tangentCircleCp[1],
								curAppRightSp[0], curAppRightSp[1],
								curAppRightSp[0], curAppRightSp[1]
							);

				const ifCircleInterSide = (dist > r) ? false : true;


				if ((ifArcSpBtw || ifArcEpBtw) && ifCircleInterSide) {
					ifNormalCase = false;
				}
				/*
				else if ((ifSpBtw || ifEpBtw) && ifCircleInterSide) {
					ifNormalCase = true;
				}
				*/
				else {
					ifNormalCase = true;
				}

				//ifNormalCase = (ifArcSpBtw && ifArcEpBtw) ? false : true;
			}



			//***************** Calculate outer cureve & corner shape for normal case **************
			if (ifNormalCase) {
				const outerCurve = checkCurve;
				const outerCurveSp = [outerCurve.curves[0].getPoint(0).x, outerCurve.curves[0].getPoint(0).y];
				const outerCurveEp = [outerCurve.curves[0].getPoint(1).x, outerCurve.curves[0].getPoint(1).y];
				const cornerCurves = new corner.THREE.Shape();
				const cornerType = corner.cornerType;  //1 for polyline, 2 for arc, 3 for arc and island

				cornerCurves.moveTo(curNeiAppInterPoint[0], curNeiAppInterPoint[1]);

				//cornerCurves.moveTo(curAppRightSp[0], curAppRightSp[1]);
				cornerCurves.lineTo(outerCurveSp[0], outerCurveSp[1]);
				//polyline:
				if (cornerType === 1) {
					cornerCurves.lineTo(outerCurveEp[0], outerCurveEp[1]);
				}
				//curves:
				else {
					cornerCurves.add(outerCurve.curves[0]);
					cornerCurves.moveTo(outerCurveEp[0], outerCurveEp[1]);
				}
				//cornerCurves.lineTo(neiAppLeftSp[0], neiAppLeftSp[1]);
				cornerCurves.closePath();

				const curAppCornerLength = distBtwPoints(
										outerCurveSp[0], outerCurveSp[1],
										curAppRightSp[0], curAppRightSp[1]
									);
				const neiAppCornerLength = distBtwPoints(
										outerCurveEp[0], outerCurveEp[1],
										neiAppLeftSp[0], neiAppLeftSp[1]
									);


				//update cornerShape and cornerGeo:
				corner.cornerGeo.intCornerGeo.outerArcPoints = [outerCurveSp, outerCurveEp];
				corner.cornerGeo.intCornerGeo.curAppCornerLength = curAppCornerLength;
				corner.cornerGeo.intCornerGeo.neiAppCornerLength = neiAppCornerLength;
				corner.cornerGeo.intCornerGeo.outerArcMidPoint = [
					outerCurve.curves[0].getPoint(0.5).x,
					outerCurve.curves[0].getPoint(0.5).y
				];

				corner.cornerShape.intCornerShape.cornerCurves = [cornerCurves];

			}
			//***************** Calculate outer cureves & corner shapes for special case **************
			else {
				//there would be two outer curves in this case
				//outerCurve1 is attached to curApp, while outerCurve2 attached to neiApp

				//curve1:
				const outerCurve1 = connectLinesWzArc(
										curAppRightEp[0], curAppRightEp[1],
										neiAppLeftSp[0], neiAppLeftSp[1],
										curAppRightSp[0], curAppRightSp[1],
										r, accuracy
									);
				const outerCurve1Sp = [outerCurve1.curves[0].getPoint(0).x, outerCurve1.curves[0].getPoint(0).y];
				const outerCurve1Ep = [outerCurve1.curves[0].getPoint(1).x, outerCurve1.curves[0].getPoint(1).y];
				const cornerType = corner.cornerType;  //1 for polyline, 2 for arc, 3 for arc and island

				//curve1:
				const cornerCurves1 = new corner.THREE.Shape();
				cornerCurves1.moveTo(curAppRightSp[0], curAppRightSp[1]);
				cornerCurves1.lineTo(outerCurve1Sp[0], outerCurve1Sp[1]);
				//polyline:
				if (cornerType === 1) {
					cornerCurves1.lineTo(outerCurve1Ep[0], outerCurve1Ep[1]);
				}
				//curves:
				else {
					cornerCurves1.add(outerCurve1.curves[0]);
					cornerCurves1.moveTo(outerCurve1Ep[0], outerCurve1Ep[1]);
				}
				cornerCurves1.closePath();



				//curve2:
				const outerCurve2 = connectLinesWzArc(
										neiAppLeftEp[0], neiAppLeftEp[1],
										curAppRightSp[0], curAppRightSp[1],
										neiAppLeftSp[0], neiAppLeftSp[1],
										r, accuracy
									);

				const outerCurve2Sp = [outerCurve2.curves[0].getPoint(0).x, outerCurve2.curves[0].getPoint(0).y];
				const outerCurve2Ep = [outerCurve2.curves[0].getPoint(1).x, outerCurve2.curves[0].getPoint(1).y];

				const cornerCurves2 = new corner.THREE.Shape();
				cornerCurves2.moveTo(neiAppLeftSp[0], neiAppLeftSp[1]);
				cornerCurves2.lineTo(outerCurve2Sp[0], outerCurve2Sp[1]);
				if (cornerType === 1) {
					cornerCurves2.lineTo(outerCurve2Ep[0], outerCurve2Ep[1]);
				}
				else {
					cornerCurves2.add(outerCurve2.curves[0]);
					cornerCurves2.moveTo(outerCurve2Ep[0], outerCurve2Ep[1]);
				}
				cornerCurves2.closePath();


				const curAppCornerLength = distBtwPoints(
										outerCurve1Sp[0], outerCurve1Sp[1],
										curAppRightSp[0], curAppRightSp[1]
									);
				const neiAppCornerLength = distBtwPoints(
										outerCurve2Sp[0], outerCurve2Sp[1],
										neiAppLeftSp[0], neiAppLeftSp[1]
									);


				//update cornerShape and cornerGeo:
				corner.cornerGeo.intCornerGeo.outerArcPoints = [outerCurve1Sp, outerCurve1Ep, outerCurve2Sp, outerCurve2Ep];
				corner.cornerGeo.intCornerGeo.curAppCornerLength = curAppCornerLength;
				corner.cornerGeo.intCornerGeo.neiAppCornerLength = neiAppCornerLength;
				corner.cornerGeo.intCornerGeo.outerArcMidPoint = [
					(outerCurve1Ep[0] + outerCurve2Ep[0]) / 2,
					(outerCurve1Ep[1] + outerCurve2Ep[1]) / 2
				];

				corner.cornerShape.intCornerShape.cornerCurves = [cornerCurves1, cornerCurves2];

			}
		}


	}
	//else, no need to calculate and draw corner, cornerCurves should be an empty array
	else {
		corner.cornerShape.intCornerShape.cornerCurves = [];
	}






};

export default modelIntCornerCurves;
