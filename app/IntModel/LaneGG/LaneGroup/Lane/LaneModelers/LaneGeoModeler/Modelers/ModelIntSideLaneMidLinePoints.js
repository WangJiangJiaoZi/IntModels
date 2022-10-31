
/**************************************************************************
	Would model:
		1. lane.laneGeo.midLineSp = [x, y],  //start point of the lane middle line
		2. lane.laneGeo.midLineEp = [x, y],  //end point of the lane middle line
		3. lane.laneGeo.midLineCp = [x, y],  //a control point on the middle line that is 10 meters away from end point

	Note:
		1. Assuming that only one side lane at most in one side laneGroup.
**************************************************************************/


const modelIntSideLaneMidLinePoints = (lane, meterToPixel) => {
	const midLineEp = [
						(lane.laneGeo.rsEp[0] + lane.laneGeo.lsEp[0]) / 2,
						(lane.laneGeo.rsEp[1] + lane.laneGeo.lsEp[1]) / 2
					];  //[x, y]
	const midLineSp = [
						(lane.laneGeo.rsSp[0] + lane.laneGeo.lsSp[0]) / 2,
						(lane.laneGeo.rsSp[1] + lane.laneGeo.lsSp[1]) / 2
					];  //[x, y]

	//middle line control point:
	const THREE = lane.THREE;
	const envSetters = lane.laneGroup.laneGG.approach.intersection.intModel.envSetters;
	const approach = lane.laneGroup.laneGG.approach;
	const appOuterRightEp = approach.appGeo.outerRightEndPoint;  //[x, y]
	const appOuterRightSp = approach.appGeo.outerRightSp;   //[x, y]
	const connectorCpDist = envSetters.connectorCpDist * meterToPixel;  //in pixel
	const appEpToSpVec2 = new THREE.Vector2(
							appOuterRightSp[0] - appOuterRightEp[0],
							appOuterRightSp[1] - appOuterRightEp[1]
						);
	appEpToSpVec2.setLength(connectorCpDist);
	const midLineEpVec2 = new THREE.Vector2(midLineEp[0], midLineEp[1]);

	const midLineCpVec2 = midLineEpVec2.add(appEpToSpVec2);
	const midLineCp = [midLineCpVec2.x, midLineCpVec2.y];


	lane.laneGeo.midLineSp = midLineSp;
	lane.laneGeo.midLineEp = midLineEp;
	lane.laneGeo.midLineCp = midLineCp;
};

export default modelIntSideLaneMidLinePoints;
