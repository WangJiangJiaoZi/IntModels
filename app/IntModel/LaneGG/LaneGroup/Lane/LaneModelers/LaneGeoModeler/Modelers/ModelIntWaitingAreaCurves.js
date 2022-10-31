import SharedGeometryLib from "../../../../../../SharedGeometryLib";


/**************************************************************************
	Would model:
		1. lane.laneShape.wAreaLsCurves = [intances of THREE.Shape],
		2. lane.laneShape.wAreaRsCurves = [intances of THREE.Shape],
		3. lane.laneShape.wAreaStopBar = an instance of THREE.Shape,


	Note:
		None.
**************************************************************************/


const modelIntWaitingAreaCurves = (lane, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(lane.THREE);
	const envSetters = lane.laneGroup.laneGG.approach.intersection.intModel.envSetters;

	const laneLsSp = lane.laneGeo.lsSp;  //[x, y]
	const laneLsEp = lane.laneGeo.lsEp;  //[x, y]
	const laneRsSp = lane.laneGeo.rsSp;  //[x, y]

	const wArcLsSp = lane.laneGeo.wArcLsSp;  //[x, y]
	const wArcLsEp = lane.laneGeo.wArcLsEp;  //[x, y]
	const wArcRsSp = lane.laneGeo.wArcRsSp;  //[x, y]
	const wArcRsEp = lane.laneGeo.wArcRsEp;  //[x, y]

	const wArcCp = lane.laneGeo.wArcCp;  //[x, y]

	const toLaneLsSp = lane.laneGeo.toLaneLsSp; //[x, y]
	const toLaneRsSp = lane.laneGeo.toLaneRsSp; //[x, y]

	const laneWidth = lane.laneWidth * meterToPixel; //in pixel
	const lineWidth = envSetters.roadLineMarkWidth * meterToPixel;  //in pixel

	const getDistBtwPoints = sharedGeometryLib.getDistBtwTwoPoints;
	const getArc = sharedGeometryLib.getArc;

	const waitingAreaLen = lane.waitingLength * meterToPixel; //in pixel

	//************************ Declare curves ************************
	const wAreaLslCurves = new lane.THREE.Shape();
	const wAreaLsrCurves = new lane.THREE.Shape();
	const wAreaRslCurves = new lane.THREE.Shape();
	const wAreaRsrCurves = new lane.THREE.Shape();


	// *********************** Decide the three sections length  if needed **********************
	//if wArcLsSp is null, it means that the lane and its toLane are parallel. Thus no need
	//to draw an arc:
	if (!wArcLsSp) {
		//decide the two shift vectors:
		const laneShiftLeftVec = new lane.THREE.Vector2(
									laneLsSp[0] - laneRsSp[0],
									laneLsSp[1] - laneRsSp[1]
								);
		laneShiftLeftVec.setLength(lineWidth / 2);

		const laneShiftRightVec = new lane.THREE.Vector2(
								laneRsSp[0] - laneLsSp[0],
								laneRsSp[1] - laneLsSp[1]
							);
		laneShiftRightVec.setLength(lineWidth / 2);

		//decide the left side curves:
		const wAreaLslSp = new lane.THREE.Vector2(laneLsSp[0], laneLsSp[1]);
		const wAreaLsrSp = wAreaLslSp.clone();

		wAreaLslSp.add(laneShiftLeftVec);
		wAreaLsrSp.add(laneShiftRightVec);


		const wAreaLsCenterEp = new lane.THREE.Vector2(
								toLaneLsSp[0] - laneLsSp[0],
								toLaneLsSp[1] - laneLsSp[1]
							);
		wAreaLsCenterEp.setLength(waitingAreaLen);
		wAreaLsCenterEp.add(new lane.THREE.Vector2(laneLsSp[0], laneLsSp[1]));


		const wAreaLslEp = new lane.THREE.Vector2(wAreaLsCenterEp.x, wAreaLsCenterEp.y);
		const wAreaLsrEp = wAreaLslEp.clone();

		wAreaLslEp.add(laneShiftLeftVec);
		wAreaLsrEp.add(laneShiftRightVec);

		wAreaLslCurves.moveTo(wAreaLslSp.x, wAreaLslSp.y);
		wAreaLslCurves.lineTo(wAreaLslEp.x, wAreaLslEp.y);
		wAreaLsrCurves.moveTo(wAreaLsrSp.x, wAreaLsrSp.y);
		wAreaLsrCurves.lineTo(wAreaLsrEp.x, wAreaLsrEp.y);

		//decide the right side curves:
		const wAreaRslSp = new lane.THREE.Vector2(laneRsSp[0], laneRsSp[1]);
		const wAreaRsrSp = wAreaRslSp.clone();

		wAreaRslSp.add(laneShiftLeftVec);
		wAreaRsrSp.add(laneShiftRightVec);


		const wAreaRsCenterEp = new lane.THREE.Vector2(
								toLaneRsSp[0] - laneRsSp[0],
								toLaneRsSp[1] - laneRsSp[1]
							);
		wAreaRsCenterEp.setLength(waitingAreaLen);
		wAreaRsCenterEp.add(new lane.THREE.Vector2(laneRsSp[0], laneRsSp[1]));


		const wAreaRslEp = new lane.THREE.Vector2(wAreaRsCenterEp.x, wAreaRsCenterEp.y);//toLaneRsSp[0], toLaneRsSp[1]);
		const wAreaRsrEp = wAreaRslEp.clone();

		wAreaRslEp.add(laneShiftLeftVec);
		wAreaRsrEp.add(laneShiftRightVec);

		wAreaRslCurves.moveTo(wAreaRslSp.x, wAreaRslSp.y);
		wAreaRslCurves.lineTo(wAreaRslEp.x, wAreaRslEp.y);
		wAreaRsrCurves.moveTo(wAreaRsrSp.x, wAreaRsrSp.y);
		wAreaRsrCurves.lineTo(wAreaRsrEp.x, wAreaRsrEp.y);

	}
	//else, decide the three sections:
	else {
		//dist1 refers to the distance between current lane left side start point and
		//waiting area arc left side start point. (The two points can actually be the same
		//thus dist1 could be 0 in this case.)
		const dist1 = getDistBtwPoints(
						laneLsSp[0], laneLsSp[1],
						wArcLsSp[0], wArcLsSp[1]
					);

		//arcDist refers to the whole arc length. The waiting area may use none of, part of, or all of
		//the arc.
		const arcRadius = getDistBtwPoints(
						wArcLsSp[0], wArcLsSp[1],
						wArcCp[0], wArcCp[1]
					);
		const arc = getArc(
						wArcCp[0], wArcCp[1],
						wArcLsSp[0], wArcLsSp[1],
						wArcLsEp[0], wArcLsEp[1],
						arcRadius
					);
		const arcDist = arc.getLength();

		//dist2 refers to the distance between waiting area arc left side end point and
		//destination lane (AKA toLane) left side start point. (The two points can actually be the
		//same thus dist2 could be 0 in this case.)
		const dist2 = getDistBtwPoints(
						toLaneLsSp[0], toLaneLsSp[1],
						wArcLsEp[0], wArcLsEp[1]
					);

		//************************ Declare vectors ************************



		const lsSpToArcSpVec = new lane.THREE.Vector2(
								wArcLsSp[0] - laneLsSp[0],
								wArcLsSp[1] - laneLsSp[1]
							);
		const laneLsSpVec = new lane.THREE.Vector2(laneLsSp[0], laneLsSp[1]);
		const laneRsSpVec = new lane.THREE.Vector2(laneRsSp[0], laneRsSp[1]);

		//************************ Decide curves start points ************************
		const laneShiftLeftVec = new lane.THREE.Vector2(
								laneLsSp[0] - laneRsSp[0],
								laneLsSp[1] - laneRsSp[1]
							);
		laneShiftLeftVec.setLength(lineWidth / 2);

		const laneShiftRightVec = new lane.THREE.Vector2(
								laneRsSp[0] - laneLsSp[0],
								laneRsSp[1] - laneLsSp[1]
							);
		laneShiftRightVec.setLength(lineWidth / 2);

		let wAreaLslPointVec = laneLsSpVec.clone();
		wAreaLslPointVec.add(laneShiftLeftVec);

		let wAreaLsrPointVec = laneLsSpVec.clone();
		wAreaLsrPointVec.add(laneShiftRightVec);

		let wAreaRslPointVec = laneRsSpVec.clone();
		wAreaRslPointVec.add(laneShiftLeftVec);

		let wAreaRsrPointVec = laneRsSpVec.clone();
		wAreaRsrPointVec.add(laneShiftRightVec);

		wAreaLslCurves.moveTo(wAreaLslPointVec.x, wAreaLslPointVec.y);
		wAreaLsrCurves.moveTo(wAreaLsrPointVec.x, wAreaLsrPointVec.y);
		wAreaRslCurves.moveTo(wAreaRslPointVec.x, wAreaRslPointVec.y);
		wAreaRsrCurves.moveTo(wAreaRsrPointVec.x, wAreaRsrPointVec.y);

		//************************ Section 1 ************************
		let sectionVec = lsSpToArcSpVec.clone();
		if (dist1 > waitingAreaLen) {
			sectionVec.setLength(waitingAreaLen);
		}
		else {
			sectionVec.setLength(dist1);
		}

		wAreaLslPointVec.add(sectionVec);
		wAreaLsrPointVec.add(sectionVec);
		wAreaRslPointVec.add(sectionVec);
		wAreaRsrPointVec.add(sectionVec);

		wAreaLslCurves.lineTo(wAreaLslPointVec.x, wAreaLslPointVec.y);
		wAreaLsrCurves.lineTo(wAreaLsrPointVec.x, wAreaLsrPointVec.y);
		wAreaRslCurves.lineTo(wAreaRslPointVec.x, wAreaRslPointVec.y);
		wAreaRsrCurves.lineTo(wAreaRsrPointVec.x, wAreaRsrPointVec.y);

		//************************ Section 2 ************************
		if (dist1 < waitingAreaLen) {
			//The waiting area should not extend to section2 where it would be parallel
			//to the toLane. It wom't make any sense.
			const division = (waitingAreaLen > dist1 + arcDist) ? 1 : ((waitingAreaLen - dist1) / arcDist);
			const wAreaLsEpVec = arc.getPoint(division);

			const arcShiftLeftVec = new lane.THREE.Vector2(
										wArcCp[0] - wAreaLsEpVec.x,
										wArcCp[1] - wAreaLsEpVec.y
									);
			arcShiftLeftVec.setLength(lineWidth / 2);

			const arcShiftRightVec = new lane.THREE.Vector2(
										-wArcCp[0] + wAreaLsEpVec.x,
										-wArcCp[1] + wAreaLsEpVec.y
									);
			arcShiftRightVec.setLength(lineWidth);

			const rightArc = getArc(
						wArcCp[0], wArcCp[1],
						wArcRsSp[0], wArcRsSp[1],
						wArcRsEp[0], wArcRsEp[1],
						arcRadius + laneWidth
					);

			const wAreaRsEpVec = rightArc.getPoint(division);

			wAreaLsEpVec.add(arcShiftLeftVec);
			const wAreaLslArc = getArc(
								wArcCp[0], wArcCp[1],
								wAreaLslCurves.currentPoint.x, wAreaLslCurves.currentPoint.y,
								wAreaLsEpVec.x, wAreaLsEpVec.y,
								arcRadius - lineWidth / 2
							);
			wAreaLslCurves.add(wAreaLslArc);

			wAreaLsEpVec.add(arcShiftRightVec);
			const wAreaLsrArc = getArc(
								wArcCp[0], wArcCp[1],
								wAreaLsrCurves.currentPoint.x, wAreaLsrCurves.currentPoint.y,
								wAreaLsEpVec.x, wAreaLsEpVec.y,
								arcRadius + lineWidth / 2
							);
			wAreaLsrCurves.add(wAreaLsrArc);

			wAreaRsEpVec.add(arcShiftLeftVec);
			const wAreaRslArc = getArc(
								wArcCp[0], wArcCp[1],
								wAreaRslCurves.currentPoint.x, wAreaRslCurves.currentPoint.y,
								wAreaRsEpVec.x, wAreaRsEpVec.y,
								arcRadius + laneWidth - lineWidth / 2
							);
			wAreaRslCurves.add(wAreaRslArc);

			wAreaRsEpVec.add(arcShiftRightVec);
			const wAreaRsrArc = getArc(
								wArcCp[0], wArcCp[1],
								wAreaRsrCurves.currentPoint.x, wAreaRsrCurves.currentPoint.y,
								wAreaRsEpVec.x, wAreaRsEpVec.y,
								arcRadius + laneWidth + lineWidth / 2
							);
			wAreaRsrCurves.add(wAreaRsrArc);

		}

		//************************ Section 3 ************************

		if (dist1 + arcDist < waitingAreaLen) {
			sectionVec = new lane.THREE.Vector2(
								toLaneLsSp[0] - wArcLsEp[0],
								toLaneLsSp[1] - wArcLsEp[1]
							);
			const sectionLen = (waitingAreaLen > dist1 + arcDist + dist2) ? dist2 : (waitingAreaLen - dist1 - arcDist);
			sectionVec.setLength(sectionLen);

			wAreaLslPointVec = wAreaLslCurves.getPoint(1);  //vector2
			wAreaLsrPointVec = wAreaLsrCurves.getPoint(1);  //vector2
			wAreaRslPointVec = wAreaRslCurves.getPoint(1);  //vector2
			wAreaRsrPointVec = wAreaRsrCurves.getPoint(1);  //vector2

			wAreaLslCurves.moveTo(wAreaLslPointVec.x, wAreaLslPointVec.y);
			wAreaLsrCurves.moveTo(wAreaLsrPointVec.x, wAreaLsrPointVec.y);
			wAreaRslCurves.moveTo(wAreaRslPointVec.x, wAreaRslPointVec.y);
			wAreaRsrCurves.moveTo(wAreaRsrPointVec.x, wAreaRsrPointVec.y);

			wAreaLslPointVec.add(sectionVec);
			wAreaLsrPointVec.add(sectionVec);
			wAreaRslPointVec.add(sectionVec);
			wAreaRsrPointVec.add(sectionVec);


			wAreaLslCurves.lineTo(wAreaLslPointVec.x, wAreaLslPointVec.y);
			wAreaLsrCurves.lineTo(wAreaLsrPointVec.x, wAreaLsrPointVec.y);
			wAreaRslCurves.lineTo(wAreaRslPointVec.x, wAreaRslPointVec.y);
			wAreaRsrCurves.lineTo(wAreaRsrPointVec.x, wAreaRsrPointVec.y);

			//console.log(wAreaLslPointVec.x, wAreaLslPointVec.y)
		}
	}



	//************************ Decide stop bar curves ************************
	const buildRect = sharedGeometryLib.buildQuadrilateralFromVectors;

	const initVec = wAreaLsrCurves.getPoint(1);  //vector2
	const widthVec = new lane.THREE.Vector2(
						wAreaRslCurves.getPoint(1).x - initVec.x,
						wAreaRslCurves.getPoint(1).y - initVec.y
					);
	let heightVec = wAreaLsrCurves.getTangent(1);
	heightVec = new lane.THREE.Vector2(-heightVec.x, -heightVec.y);
	heightVec.setLength(lineWidth * 2);

	initVec.add(heightVec);

	heightVec.setLength(lineWidth);

	const stopBar = buildRect(initVec, widthVec, heightVec);


	//************************ Decide wating area curves ************************
	const getDashShapes = sharedGeometryLib.getDashShapesAlongCurves;
	const dashLength = envSetters.roadDashLineLength / 5 * meterToPixel;

	const wAreaLsCurves = getDashShapes(
							wAreaLslCurves, wAreaLsrCurves, dashLength
						);  //[intances of THREE.Shape]
	const wAreaRsCurves = getDashShapes(
							wAreaRslCurves, wAreaRsrCurves, dashLength
						);  //[intances of THREE.Shape]


	//************************ Update lane geometry ************************
	lane.laneShape.wAreaLsCurves = wAreaLsCurves;  //[intances of THREE.Shape]
	lane.laneShape.wAreaRsCurves = wAreaRsCurves;  //[intances of THREE.Shape]
	lane.laneShape.wAreaStopBar = stopBar;  //an instance of THREE.Shape

};

export default modelIntWaitingAreaCurves;
