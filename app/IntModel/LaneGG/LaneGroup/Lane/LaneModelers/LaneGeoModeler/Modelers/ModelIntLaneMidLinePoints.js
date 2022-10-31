
import SharedGeometryLib from "../../../../../../SharedGeometryLib";


/**************************************************************************
	Would model:
		1. lane.laneGeo.midLineSp = [x, y],  //start point of the lane middle line
		2. lane.laneGeo.midLineEp = [x, y],  //end point of the lane middle line
		3. lane.laneGeo.arrowCp = [x, y],   //lane arrow center point
		4. lane.laneGeo.midLineCp = [x, y],  //a control point on the middle line that is 10 meters away from end point

	Note:
		None
**************************************************************************/

const modelIntLaneMidLinePoints = (lane, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(lane.THREE);
	const envSetters = lane.laneGroup.laneGG.approach.intersection.intModel.envSetters;

	const laneArrowOffest = envSetters.laneArrowOffset * meterToPixel; //in pixel

	//************************ Calculate ************************
	//start point and end point:
	const midLineSp = [
		(lane.laneGeo.rsSp[0] + lane.laneGeo.lsSp[0]) / 2,
		(lane.laneGeo.rsSp[1] + lane.laneGeo.lsSp[1]) / 2
	];
	const midLineEp = [
		(lane.laneGeo.rsEp[0] + lane.laneGeo.lsEp[0]) / 2,
		(lane.laneGeo.rsEp[1] + lane.laneGeo.lsEp[1]) / 2
	];

	//arrow center point:
	const moveFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
	const arrowCp = moveFromAtoB(
					midLineSp[0], midLineSp[1],
					midLineEp[0], midLineEp[1],
					laneArrowOffest
				);  //[x, y]


	//middle line control point:
	const THREE = lane.THREE;
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
	lane.laneGeo.arrowCp = arrowCp;
	lane.laneGeo.midLineCp = midLineCp;
};


export default modelIntLaneMidLinePoints;
