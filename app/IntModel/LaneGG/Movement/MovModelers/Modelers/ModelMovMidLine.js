
/**********************************************************************************
	Would model movement's middle line that its arrow and text would render along.

	Would update:
		1.middle line start point
			movFeatureGeo.midLineSp = [x, y];
		2.middle line end point
			movFeatureGeo.midLineEp = [x, y];
***********************************************************************************/
const modelMovMidLine = (movement, intSize, meterToPixel, accuracy) => {
	// ********************* parameter preparation *********************
	const movsStartLineSp = movement.frLaneGG.laneGGFeatureGeo.movsStartLineSp; //[x, y]
	const movsStartLineEp = movement.frLaneGG.laneGGFeatureGeo.movsStartLineEp; //[x, y]
	const appRightOuterEp = movement.frLaneGG.approach.appGeo.outerRightEndPoint; //[x, y]

	const envSetters = movement.frLaneGG.approach.intersection.intModel.envSetters;
	const movSideGap = envSetters.movSideGap * meterToPixel;  //side gap in meters
	const movMiddleGap = envSetters.movMiddleGap * meterToPixel;  //middle gap in meters

	const THREE = movement.THREE;

	// ************************ do calculation *************************
	const movMidLineDistToApp = movSideGap + movMiddleGap * movement.movFeatureGeo.order;
	const midLineSpVec = new THREE.Vector2(movsStartLineSp[0], movsStartLineSp[1]);
	const startLineVec = new THREE.Vector2(
							movsStartLineEp[0] - movsStartLineSp[0],
							movsStartLineEp[1] - movsStartLineSp[1]
						);
	startLineVec.setLength(movMidLineDistToApp);
	midLineSpVec.add(startLineVec);
	const midLineSp = [midLineSpVec.x, midLineSpVec.y];

	const appRightVec = new THREE.Vector2(
							appRightOuterEp[0] - movsStartLineSp[0],
							appRightOuterEp[1] - movsStartLineSp[1]
						);
	const midLineEpVec = midLineSpVec.clone().add(appRightVec);
	const midLineEp = [midLineEpVec.x, midLineEpVec.y];

	// ************************ update movFeatureGeo *************************
	movement.movFeatureGeo.midLineSp = midLineSp;
	movement.movFeatureGeo.midLineEp = midLineEp;
};


export default modelMovMidLine;
