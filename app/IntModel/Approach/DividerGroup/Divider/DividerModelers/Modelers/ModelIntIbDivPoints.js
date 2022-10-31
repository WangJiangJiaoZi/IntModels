import SharedGeometryLib from "../../../../../SharedGeometryLib";

/******************************************************************************************
	Would model:
		Inbound divider outer and inner sides points for "int" (not roundabout).
		The outer side points refer to 4 critical points on the side
		of the divider that is next to the approach side.

		The inner side points refer to 4 critical points on the side
		of the divider that is next to the main road.

	Would update:
		1. divider.divGeo.ibOuterSp = [x, y];  //inbound outer side start point
		2. divider.divGeo.ibOuterEp = [x, y];  //inbound outer side end point
		3. divider.divGeo.ibOuterCp1 = [x, y];  //inbound outer side bezier curve start point 1
		4. divider.divGeo.ibOuterCp2 = [x, y];  //inbound outer side bezier curve end point 2

		5. divider.divGeo.ibInnerSp = [x, y];  //inbound inner side start point
		6. divider.divGeo.ibInnerEp = [x, y];  //inbound inner side end point
		7. divider.divGeo.ibInnerCp1 = [x, y];  //inbound inner side bezier curve start point 1
		8. divider.divGeo.ibInnerCp2 = [x, y];  //inbound inner side bezier curve end point 2
******************************************************************************************/

const modelIntIbDivPoints = (divider, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(divider.THREE);

	const app = divider.divGroup.approach;
	const bonundStLen = app.inboundStorageLength * meterToPixel; //approach inbound storage length in pixel
	const appRightOsSp = app.appGeo.outerRightSp;  //[x, y]
	const appRightOsEp = app.appGeo.outerRightEndPoint;  //[x, y]
	const appRightIsEp = app.appGeo.innerRightEp; //[x, y]
	const appLeftIsEp = app.appGeo.innerLeftEp; //[x, y]
	const appLeftOsSp = app.appGeo.outerLeftSp; //[x, y]
	const appRightSideCps = app.appGeo.rightSideCps; //[[x1, y1], [x2, y2]]

	//************************ Get inbound side road width ************************
	const laneGG = app.laneGG;
	const sideRoadWidth = laneGG.laneGGGeo.ibSideLgWidth; //in pixel
	const stopBarOuterSp = laneGG.laneGGGeo.stopOuterSp;
	const stopBarOuterFinalP = laneGG.laneGGGeo.outerFinalP;


	//************************ Decide offset length ************************
	//Offest length = corner length + cap radius + offest
	//However, when there is storage, the offset should not be longer than it.
	const corner = app.corner;
	let cornerLength = 0; //in pixel
	let cornerRadius = 0; //in pixel
	//if corner does exist:
	if (corner.cornerGeo.intCornerGeo.outerArcPoints) {
		const cornerOuterArcSp = corner.cornerGeo.intCornerGeo.outerArcPoints[0];  //[x, y]
		cornerRadius = app.corner.cornerRadius; //in meters
		cornerRadius = (cornerRadius > 5) ? (cornerRadius * meterToPixel) : 5; //radius in meters

		const distBtwPoints = sharedGeometryLib.getDistBtwTwoPoints;
		cornerLength = distBtwPoints(
								appRightOsSp[0], appRightOsSp[1],
								cornerOuterArcSp[0], cornerOuterArcSp[1],
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
	const shadowOffset = (offset > bonundStLen && bonundStLen > 0) ?
							(bonundStLen + cornerLength - cornerRadius) :
							(offset + cornerLength);
	*/
	const shadowOffset = offset;

	//*********** Decide interPoint on approach side ***********
	const shiftVector = new divider.THREE.Vector2(
						-appRightOsEp[0] + appLeftIsEp[0],
						-appRightOsEp[1] + appLeftIsEp[1]
					);
	shiftVector.setLength(sideRoadWidth);

	const divInitialSpVector = new divider.THREE.Vector2(appRightOsSp[0], appRightOsSp[1]);
	divInitialSpVector.add(shiftVector);
	const divInitialSp = [divInitialSpVector.x, divInitialSpVector.y];


	const divInitialEpVector = new divider.THREE.Vector2(appRightOsEp[0], appRightOsEp[1]);
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
								appRightOsEp[0] - appLeftIsEp[0],
								appRightOsEp[1] - appLeftIsEp[1]
							);
	shiftBackVector.setLength(sideRoadWidth);

	interPointVector.add(shiftBackVector);

	interPoint = [interPointVector.x, interPointVector.y];

	//*********** Decide shadow points on approach side ***********
	//decide the shadow distance on the approach side
	const getPointFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
	const ibSpShadowPoint = getPointFromAtoB(
								interPoint[0], interPoint[1],
								appRightOsEp[0], appRightOsEp[1],
								shadowOffset
							);

	const ibCp1ShadowPoint = (bonundStLen > 0) ? appRightSideCps[0] : ibSpShadowPoint;
	const ibCp2ShadowPoint = (bonundStLen > 0) ? appRightSideCps[1] : appRightIsEp;


	//*********** Decide shift vector (perpendicular to approach) ***********
	const shiftVec = new divider.THREE.Vector2(
						appLeftIsEp[0] - appRightIsEp[0],
						appLeftIsEp[1] - appRightIsEp[1]
					);

	//somehow when sideRoad width is 0, we need to give it a un-zero value:
	shiftVec.setLength((sideRoadWidth === 0) ? (0.01 * meterToPixel) : sideRoadWidth);


	//************************ Decide  outer side points ************************
	const ibOuterSpVec = new divider.THREE.Vector2(ibSpShadowPoint[0], ibSpShadowPoint[1]);
	const ibOuterCp1Vec = new divider.THREE.Vector2(ibCp1ShadowPoint[0], ibCp1ShadowPoint[1]);
	const ibOuterCp2Vec = new divider.THREE.Vector2(ibCp2ShadowPoint[0], ibCp2ShadowPoint[1]);
	const ibOuterEpVec = new divider.THREE.Vector2(appRightIsEp[0], appRightIsEp[1]);

	/*	*/
	ibOuterSpVec.add(shiftVec);
	ibOuterCp1Vec.add(shiftVec);
	ibOuterCp2Vec.add(shiftVec);
	ibOuterEpVec.add(shiftVec);

	let ibOuterSp = [ibOuterSpVec.x, ibOuterSpVec.y];
	let ibOuterCp1 = [ibOuterCp1Vec.x, ibOuterCp1Vec.y];
	let ibOuterCp2 = [ibOuterCp2Vec.x, ibOuterCp2Vec.y];
	const ibOuterEp = [ibOuterEpVec.x, ibOuterEpVec.y];

	//************************ Decide  inner side points ************************
	shiftVec.setLength(divWidth + sideRoadWidth);
	const ibInnerSpVec = new divider.THREE.Vector2(ibSpShadowPoint[0], ibSpShadowPoint[1]);
	const ibInnerCp1Vec = new divider.THREE.Vector2(ibCp1ShadowPoint[0], ibCp1ShadowPoint[1]);
	const ibInnerCp2Vec = new divider.THREE.Vector2(ibCp2ShadowPoint[0], ibCp2ShadowPoint[1]);
	const ibInnerEpVec = new divider.THREE.Vector2(appRightIsEp[0], appRightIsEp[1]);
	/*	*/
	ibInnerSpVec.add(shiftVec);
	ibInnerCp1Vec.add(shiftVec);
	ibInnerCp2Vec.add(shiftVec);
	ibInnerEpVec.add(shiftVec);

	let ibInnerSp = [ibInnerSpVec.x, ibInnerSpVec.y];
	let ibInnerCp1 = [ibInnerCp1Vec.x, ibInnerCp1Vec.y];


	//************************ Update divGeo ************************
	divider.divGeo.ibOuterSp = ibOuterSp;  //inbound start point
	divider.divGeo.ibOuterEp = ibOuterEp;  //inbound end point
	divider.divGeo.ibOuterCp1 = ibOuterCp1;  //inbound bezier curve start point 1
	divider.divGeo.ibOuterCp2 = ibOuterCp2;  //inbound bezier curve end point 2

	divider.divGeo.ibInnerSp = ibInnerSp;  //inbound inner side start point
	divider.divGeo.ibInnerEp = [ibInnerEpVec.x, ibInnerEpVec.y];  //inbound inner side end point
	divider.divGeo.ibInnerCp1 = ibInnerCp1;  //inbound inner side bezier curve start point 1
	divider.divGeo.ibInnerCp2 = [ibInnerCp2Vec.x, ibInnerCp2Vec.y];

};


export default modelIntIbDivPoints;
