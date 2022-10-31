
import SharedGeometryLib from "../../../../SharedGeometryLib";


/**********************************************************************************
	Would model movements' start line. The line would be perpendicular to the
	approach. If there's a conflict between movements' arrows and the approach's
	counter clockwise neighbor approach, set the movements back. However, there's
	a maximum limit for the setback.

	Would update:
	 	1. Start point of the movements' start line (on appraoch's right side)
			laneGG.laneGGFeatureGeo.movsStartLineSp = [x, y];
		2. End point of the movements' end line (on counter clockwise neight app's left side)
			laneGG.laneGGFeatureGeo.movsStartLineEp = [x, y];

***********************************************************************************/
const modelMovsStartLine = (laneGG, intSize, meterToPixel, accuracy) => {
	// ****************** parameters preparation ******************
	const cornerLen = laneGG.approach.corner.cornerGeo.intCornerGeo.curAppCornerLength;  //in pixel
	const appRightOuterSp = laneGG.approach.appGeo.outerRightSp;  //[x, y]
	const appRightOuterEp = laneGG.approach.appGeo.outerRightEndPoint;  //[x, y]

	const neighborAppIndex = (laneGG.approach.appId === 0) ?
								(laneGG.approach.intersection.approaches.length - 1) :
								(laneGG.approach.appId - 1);
	const neighborApp = laneGG.approach.intersection.approaches[neighborAppIndex];
	const neighAppLeftOuterSp = neighborApp.appGeo.outerLeftSp;  //[x, y]
	const neighAppLeftOuterEp = neighborApp.appGeo.outerLeftEndPoint;  //[x, y]

	const envSetters = laneGG.approach.intersection.intModel.envSetters;
	let movOffset = envSetters.movOffset * meterToPixel;  //start offset in pixel
	const movMaxOffsetScale = envSetters.movMaxOffsetScale;
	const movSideGap = envSetters.movSideGap * meterToPixel;  //side gap in pixel
	const movMiddleGap = envSetters.movMiddleGap * meterToPixel; //middle gap in pixel

	const THREE = laneGG.THREE;
	const sharedGeoLib = new SharedGeometryLib(THREE);

	// ****************** calculate movements' info height ******************
	const movCount = laneGG.movements.length;
	const movInfoHeight = movSideGap + movMiddleGap * (movCount - 1 + 0.5);

	// ****************** calculate movements' start line points ******************
	const appRightSideVec = new THREE.Vector2(
							appRightOuterEp[0] - appRightOuterSp[0],
							appRightOuterEp[1] - appRightOuterSp[1]
						);
	const shadowVec = appRightSideVec.clone();
	shadowVec.setLength(cornerLen + movOffset);

	const startLineVec = sharedGeoLib.rotateVectorCcw(shadowVec, Math.PI / 2);
	startLineVec.setLength(movInfoHeight);


	let startPVec = new THREE.Vector2(appRightOuterSp[0], appRightOuterSp[1]);
	startPVec.add(shadowVec);
	let startP = [startPVec.x, startPVec.y];


	let endPVec = startPVec.clone().add(startLineVec);
	let endP = [endPVec.x, endPVec.y];


	// ****************** check if there might be conflict ******************
	const ccwAngleBtwApps = sharedGeoLib.getCcwAngleBtwTwoVectors(
								new THREE.Vector3(
									appRightOuterEp[0] - appRightOuterSp[0],
									appRightOuterEp[1] - appRightOuterSp[1],
									0
								),
								new THREE.Vector3(
									neighAppLeftOuterEp[0] - neighAppLeftOuterSp[0],
									neighAppLeftOuterEp[1] - neighAppLeftOuterSp[1],
									0
								)
							);
	let ifConflict = false;
	//conflict might exist only when ccwAngle is smaller than 90 degrees
	if (ccwAngleBtwApps < Math.PI / 2) {
		const curAngle = Math.atan(movInfoHeight / (cornerLen + movOffset));
		if (curAngle > ccwAngleBtwApps) {
			ifConflict = true;
		}
	}

	// ****************** handle conflict ******************
	if (ifConflict) {
		const idealOffsetWzCornerLen = movInfoHeight / Math.tan(ccwAngleBtwApps);
		//if the offset is acceptable
		if (idealOffsetWzCornerLen <= movMaxOffsetScale * appRightSideVec.length()) {
			startPVec = new THREE.Vector2(appRightOuterSp[0], appRightOuterSp[1]);
			shadowVec.setLength(idealOffsetWzCornerLen);
			startPVec.add(shadowVec);
			startP = [startPVec.x, startPVec.y];
			endPVec = startPVec.clone().add(startLineVec);
			endP = [endPVec.x, endPVec.y];
		}
		//else, the offset is too big
		else {
			startPVec = new THREE.Vector2(appRightOuterSp[0], appRightOuterSp[1]);
			shadowVec.setLength(movMaxOffsetScale * appRightSideVec.length());
			startPVec.add(shadowVec);
			startP = [startPVec.x, startPVec.y];
			endPVec = startPVec.clone().add(startLineVec);
			endP = [endPVec.x, endPVec.y];
		}
	}


	// ****************** update laneGGFeatureGeo ******************
	laneGG.laneGGFeatureGeo.movsStartLineSp = startP;
	laneGG.laneGGFeatureGeo.movsStartLineEp = endP;

};


export default modelMovsStartLine;
