
import SharedGeometryLib from "../../../../../SharedGeometryLib";

/******************************************************************************************
	Would model:
		Center linear divider middle points: sp, ep, cp1, cp2.
		(For both single-line (solid / dash) and double-line (solid / dash) divider.)


	Would update:
		1. divider.divGeo.centerMidSp = [x, y];  //center divider middle start point
		2. divider.divGeo.centerMidEp = [x, y];  //center divider middle end point
		3. divider.divGeo.centerMidCp1 = [x, y];  //center divider middle bezier curve start point 1
		4. divider.divGeo.centerMidCp2 = [x, y];  //center divider middle bezier curve end point 2
******************************************************************************************/

const modelIntCenterLineDivPoints = (divider, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(divider.THREE);

	const app = divider.divGroup.approach;
	const appRightOsSp = app.appGeo.outerRightSp;  //[x, y]
	const appLeftOsSp = app.appGeo.outerLeftSp;    //[x, y]
	const appRightIsEp = app.appGeo.innerRightEp;  //[x, y]
	const appLeftIsEp = app.appGeo.innerLeftEp;    //[x, y]
	const appRightOs = app.appGeo.outerSides[0];   //{a: xx, b: xx}

	const divGroup = divider.divGroup;
	const startWidth = divGroup.divGroupGeo.centerDivStartWidth;  //in pixel
	//const endWidth = divGroup.divGroupGeo.centerDivEndWidth;   //in pixel


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


	//************** Decide inner middle lines for center divider ***************
	//inner middle line refers to the one for the storage
	//outer middle line refers to the one before the storage
	//when no storage, the two middle lines are actually the same
	const getPerpLineByPoints = sharedGeometryLib.getPerpendicularLineByTwoPoints;

	const appRightOsSpShadowVec = appPerpVec.clone();
	appRightOsSpShadowVec.setLength(ibWidth);
	appRightOsSpShadowVec.add(appRightOsSpVec);

	const appRightOsSpShadowOnAppLeftVec = appPerpVec.clone();
	appRightOsSpShadowOnAppLeftVec.setLength(ibWidth + obWidth);
	appRightOsSpShadowOnAppLeftVec.add(appRightOsSpVec);

	const appRightOsSpShadow = [appRightOsSpShadowVec.x, appRightOsSpShadowVec.y];
	const appRightOsSpShadowOnAppLeft = [appRightOsSpShadowOnAppLeftVec.x, appRightOsSpShadowOnAppLeftVec.y];

	const innerMidLine = getPerpLineByPoints(
							appRightOsSpShadow[0], appRightOsSpShadow[1],
							appRightOsSpShadowOnAppLeft[0], appRightOsSpShadowOnAppLeft[1],
							appRightOsSp[0], appRightOsSp[1],
							accuracy
						);  //{a: xx, b: xx}


	//************** Decide inner middle lines initial and end points ***************
	const getAbFromTwoPoints = sharedGeometryLib.getAbFromTwoPoints;
	const getInterPointOfLines = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;

	//initial points refer to intersect point on line of approach outer side start points
	const lineOfAppOsSp = getAbFromTwoPoints(
							appRightOsSp[0], appLeftOsSp[0],
							appRightOsSp[1], appLeftOsSp[1],
							accuracy
						);  //{a: xx, b: xxx}
	const innerMidInitP = getInterPointOfLines(
							lineOfAppOsSp.a, lineOfAppOsSp.b,
							innerMidLine.a, innerMidLine.b,
							accuracy
						);

	const lineOfAppEp = getAbFromTwoPoints(
							appRightIsEp[0], appLeftIsEp[0],
							appRightIsEp[1], appLeftIsEp[1],
							accuracy
						);  //{a: xx, b: xxx}

	const innerMidEndP = getInterPointOfLines(
							lineOfAppEp.a, lineOfAppEp.b,
							innerMidLine.a, innerMidLine.b,
							accuracy
						);

	//************** Decide divivder inner middle start point ***************
	const getPointFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
	const getInterPoint = sharedGeometryLib.getIntersectedPointByPoints;

	let innerMidSp;
	const offset = divider.offset * meterToPixel;  //offset in pixel from initial points

	const interPoint = getInterPoint(
					stopBarOuterSp[0], stopBarOuterSp[1],
					stopBarOuterFinalP[0], stopBarOuterFinalP[1],
					innerMidInitP[0], innerMidInitP[1],
					innerMidEndP[0], innerMidEndP[1],
					accuracy
				);


	innerMidSp = getPointFromAtoB(
					interPoint[0], interPoint[1],
					innerMidEndP[0], innerMidEndP[1],
					offset
				);  //in [x, y]


	//************** Decide divivder middle control point 1 & 2***************
	//center divider storage:
	const centerDivStLen = divider.storageLength * meterToPixel;  //in pixel
	const centerDivStSlopeLen = divider.storageSlipLength * meterToPixel;  //in pixel
	const centerDivStWidth = divider.storageWidth * meterToPixel;  //storage width in pixel

	const midCp1 = getPointFromAtoB(
						innerMidSp[0], innerMidSp[1],
						innerMidEndP[0], innerMidEndP[1],
						centerDivStLen
					);  //in [x, y]

	const midCp2Shadow = getPointFromAtoB(
						midCp1[0], midCp1[1],
						innerMidEndP[0], innerMidEndP[1],
						centerDivStSlopeLen
					);  //in [x, y]

	const midCp2ShadowVec = new divider.THREE.Vector2(
								midCp2Shadow[0], midCp2Shadow[1]
							);

	const midCp2Vec = new divider.THREE.Vector2(
						appRightIsEp[0] - appLeftIsEp[0],
						appRightIsEp[1] - appLeftIsEp[1]
					);
	midCp2Vec.setLength(centerDivStWidth);
	midCp2Vec.add(midCp2ShadowVec);

	const midCp2 = [midCp2Vec.x, midCp2Vec.y];


	//************** Decide divivder middle end point ***************

	const midEp = getPointFromAtoB(
						innerMidEndP[0], innerMidEndP[1],
						appRightIsEp[0], appRightIsEp[1],
						centerDivStWidth - startWidth / 2
					);  //in [x, y]

	//*********************** Update divGeo ****************************
	divider.divGeo.centerMidSp = innerMidSp;  //center divider middle start point
	divider.divGeo.centerMidEp = midEp;  //center divider middle end point
	divider.divGeo.centerMidCp1 = midCp1;  //center divider middle bezier curve start point 1
	divider.divGeo.centerMidCp2 = midCp2;  //center divider middle bezier curve end point 2





};


export default modelIntCenterLineDivPoints;
