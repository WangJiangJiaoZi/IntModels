import SharedGeometryLib from "../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		Stop bar geometry for this laneGG.

	Would update laneGGGeo:
		1. laneGG.laneGGGeo.stopInnerSp = [x, y];  //stop bar inner start point
			(the one close to the center polygon and approach side)
		2. laneGG.laneGGGeo.stopInnerEp = [x, y];  //stop bar inner end point
			(the one close to center polygon and road center line)
		3. laneGG.laneGGGeo.stopOuterSp = [x, y];  //stop bar outer start point
			(the one less closer to center polygon but close to approach side)
		4. laneGG.laneGGGeo.stopOuterEp = [x, y];  //stop bar outer end point
			(the one less closer to center polygon but close to road center line)

		5. laneGG.laneGGGeo.innerFinalP = [x, y];  //stop bar inner final point
		6. laneGG.laneGGGeo.outerFinalP = [x, y];  //stop bar outer final point

		7. laneGG.laneGGGeo.stopAngleToEnd = alpha;  //the angle between the stop bar and the approach end

	Would update laneGGShape:
		1. laneGG.laneGGShape.stopBarCurves = an instance of THREE.Shape
**************************************************************************/


const modelIntLaneGGStopBar = (laneGG, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(laneGG.THREE);
	const envSetters = laneGG.approach.intersection.intModel.envSetters;

	const app = laneGG.approach;
	const appIndex = app.appId;
	const intersection = app.intersection;

	const curCorner = app.corner;
	const appRightOsSp = app.appGeo.outerRightSp;  //[x, y]
	const appLeftOsSp = app.appGeo.outerLeftSp;
	const appRightIsEp = app.appGeo.innerRightEp;  //[x, y]
	const appLeftIsEp = app.appGeo.innerLeftEp;  //[x, y]
	const appRightOsEp = app.appGeo.outerRightEndPoint;  //[x, y]
	const appRightOs = app.appGeo.outerSides[0];  //{a: xx, b: xx}
	const crosswalk = app.crosswalk;

	const neiAppIndex = (appIndex === intersection.approaches.length - 1) ? 0 : appIndex + 1;
	const neiApp = intersection.approaches[neiAppIndex];
	const neiCorner = neiApp.corner;

	const ibSideLgWidth = laneGG.laneGGGeo.ibSideLgWidth;  //inbound side road width in pixel
	const ibMainLgWidth = laneGG.laneGGGeo.ibMainLgWidth;  //inbound main road width in pixel
	const ibDivWidth = app.dividerGroup.divGroupGeo.ibDivWidth;  //inbound divider width in pixel

	const stopBarWidth = envSetters.stopBarWidth * meterToPixel; //in pixel

	//************************ Decide start points ************************
	let innerSp, outerSp, innerFinalP;
	const getPointFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
	const getAbFromTwoPoints = sharedGeometryLib.getAbFromTwoPoints;

	//if there is crosswalk on current approach, stop bar would start from crosswalk sp side:
	if (crosswalk.ifCrosswalk) {
		const crosswalkInnerSp = crosswalk.crosswalkGeo.startPoints[0];
		const crosswalkOuterSp = crosswalk.crosswalkGeo.startPoints[1];
		const crosswalkInnerEp = crosswalk.crosswalkGeo.endPoints[0];
		const crosswalkOuterEp = crosswalk.crosswalkGeo.endPoints[1];

		const crosswalkBuffer = crosswalk.crosswalkBuffer * meterToPixel; //in pixel
		const crosswalkWidth = crosswalk.crossswalkWidth * meterToPixel; //in pixel

		//************************ Decide start points ************************
		const getCcwAngleBtwTwoLine = sharedGeometryLib.getCcwAngleBtwTwoLine;

		let angle = getCcwAngleBtwTwoLine(
						crosswalkInnerSp[0], crosswalkInnerSp[1],
						crosswalkInnerEp[0], crosswalkInnerEp[1],
						crosswalkOuterSp[0], crosswalkOuterSp[1],
						accuracy
					);
		let extraShift = 0;  //in pixel
		angle = (angle > Math.PI) ? (Math.PI * 2 - angle) : angle;

		if (angle < Math.PI / 2) {
			const crosswalkHeight = crosswalk.crosswalkHeight * meterToPixel;
			extraShift = crosswalkHeight / Math.tan(angle);
		}


		innerSp = getPointFromAtoB(
					//THREE,
					crosswalkInnerSp[0], crosswalkInnerSp[1],
					crosswalkOuterSp[0], crosswalkOuterSp[1],
					crosswalkWidth + crosswalkBuffer + extraShift
				);  //[x, y]

		outerSp = getPointFromAtoB(
					//THREE,
					crosswalkInnerSp[0], crosswalkInnerSp[1],
					crosswalkOuterSp[0], crosswalkOuterSp[1],
					crosswalkWidth + crosswalkBuffer + stopBarWidth + extraShift
				);  //[x, y]

		//************************ Decide inner final point ************************
		innerFinalP = getPointFromAtoB(
					//THREE,
					crosswalkInnerEp[0], crosswalkInnerEp[1],
					crosswalkOuterEp[0], crosswalkOuterEp[1],
					crosswalkWidth + crosswalkBuffer + extraShift
				);  //[x, y]

	}
	//else, no crosswalk:
	else {
		//************************ Decide start points ************************
		//if there is an corner island on the current side, start from it:
		if (curCorner.cornerType === 3 && curCorner.cornerGeo.intCornerGeo.islandTip) {
			const islandTip = curCorner.cornerGeo.intCornerGeo.islandTip;  //[x, y]
			const innerArcSp = curCorner.cornerGeo.intCornerGeo.innerArcPoints[0];  //[x, y]

			innerSp = islandTip;

			outerSp = getPointFromAtoB(
					//THREE,
					islandTip[0], islandTip[1],
					innerArcSp[0], innerArcSp[1],
					stopBarWidth
				);  //[x, y]
		}
		//no island, start from the approach right side:
		else {
			innerSp = appRightOsSp;
			outerSp = getPointFromAtoB(
					//THREE,
					appRightOsSp[0], appRightOsSp[1],
					appRightOsEp[0], appRightOsEp[1],
					stopBarWidth
				);  //[x, y]
		}


		//************************ Decide inner final point ************************
		if (neiCorner.cornerType === 3 && neiCorner.cornerGeo.intCornerGeo.islandTip) {
			const neiIslandTip = neiCorner.cornerGeo.intCornerGeo.islandTip;
			innerFinalP = neiIslandTip;
		}
		else {
			innerFinalP = appLeftOsSp;
		}
	}


	//************************ Decide inner side ************************
	//refers to line of innerSp to innerEp, would be {a: xx, b: xx}
	const innerSide = getAbFromTwoPoints(
				innerSp[0], innerFinalP[0],
				innerSp[1], innerFinalP[1],
				accuracy
			);  //{a: xx, b: xx}


	//************************ Decide inner initial point ************************
	const getInterPoint = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;
	const innerInitP = getInterPoint(
						innerSide.a, innerSide.b,
						appRightOs.a, appRightOs.b,
						accuracy
					);  //[x, y]


	//************************ Decide end points ************************
	let innerEp, outerEp;
	const inboundWidth = ibSideLgWidth + ibMainLgWidth + ibDivWidth;  //in pixel

	const getPerpLineByPoints = sharedGeometryLib.getPerpendicularLineByTwoPoints;

	const innerSpShadowVec = new laneGG.THREE.Vector2(
								appLeftIsEp[0] - appRightIsEp[0],
								appLeftIsEp[1] - appRightIsEp[1],
							);
	const innerInitPVec = new laneGG.THREE.Vector2(
						innerInitP[0], innerInitP[1]
					);

	innerSpShadowVec.setLength(inboundWidth);
	innerSpShadowVec.add(innerInitPVec);
	const innerSpShadow = [innerSpShadowVec.x, innerSpShadowVec.y];

	const side = getPerpLineByPoints(
					innerSpShadow[0], innerSpShadow[1],
					innerSpShadow[0], innerSpShadow[1],
					innerInitP[0], innerInitP[1],
					accuracy
				);   //{a: xx, b: xx}


	innerEp = getInterPoint(
				innerSide.a, innerSide.b,
				side.a, side.b,
				accuracy
			);

	const outerEpVec = new laneGG.THREE.Vector2(
						appRightOsEp[0] - appRightOsSp[0],
						appRightOsEp[1] - appRightOsSp[1],
					);
	outerEpVec.setLength(stopBarWidth);
	outerEpVec.add(new laneGG.THREE.Vector2(innerEp[0], innerEp[1]));

	outerEp = [outerEpVec.x, outerEpVec.y];

	//************************ Decide outer final point ************************
	const outerFinalPVec = new laneGG.THREE.Vector2(
							outerEp[0] - innerEp[0],
							outerEp[1] - innerEp[1]
						);
	const innerFinalPVec = new laneGG.THREE.Vector2(
							innerFinalP[0], innerFinalP[1]
						);

	outerFinalPVec.add(innerFinalPVec);

	const outerFinalP = [outerFinalPVec.x, outerFinalPVec.y];


	//*************** Decide angle btween stop bar and approach end ****************
	const appEndVec = new laneGG.THREE.Vector3(
						-appRightOsEp[0] + appLeftIsEp[0],
						-appRightOsEp[1] + appLeftIsEp[1],
						0
					);

	const stopBarVec = new laneGG.THREE.Vector3(
						outerFinalP[0] - outerSp[0],
						outerFinalP[1] - outerSp[1],
						0
					);

	const getCcwAngleBtwTwoVectors =  sharedGeometryLib.getCcwAngleBtwTwoVectors;

	let angle = getCcwAngleBtwTwoVectors(appEndVec, stopBarVec);
	angle = (angle > Math.PI) ? (2 * Math.PI -  angle) : angle;

	//************************ Update laneGG geometry ************************
	laneGG.laneGGGeo.stopInnerSp = innerSp;
	laneGG.laneGGGeo.stopInnerEp = innerEp;
	laneGG.laneGGGeo.stopOuterSp = outerSp;
	laneGG.laneGGGeo.stopOuterEp = outerEp;

	laneGG.laneGGGeo.innerFinalP = innerFinalP;
	laneGG.laneGGGeo.outerFinalP = outerFinalP;

	laneGG.laneGGGeo.stopAngleToEnd = angle;

	//************************ Build stop bar curves ************************
	const stopBarCurves = new laneGG.THREE.Shape();

	stopBarCurves.moveTo(innerSp[0], innerSp[1]);
	stopBarCurves.lineTo(innerEp[0], innerEp[1]);
	stopBarCurves.lineTo(outerEp[0], outerEp[1]);
	stopBarCurves.lineTo(outerSp[0], outerSp[1]);
	stopBarCurves.closePath();

	laneGG.laneGGShape.stopBarCurves = stopBarCurves;


};


export default modelIntLaneGGStopBar;
