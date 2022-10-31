import SharedGeometryLib from "../../../../../SharedGeometryLib";

/*****************************************************************************************
	Would model:
		Outbound divider outer and inner sides points for "int" (not roundabout).
		The outer side points refer to 4 critical points on the side
		of the divider that is next to the approach side.

		The inner side points refer to 4 critical points on the side
		of the divider that is next to the main road.

	Would update:
		1. divider.divGeo.obOuterSp = [x, y];  //outbound outer side start point
		2. divider.divGeo.obOuterEp = [x, y];  //outbound outer side end point
		3. divider.divGeo.obOuterCp1 = [x, y];  //outbound outer side bezier curve start point 1
		4. divider.divGeo.obOuterCp2 = [x, y];  //outbound outer side bezier curve end point 2

		5. divider.divGeo.obInnerSp = [x, y];  //outbound inner side start point
		6. divider.divGeo.obInnerEp = [x, y];  //outbound inner side end point
		7. divider.divGeo.obInnerCp1 = [x, y];  //outbound inner side bezier curve start point 1
		8. divider.divGeo.obInnerCp2 = [x, y];  //outbound inner side bezier curve end point 2
*****************************************************************************************/

const modelIntObDivPoints = (divider, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(divider.THREE);

	const app = divider.divGroup.approach;
	const bonundStLen = app.outboundStorageLength * meterToPixel; //approach inbound storage length in pixel
	const appLeftOsSp = app.appGeo.outerLeftSp;  //[x, y]
	const appLeftOsEp = app.appGeo.outerLeftEndPoint;  //[x, y]
	const appLeftIsEp = app.appGeo.innerLeftEp; //[x, y]
	const appRightIsEp = app.appGeo.innerRightEp; //[x, y]
	const appLeftSideCps = app.appGeo.leftSideCps; //[[x1, y1], [x2, y2]]

	const intersection = app.intersection;
	const neiAppIndex = (app.appId === app.intersection.approaches.length - 1) ? 0 : app.appId + 1;
	const neiApp = app.intersection.approaches[neiAppIndex];


	//************************ Get inbound side road width ************************
	const laneGG = app.laneGG;
	const sideRoadWidth = laneGG.laneGGGeo.obSideLgWidth;  //in pixel
	const stopBarOuterSp = laneGG.laneGGGeo.stopOuterSp;
	const stopBarOuterFinalP = laneGG.laneGGGeo.outerFinalP;


	//************************ Decide offset length ************************
	//Offest length = corner length + cap radius + offest
	//However, when there is storage, the offset should not be longer than it.
	const corner = neiApp.corner;
	let cornerRadius = 0; //in pixel
	let cornerLength = 0; //in pixel
	if (corner.cornerGeo.intCornerGeo.outerArcPoints) {
		//for special cases, the corner outer arc would have 4 points
		const cornerOuterArcLen = corner.cornerGeo.intCornerGeo.outerArcPoints.length;
		const cornerOuterArcEp = (cornerOuterArcLen === 4) ?
									corner.cornerGeo.intCornerGeo.outerArcPoints[2] :
									corner.cornerGeo.intCornerGeo.outerArcPoints[1];  //[x, y]

		cornerRadius = corner.cornerRadius; //in meters
		cornerRadius = (cornerRadius > 5) ? (cornerRadius * meterToPixel) : 5; //radius in meters

		const distBtwPoints = sharedGeometryLib.getDistBtwTwoPoints;
		cornerLength = distBtwPoints(
								appLeftOsSp[0], appLeftOsSp[1],
								cornerOuterArcEp[0], cornerOuterArcEp[1],
							);
	}



	const divWidth = divider.divGeo.dividerWidth * meterToPixel;  //divider width in pixel
	let divCapR = divider.capRadius * meterToPixel;  //cap radius in pixel
	divCapR = (divWidth > 2 * divCapR) ? divCapR : divWidth / 2;


	//the offset distance should be less than the storage length when there is storage
	let offset = divider.offset * meterToPixel; //divider shadow offest in pixel
	offset = offset + divCapR;
	//offset = offset + cornerLength;
	/*
	let shadowOffset = (offset > bonundStLen && bonundStLen > 0) ?
							(bonundStLen + cornerLength - cornerRadius) :
							(offset + cornerLength);
	*/
	let shadowOffset = offset;

	//const crosswalk = divider.diGroup.approach.crosswalk;
	//if (crosswalk.ifCrosswalk)


	//*********** Decide interPoint on approach side ***********
	const shiftVector = new divider.THREE.Vector2(
						-appLeftOsEp[0] + appRightIsEp[0],
						-appLeftOsEp[1] + appRightIsEp[1]
					);
	shiftVector.setLength(sideRoadWidth);

	const divInitialSpVector = new divider.THREE.Vector2(appLeftOsSp[0], appLeftOsSp[1]);
	divInitialSpVector.add(shiftVector);
	const divInitialSp = [divInitialSpVector.x, divInitialSpVector.y];


	const divInitialEpVector = new divider.THREE.Vector2(appLeftOsEp[0], appLeftOsEp[1]);
	divInitialEpVector.add(shiftVector);
	const divInitialEp = [divInitialEpVector.x, divInitialEpVector.y];

	const getInterPoint = sharedGeometryLib.getIntersectedPointByPoints;
	let interPoint = getInterPoint(
						divInitialSp[0], divInitialSp[1],
						divInitialEp[0], divInitialEp[1],
						stopBarOuterSp[0], stopBarOuterSp[1],
						stopBarOuterFinalP[0], stopBarOuterFinalP[1],
						accuracy
					);

	const interPointVector = new divider.THREE.Vector2(interPoint[0], interPoint[1]);

	const shiftBackVector = new divider.THREE.Vector2(
								appLeftOsEp[0] - appRightIsEp[0],
								appLeftOsEp[1] - appRightIsEp[1]
							);
	shiftBackVector.setLength(sideRoadWidth);

	interPointVector.add(shiftBackVector);

	interPoint = [interPointVector.x, interPointVector.y];



	//*********** Decide shadow points on approach side ***********
	//decide the shadow distance on the approach side
	const getPointFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;

	const obSpShadowPoint = getPointFromAtoB(
								interPoint[0], interPoint[1],
								appLeftOsEp[0], appLeftOsEp[1],
								shadowOffset
							);

	const obCp1ShadowPoint = (bonundStLen > 0) ? appLeftSideCps[0] : obSpShadowPoint;
	const obCp2ShadowPoint = (bonundStLen > 0) ? appLeftSideCps[1] : appLeftIsEp;


	//*********** Decide shift vector (perpendicular to approach) ***********
	const shiftVec = new divider.THREE.Vector2(
						appRightIsEp[0] - appLeftIsEp[0],
						appRightIsEp[1] - appLeftIsEp[1]
					);

	//somehow when sideRoad width is 0, we need to give it a un-zero value:
	shiftVec.setLength((sideRoadWidth === 0) ? (0.01 * meterToPixel) : sideRoadWidth);


	//************************ Decide  outer side points ************************
	const obOuterSpVec = new divider.THREE.Vector2(obSpShadowPoint[0], obSpShadowPoint[1]);
	const obOuterCp1Vec = new divider.THREE.Vector2(obCp1ShadowPoint[0], obCp1ShadowPoint[1]);
	const obOuterCp2Vec = new divider.THREE.Vector2(obCp2ShadowPoint[0], obCp2ShadowPoint[1]);
	const obOuterEpVec = new divider.THREE.Vector2(appLeftIsEp[0], appLeftIsEp[1]);

	obOuterSpVec.add(shiftVec);
	obOuterCp1Vec.add(shiftVec);
	obOuterCp2Vec.add(shiftVec);
	obOuterEpVec.add(shiftVec);

	let obOuterSp = [obOuterSpVec.x, obOuterSpVec.y];
	let obOuterCp1 = [obOuterCp1Vec.x, obOuterCp1Vec.y];

	//************************ Decide  inner side points ************************
	shiftVec.setLength(divWidth + sideRoadWidth);
	const obInnerSpVec = new divider.THREE.Vector2(obSpShadowPoint[0], obSpShadowPoint[1]);
	const obInnerCp1Vec = new divider.THREE.Vector2(obCp1ShadowPoint[0], obCp1ShadowPoint[1]);
	const obInnerCp2Vec = new divider.THREE.Vector2(obCp2ShadowPoint[0], obCp2ShadowPoint[1]);
	const obInnerEpVec = new divider.THREE.Vector2(appLeftIsEp[0], appLeftIsEp[1]);

	obInnerSpVec.add(shiftVec);
	obInnerCp1Vec.add(shiftVec);
	obInnerCp2Vec.add(shiftVec);
	obInnerEpVec.add(shiftVec);

	let obInnerSp = [obInnerSpVec.x, obInnerSpVec.y];
	let obInnerCp1 = [obInnerCp1Vec.x, obInnerCp1Vec.y];


	//************************ Update divGeo ************************
	divider.divGeo.obOuterSp = obOuterSp;  //outbound start point
	divider.divGeo.obOuterEp = [obOuterEpVec.x, obOuterEpVec.y];  //outbound end point
	divider.divGeo.obOuterCp1 = obOuterCp1;  //outbound bezier curve start point 1
	divider.divGeo.obOuterCp2 = [obOuterCp2Vec.x, obOuterCp2Vec.y];  //outbound bezier curve end point 2

	divider.divGeo.obInnerSp = obInnerSp;  //outbound inner side start point
	divider.divGeo.obInnerEp = [obInnerEpVec.x, obInnerEpVec.y];  //outbound inner side end point
	divider.divGeo.obInnerCp1 = obInnerCp1;  //outbound inner side bezier curve start point 1
	divider.divGeo.obInnerCp2 = [obInnerCp2Vec.x, obInnerCp2Vec.y];

};


export default modelIntObDivPoints;
