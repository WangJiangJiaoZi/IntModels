
/**************************************************************************
	Would model:
		1. lane.laneGeo.lsSp = [x, y],  //start point of the lane left side
		2. lane.laneGeo.lsEp = [x, y],  //end point of the lane left side
		3. lane.laneGeo.rsSp = [x, y],  //start point of the lane right side
		4. lane.laneGeo.rsEp = [x, y],  //end point of the lane right side

	Note:
		None
**************************************************************************/

const modelIntLaneSidesPoints = (lane, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const laneGG = lane.laneGroup.laneGG;
	const stopAngleToEnd = laneGG.laneGGGeo.stopAngleToEnd;  //alpha
	const stopOuterSp = laneGG.laneGGGeo.stopOuterSp;  //[x, y]
	const stopOuterFinalP = laneGG.laneGGGeo.outerFinalP;  //[x, y]


	const app = laneGG.approach;
	const appRightOsEp = app.appGeo.outerRightEndPoint;  //[x, y]
	const appLeftOsEp = app.appGeo.outerLeftEndPoint;  //[x, y]

	const lg = lane.laneGroup;
	const lgSp = lg.laneGroupGeo.sp;  //laneGroup start point
	const lgEp = lg.laneGroupGeo.ep;  //laneGroup end point


	const bound = lg.bound; //"inbound" / "outbound" / "inboundSide" / "outboundSide"
	const lanes = lg.lanes;  //an array

	const laneIndex = lane.laneIndex;
	const laneWidth = lane.laneWidth * meterToPixel; //in pixel


	// ************ Decide shadow distance to laneGroup start point *************
	let shadowLeftDistToSp = 0;  //in pixel
	let shadowRightDistToSp = 0;  //in pixel

	for (let i = 0; i < laneIndex; i++) {
		const oneLane = lanes[i];
		const oneLaneWidth = oneLane.laneWidth * meterToPixel; //in pixel
		shadowLeftDistToSp += oneLaneWidth;
	}

	shadowRightDistToSp = shadowLeftDistToSp + lanes[laneIndex].laneWidth * meterToPixel;


	// ************ Decide distance to laneGroup start point *************
	if (Math.abs(Math.cos(stopAngleToEnd)) < accuracy) {
		throw "Unreasonable stop bar angle";
	}
	const leftDistToSp = shadowLeftDistToSp / Math.abs(Math.cos(stopAngleToEnd));
	const rightDistToSp = shadowRightDistToSp / Math.abs(Math.cos(stopAngleToEnd));


	// ************ vectors and points to use *************
	let lsSp, lsEp, rsSp, rsEp;
	const lgSpVec = new lane.THREE.Vector2(lgSp[0], lgSp[1]);
	const lgEpVec = new lane.THREE.Vector2(lgEp[0], lgEp[1]);
	let leftSpVec, rightSpVec, leftEpVec, rightEpVec;

	// ************ Decide points vectors to process *************
	if (bound === "inbound") {
		//decide start points:
		leftSpVec = new lane.THREE.Vector2(
							stopOuterSp[0] - stopOuterFinalP[0],
							stopOuterSp[1] - stopOuterFinalP[1]
						);
		rightSpVec = leftSpVec.clone();

		leftEpVec = new lane.THREE.Vector2(
							appRightOsEp[0] - appLeftOsEp[0],
							appRightOsEp[1] - appLeftOsEp[1]
						);
		rightEpVec = leftEpVec.clone();

		// ************ Decide start point *************

		leftSpVec.setLength(leftDistToSp);
		rightSpVec.setLength(rightDistToSp);

		leftSpVec.add(lgSpVec);
		rightSpVec.add(lgSpVec);

		lsSp = [leftSpVec.x, leftSpVec.y];
		rsSp = [rightSpVec.x, rightSpVec.y];


		// ************ Decide end point *************
		leftEpVec.setLength(shadowLeftDistToSp);
		rightEpVec.setLength(shadowRightDistToSp);

		leftEpVec.add(lgEpVec);
		rightEpVec.add(lgEpVec);

		lsEp = [leftEpVec.x, leftEpVec.y];
		rsEp = [rightEpVec.x, rightEpVec.y];
	}
	else if (bound === "outbound") {
		leftSpVec = new lane.THREE.Vector2(
							-stopOuterSp[0] + stopOuterFinalP[0],
							-stopOuterSp[1] + stopOuterFinalP[1]
						);
		rightSpVec = leftSpVec.clone();

		leftEpVec = new lane.THREE.Vector2(
							-appRightOsEp[0] + appLeftOsEp[0],
							-appRightOsEp[1] + appLeftOsEp[1]
						);
		rightEpVec = leftEpVec.clone();

		// ************ Decide start point *************
		leftSpVec.setLength(rightDistToSp);
		rightSpVec.setLength(leftDistToSp);

		leftSpVec.add(lgSpVec);
		rightSpVec.add(lgSpVec);

		lsSp = [leftSpVec.x, leftSpVec.y];
		rsSp = [rightSpVec.x, rightSpVec.y];

		// ************ Decide end point *************
		leftEpVec.setLength(shadowRightDistToSp);
		rightEpVec.setLength(shadowLeftDistToSp);

		leftEpVec.add(lgEpVec);
		rightEpVec.add(lgEpVec);

		lsEp = [leftEpVec.x, leftEpVec.y];
		rsEp = [rightEpVec.x, rightEpVec.y];
	}



	// ************ Update lane geometry ************
	lane.laneGeo.lsSp = lsSp;
	lane.laneGeo.rsSp = rsSp;
	lane.laneGeo.lsEp = lsEp;
	lane.laneGeo.rsEp = rsEp;
};


export default modelIntLaneSidesPoints;
