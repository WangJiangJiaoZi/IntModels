import SharedGeometryLib from "../../../../../SharedGeometryLib";

/******************************************************************************************
	Would model:
		Center physical divider points.

		There would be 6 points, 4 on the inbound side, 2 on the outbound side.

	Would update:
		1. divider.divGeo.centerIbSp = [x, y];  //center divider inbound side start point
		2. divider.divGeo.centerIbEp = [x, y];  //center divider inbound side end point
		3. divider.divGeo.centerIbCp1 = [x, y];  //center divider inbound side bezier curve start point 1
		4. divider.divGeo.centerIbCp2 = [x, y];  //center divider inbound side bezier curve end point 2

		5. divider.divGeo.centerObSp = [x, y];  //center divider outbound side start point
		6. divider.divGeo.centerObEp = [x, y];  //center divider outbound side end point

	(
	TBD in the future, probably...:
		7. divider.divGeo.centerObCp1 = [x, y];  //center divider outbound side bezier curve start point 1
		8. divider.divGeo.centerObCp2 = [x, y];  //center divider outbound side bezier curve end point 2
	)
******************************************************************************************/


const modelIntCenterPhyDivPoints = (divider, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(divider.THREE);

	const app = divider.divGroup.approach;
	const appRightOsSp = app.appGeo.outerRightSp;  //[x, y]
	const appLeftOsSp = app.appGeo.outerLeftSp;    //[x, y]
	const appRightIsEp = app.appGeo.innerRightEp;  //[x, y]
	const appLeftIsEp = app.appGeo.innerLeftEp;    //[x, y]

	const divGroup = divider.divGroup;
	const startWidth = divGroup.divGroupGeo.centerDivStartWidth;  //in pixel
	const endWidth = divGroup.divGroupGeo.centerDivEndWidth;   //in pixel


	//************************ Decide inbound and outbound width ************************
	const laneGG = app.laneGG;
	let ibWidth = laneGG.laneGGGeo.ibMainLgWidth + laneGG.laneGGGeo.ibSideLgWidth; //in pixel
	ibWidth += divGroup.divGroupGeo.ibDivWidth;
	let obWidth = laneGG.laneGGGeo.obMainLgWidth + laneGG.laneGGGeo.obSideLgWidth; //in pixel
	obWidth += divGroup.divGroupGeo.obDivWidth;

	const stopBarOuterSp = laneGG.laneGGGeo.stopOuterSp;  //[x, y]
	const stopBarOuterFinalP = laneGG.laneGGGeo.outerFinalP;  //[x, y]


	//************** Decide critical vectors ***************
	//vector that is perpendicular to the approach
	const appPerpVec = new divider.THREE.Vector2(
						appLeftIsEp[0] - appRightIsEp[0],
						appLeftIsEp[1] - appRightIsEp[1]
					);

	const appRightOsSpVec = new divider.THREE.Vector2(
						appRightOsSp[0],
						appRightOsSp[1]
					);


	//************** Decide inbound inner and outbound sides for center divider ***************
	const getPerpLineByPoints = sharedGeometryLib.getPerpendicularLineByTwoPoints;

	const appRightOsSpIbShadowVec = appPerpVec.clone();
	appRightOsSpIbShadowVec.setLength(ibWidth);
	appRightOsSpIbShadowVec.add(appRightOsSpVec);

	const appRightOsSpIbShadow = [appRightOsSpIbShadowVec.x, appRightOsSpIbShadowVec.y];

	const appRightOsSpObShadowVec = appPerpVec.clone();
	appRightOsSpObShadowVec.setLength(ibWidth + startWidth);
	appRightOsSpObShadowVec.add(appRightOsSpVec);

	const appRightOsSpObShadow = [appRightOsSpObShadowVec.x, appRightOsSpObShadowVec.y];

	const ibInnerSide = getPerpLineByPoints(
							appRightOsSpIbShadow[0], appRightOsSpIbShadow[1],
							appRightOsSpIbShadow[0], appRightOsSpIbShadow[1],
							appRightOsSp[0], appRightOsSp[1],
							accuracy
						);  //{a: xx, b: xxx}
	const obSide = getPerpLineByPoints(
							appRightOsSpObShadow[0], appRightOsSpObShadow[1],
							appRightOsSpObShadow[0], appRightOsSpObShadow[1],
							appRightOsSp[0], appRightOsSp[1],
							accuracy
						);  //{a: xx, b: xxx}



	//************** Decide inbound inner and outbound initial and end points ***************
	const getAbFromTwoPoints = sharedGeometryLib.getAbFromTwoPoints;
	const getInterPointOfLines = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;

	//initial points refer to intersect point on line of approach outer side start points
	const lineOfAppOsSp = getAbFromTwoPoints(
							appRightOsSp[0], appLeftOsSp[0],
							appRightOsSp[1], appLeftOsSp[1],
							accuracy
						);  //{a: xx, b: xxx}
	const ibInnerInitP = getInterPointOfLines(
							lineOfAppOsSp.a, lineOfAppOsSp.b,
							ibInnerSide.a, ibInnerSide.b,
							accuracy
						);

	const obInitP = getInterPointOfLines(
						lineOfAppOsSp.a, lineOfAppOsSp.b,
						obSide.a, obSide.b,
						accuracy
					);

	//end points refer to intersect point on line of approach end side
	const lineOfAppEnd = getAbFromTwoPoints(
							appRightIsEp[0], appLeftIsEp[0],
							appRightIsEp[1], appLeftIsEp[1],
							accuracy
						);  //{a: xx, b: xxx}

	const ibInnerEndP = getInterPointOfLines(
							lineOfAppEnd.a, lineOfAppEnd.b,
							ibInnerSide.a, ibInnerSide.b,
							accuracy
						);

	const obEndP = getInterPointOfLines(
						lineOfAppEnd.a, lineOfAppEnd.b,
						obSide.a, obSide.b,
						accuracy
					);


	//************** Decide inbound inner and outbound start points ***************
	const getPointFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
	const getDistBtwTwoPoints = sharedGeometryLib.getDistBtwTwoPoints;
	const gerInterPointByPoints = sharedGeometryLib.getIntersectedPointByPoints;

	const offset = divider.offset * meterToPixel;  //offset in pixel from initial points

	const ibInnerInterP = gerInterPointByPoints(
							ibInnerInitP[0], ibInnerInitP[1],
							ibInnerEndP[0], ibInnerEndP[1],
							stopBarOuterSp[0], stopBarOuterSp[1],
							stopBarOuterFinalP[0], stopBarOuterFinalP[1],
							accuracy
						);

	const obInnerInterP = gerInterPointByPoints(
							obInitP[0], obInitP[1],
							obEndP[0], obEndP[1],
							stopBarOuterSp[0], stopBarOuterSp[1],
							stopBarOuterFinalP[0], stopBarOuterFinalP[1],
							accuracy
						);

	let ibInnerSp = getPointFromAtoB(
						ibInnerInterP[0], ibInnerInterP[1],
						ibInnerEndP[0], ibInnerEndP[1],
						offset
					);  //in [x, y]

	let obSp = getPointFromAtoB(
				obInnerInterP[0], obInnerInterP[1],
				obEndP[0], obEndP[1],
				offset
			);  //in [x, y]


	const distIbInnerSpToEp = getDistBtwTwoPoints(
								ibInnerEndP[0], ibInnerEndP[1],
								ibInnerSp[0], ibInnerSp[1]
							);

	const distObSpToEp = getDistBtwTwoPoints(
							obEndP[0], obEndP[1],
							obSp[0], obSp[1]
						);

	//both inbound inner and outbound sides should have the same length
	const centerDivLen = (distIbInnerSpToEp < distObSpToEp) ? distIbInnerSpToEp : distObSpToEp;

	ibInnerSp = getPointFromAtoB(
					ibInnerEndP[0], ibInnerEndP[1],
					ibInnerInitP[0], ibInnerInitP[1],
					centerDivLen
				);  //in [x, y]

	obSp = getPointFromAtoB(
				obEndP[0], obEndP[1],
				obInitP[0], obInitP[1],
				centerDivLen
			);  //in [x, y]


	//************** Decide inbound inner side control point1 ***************
	//center divider storage:
	const centerDivStLen = divider.storageLength * meterToPixel;  //in pixel
	const centerDivStSlopeLen = divider.storageSlipLength * meterToPixel;  //in pixel
	const centerDivStWidth = divider.storageWidth * meterToPixel;  //in pixel

	const ibCp1 = getPointFromAtoB(
				ibInnerSp[0], ibInnerSp[1],
				ibInnerEndP[0], ibInnerEndP[1],
				centerDivStLen
			);  //in [x, y]


	//************** Decide inbound outer side control point2 ***************
	const ibCp2Shadow = getPointFromAtoB(
				ibCp1[0], ibCp1[1],
				ibInnerEndP[0], ibInnerEndP[1],
				centerDivStSlopeLen
			);  //in [x, y]

	const ibCp2Vec = new divider.THREE.Vector2(ibCp2Shadow[0], ibCp2Shadow[1]);

	const centerDivStVec = new divider.THREE.Vector2(
							appRightIsEp[0] - appLeftIsEp[0],
							appRightIsEp[1] - appLeftIsEp[1]
						);

	centerDivStVec.setLength(centerDivStWidth);

	ibCp2Vec.add(centerDivStVec);

	const ibCp2 = [ibCp2Vec.x, ibCp2Vec.y];

	//************** Decide inbound outer side end point ***************
	const ibOuterEp = getPointFromAtoB(
				obEndP[0], obEndP[1],
				appRightIsEp[0], appRightIsEp[1],
				endWidth
			);  //in [x, y]


	//*********************** Update divGeo ****************************
	divider.divGeo.centerIbSp = ibInnerSp;  //center divider inbound side start point
	divider.divGeo.centerIbEp = ibOuterEp;  //center divider inbound side end point
	divider.divGeo.centerIbCp1 = ibCp1;  //center divider inbound side bezier curve start point 1
	divider.divGeo.centerIbCp2 = ibCp2;  //center divider inbound side bezier curve end point 2

	divider.divGeo.centerObSp = obSp;  //center divider outbound side start point
	divider.divGeo.centerObEp = obEndP;  //center divider outbound side end point



};


export default modelIntCenterPhyDivPoints;
