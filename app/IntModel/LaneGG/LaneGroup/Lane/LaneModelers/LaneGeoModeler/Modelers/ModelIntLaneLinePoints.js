import SharedGeometryLib from "../../../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		1. lane.laneShape.laneSolidLineCurves: an instance of THREE.Shape,
			//would be null for outbound lanes
		2. lane.laneShape.laneDashLineCurves = [intances of THREE.Shape],


	Note:
		None
**************************************************************************/

const modelIntLaneLinePoints = (lane, intSize, meterToPixel) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(lane.THREE);
	const envSetters = lane.laneGroup.laneGG.approach.intersection.intModel.envSetters;

	const laneRsSp = lane.laneGeo.rsSp; //[x, y]
	const laneRsEp = lane.laneGeo.rsEp; //[x, y]
	const laneLsSp = lane.laneGeo.lsSp; //[x, y]
	const laneLsEp = lane.laneGeo.lsEp; //[x, y]

	const laneLineWidth = envSetters.roadLineMarkWidth * meterToPixel; //in pixel
	const laneDashLength = envSetters.roadDashLineLength * meterToPixel; //in pixel
	const laneSolidLineLength = lane.whiteLinelength * meterToPixel; //in pixel
	const laneLineTotalLength = lane.laneLength * meterToPixel; //in pixel, could be minus for unlimited length

	const bound = lane.laneGroup.bound;


	//************************ Decide start width ************************
	const alpha = lane.laneGroup.laneGG.laneGGGeo.stopAngleToEnd;
	const laneRsSpVec = new lane.THREE.Vector2(laneRsSp[0], laneRsSp[1]);
	const laneLsSpVec = new lane.THREE.Vector2(laneLsSp[0], laneLsSp[1]);
	const lsToRsSpVec = new lane.THREE.Vector2(
							laneRsSp[0] - laneLsSp[0],
							laneRsSp[1] - laneLsSp[1]
						);
	const rsToLsSpVec = new lane.THREE.Vector2(
							-laneRsSp[0] + laneLsSp[0],
							-laneRsSp[1] + laneLsSp[1]
						);

	const spToEpVec = new lane.THREE.Vector2(
						laneLsEp[0] - laneLsSp[0],
						laneLsEp[1] - laneLsSp[1]
					);

	const rsToLsEpVec = new lane.THREE.Vector2(
						laneLsEp[0] - laneRsEp[0],
						laneLsEp[1] - laneRsEp[1]
					);
	rsToLsEpVec.setLength(laneLineWidth / 2);

	const lsToRsEpVec = new lane.THREE.Vector2(
						-laneLsEp[0] + laneRsEp[0],
						-laneLsEp[1] + laneRsEp[1]
					);
	lsToRsEpVec.setLength(laneLineWidth / 2);

	const startWidth = laneLineWidth / Math.abs(Math.cos(alpha));

	//************************ Decide solid line start points ************************
	const rsSolidSpVec = lsToRsSpVec.clone();
	rsSolidSpVec.setLength(startWidth / 2);

	const lsSolidSpVec = rsToLsSpVec.clone();
	lsSolidSpVec.setLength(startWidth / 2);

	if (bound === "inbound") {
		rsSolidSpVec.add(laneLsSpVec);
		lsSolidSpVec.add(laneLsSpVec);
	}
	else {
		rsSolidSpVec.add(laneRsSpVec);
		lsSolidSpVec.add(laneRsSpVec);
	}

	const rsSolidSp = [rsSolidSpVec.x, rsSolidSpVec.y];
	const lsSolidSp = [lsSolidSpVec.x, lsSolidSpVec.y];


	//************************ Decide solid line end points ************************
	const solidEpVec = spToEpVec.clone();
	if (laneSolidLineLength > 0) {
		solidEpVec.setLength(laneSolidLineLength);
	}

	if (bound === "inbound") {
		solidEpVec.add(laneLsSpVec);
	}
	else {
		solidEpVec.add(laneRsSpVec);
	}

	const rsSolidEpVec = solidEpVec.clone();
	const lsSolidEpVec = solidEpVec.clone();

	rsSolidEpVec.add(lsToRsEpVec);
	lsSolidEpVec.add(rsToLsEpVec);

	const rsSolidEp = [rsSolidEpVec.x, rsSolidEpVec.y];
	const lsSolidEp = [lsSolidEpVec.x, lsSolidEpVec.y];


	//************************ Decide dash line start points ************************
	const dashSpVec = spToEpVec.clone();

	if (bound === "inbound") {
		dashSpVec.setLength(laneSolidLineLength);
		dashSpVec.add(laneLsSpVec);
	}
	else {
		dashSpVec.setLength(0);
		dashSpVec.add(laneRsSpVec);
	}

	const rsDashSpVec = dashSpVec.clone();
	const lsDashSpVec = dashSpVec.clone();

	rsDashSpVec.add(lsToRsEpVec);
	lsDashSpVec.add(rsToLsEpVec);

	const rsDashSp = [rsDashSpVec.x, rsDashSpVec.y];
	const lsDashSp = [lsDashSpVec.x, lsDashSpVec.y];


	//************************ Decide dash line end points ************************
	let dashEpVec = spToEpVec.clone();

	if (bound === "inbound") {
		if (laneLineTotalLength > 0) {
			dashEpVec.setLength(laneLineTotalLength);
		}

		dashEpVec.add(laneLsSpVec);
	}
	else {
		if (laneLineTotalLength > 0) {
			dashEpVec.setLength(laneLineTotalLength);
		}
		else {
			dashEpVec = new lane.THREE.Vector2(
							laneRsEp[0] - laneRsSp[0],
							laneRsEp[1] - laneRsSp[1]
						);
		}
		dashEpVec.add(laneRsSpVec);
	}

	const rsDashEpVec = dashEpVec.clone();
	const lsDashEpVec = dashEpVec.clone();

	rsDashEpVec.add(lsToRsEpVec);
	lsDashEpVec.add(rsToLsEpVec);

	const rsDashEp = [rsDashEpVec.x, rsDashEpVec.y];
	const lsDashEp = [lsDashEpVec.x, lsDashEpVec.y];


	//************************ Build solid line curves ************************
	let laneSolidLineCurves = null;

	if (bound === "inbound") {
		laneSolidLineCurves = new lane.THREE.Shape();
		laneSolidLineCurves.moveTo(rsSolidSp[0], rsSolidSp[1]);
		laneSolidLineCurves.lineTo(rsSolidEp[0], rsSolidEp[1]);
		laneSolidLineCurves.lineTo(lsSolidEp[0], lsSolidEp[1]);
		laneSolidLineCurves.lineTo(lsSolidSp[0], lsSolidSp[1]);
		laneSolidLineCurves.closePath();
	}


	//************************ Build dash line curves ************************
	const rsDashCurves = new lane.THREE.Shape();
	rsDashCurves.moveTo(rsDashSp[0], rsDashSp[1]);
	rsDashCurves.lineTo(rsDashEp[0], rsDashEp[1]);

	const lsDashCurves = new lane.THREE.Shape();
	lsDashCurves.moveTo(lsDashSp[0], lsDashSp[1]);
	lsDashCurves.lineTo(lsDashEp[0], lsDashEp[1]);

	let laneDashLineCurves;

	//if not bike lane:
	if (lane.laneMov !== null) {
		const getDashFromCurves = sharedGeometryLib.getDashShapesAlongCurves;

		laneDashLineCurves = getDashFromCurves(
									rsDashCurves, lsDashCurves, laneDashLength
								);
	}
	//else, it is bike lane and there is actually no dash line
	else {
		if (bound === "inbound") {
			laneDashLineCurves = [];
		}
		else {
			const laneDashLineCurve = new lane.THREE.Shape();
			laneDashLineCurve.moveTo(
				lsDashCurves.getPoint(0).x,
				lsDashCurves.getPoint(0).y
			);
			laneDashLineCurve.add(lsDashCurves);
			laneDashLineCurve.moveTo(
				lsDashCurves.getPoint(1).x,
				lsDashCurves.getPoint(1).y
			);
			laneDashLineCurve.lineTo(
				rsDashCurves.getPoint(1).x,
				rsDashCurves.getPoint(1).y
			);
			laneDashLineCurve.lineTo(
				rsDashCurves.getPoint(0).x,
				rsDashCurves.getPoint(0).y
			);
			laneDashLineCurve.closePath();
			laneDashLineCurves = [laneDashLineCurve];
		}

	}



	//************************ Update lane geometry ************************
	lane.laneShape.laneSolidLineCurves = laneSolidLineCurves;
			//would be null for outbound lanes
	lane.laneShape.laneDashLineCurves = laneDashLineCurves;

};


export default modelIntLaneLinePoints;
