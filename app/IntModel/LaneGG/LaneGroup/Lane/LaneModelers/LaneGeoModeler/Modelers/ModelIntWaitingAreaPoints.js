
import SharedGeometryLib from "../../../../../../SharedGeometryLib";


/**************************************************************************
	Would model:
		1. lane.laneGeo.wArcLsSp = [x, y],  //left start point of the waiting area arc
		2. lane.laneGeo.wArcRsSp = [x, y],  //right start point of the waiting area arc
		3. lane.laneGeo.wArcLsEp = [x, y],  //left end point of the waiting area arc
		4. lane.laneGeo.wArcRsEp = [x, y],  //right end point of the waiting area arc
		5. lane.laneGeo.wArcCp = [x, y],  //center point of the waiting area arc

		6. lane.laneGeo.toLaneLsSp = [x, y],  //toLane left side start point
		7. lane.laneGeo.toLaneRsSp = [x, y],  //toLane right side start point

	Note:
		1. If the current lane and toLane are parallel, the center point would
		be null.
		2. If there are multiple toLanes, only take care of the first one.
**************************************************************************/

const modelIntWaitingAreaPoints = (lane, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(lane.THREE);

	const laneLsSp = lane.laneGeo.lsSp;  //[x, y]
	const laneLsEp = lane.laneGeo.lsEp;  //[x, y]
	//const laneRsSp = lane.laneGeo.rsSp;  //[x, y]
	const laneRsEp = lane.laneGeo.rsEp;  //[x, y]


	//************************ Find the toLane ********************
	//only consider the first toLane
	const intersection = lane.laneGroup.laneGG.approach.intersection;
	const approaches = intersection.approaches;
	const toMov = lane.laneMov[0].split("-");  //only consider the first laneMov
	const toAppIndex = toMov[0];
	const toApp = approaches[toAppIndex];
	const toLaneGG = toApp.laneGG;
	const toLaneIndex = toMov[1];
	const toLaneGroupsIndex = toLaneGG.laneGGGeo.mainObLaneGroups.concat(toLaneGG.laneGGGeo.sideObLaneGroups);
	let toLane;

	for (let i = 0; i < toLaneGroupsIndex.length; i++) {
		const oneToLaneGroupIndex = toLaneGroupsIndex[i];
		const oneToLaneGroup = toLaneGG.laneGroups[oneToLaneGroupIndex];

		const toLanes = oneToLaneGroup.lanes;

		for (let j = 0; j < toLanes.length; j++) {
			const oneToLaneIndex = toLanes[j].laneIndex;

			if (Math.abs(oneToLaneIndex).toString() === toLaneIndex) {
				toLane = toLanes[j];
				j = toLanes.length;
				i = toLaneGroupsIndex.length;
			}
		}
	}



	// *********************** Prepare toLane critical points ***********************

	const toLaneLsSp = toLane.laneGeo.rsSp;  //[x, y]
	const toLaneLsEp = toLane.laneGeo.rsEp;  //[x, y]
	const toLaneRsSp = toLane.laneGeo.lsSp;  //[x, y]
	const toLaneRsEp = toLane.laneGeo.lsEp;  //[x, y]


	// *********************** Decide waiting arc start points ***********************
	const getInterPoint = sharedGeometryLib.getIntersectedPointByPoints;
	const getDistBtwPoints = sharedGeometryLib.getDistBtwTwoPoints;
	const getPointMovedDist = sharedGeometryLib.getPointMovedDistFromAtoB;

	const lsInterP = getInterPoint(
					laneLsSp[0], laneLsSp[1],
					laneLsEp[0], laneLsEp[1],
					toLaneLsSp[0], toLaneLsSp[1],
					toLaneLsEp[0], toLaneLsEp[1],
					accuracy
				);  //could be null

	let wArcLsSp = null;  //left start point of the waiting area arc
	let wArcRsSp = null;  //right start point of the waiting area arc
	let wArcLsEp = null;  //left end point of the waiting area arc
	let wArcRsEp = null;  //right end point of the waiting area arc
	let centerPoint = null;  //center point of the waiting area arc

	//only if the lane and toLane is not parallel:
	if (lsInterP) {
		const dist1 = getDistBtwPoints(
				laneLsSp[0], laneLsSp[1],
				lsInterP[0], lsInterP[1]
			);

		const dist2 = getDistBtwPoints(
						toLaneLsSp[0], toLaneLsSp[1],
						lsInterP[0], lsInterP[1]
					);

		const dist = (dist1 < dist2) ? dist1 : dist2;

		wArcLsSp = getPointMovedDist(
							lsInterP[0], lsInterP[1],
							laneLsSp[0], laneLsSp[1],
							dist
						);

		wArcLsEp = getPointMovedDist(
							lsInterP[0], lsInterP[1],
							toLaneLsSp[0], toLaneLsSp[1],
							dist
						);

		// *********************** Decide waiting arc end points ***********************
		//const laneWidth = lane.laneWidth * meterToPixel; //in pixel
		const laneEpsVec = new lane.THREE.Vector2(
							laneRsEp[0] - laneLsEp[0],
							laneRsEp[1] - laneLsEp[1]
						);

		const wArcRsSpVec = new lane.THREE.Vector2(wArcLsSp[0], wArcLsSp[1]);
		wArcRsSpVec.add(laneEpsVec);

		wArcRsSp = [wArcRsSpVec.x, wArcRsSpVec.y];  //[x, y]

		const toLaneEpsVec = new lane.THREE.Vector2(
								toLaneRsEp[0] - toLaneLsEp[0],
								toLaneRsEp[1] - toLaneLsEp[1]
							);
		//toLaneEpsVec.setLength(laneWidth);
		const wArcRsEpVec = new	lane.THREE.Vector2(wArcLsEp[0], wArcLsEp[1]);
		wArcRsEpVec.add(toLaneEpsVec);

		wArcRsEp = [wArcRsEpVec.x, wArcRsEpVec.y];  //[x, y]


		// *********************** Decide waiting arc center point ***********************

		centerPoint = getInterPoint(
						wArcRsSp[0], wArcRsSp[1],
						wArcLsSp[0], wArcLsSp[1],
						wArcRsEp[0], wArcRsEp[1],
						wArcLsEp[0], wArcLsEp[1],
						accuracy
					);  //could be null
	}



	// *********************** Update laneGeo ***********************
	lane.laneGeo.wArcLsSp = wArcLsSp;  //left start point of the waiting area arc
	lane.laneGeo.wArcRsSp = wArcRsSp;  //right start point of the waiting area arc
	lane.laneGeo.wArcLsEp = wArcLsEp;  //left end point of the waiting area arc
	lane.laneGeo.wArcRsEp = wArcRsEp;  //right end point of the waiting area arc
	lane.laneGeo.wArcCp = centerPoint;  //center point of the waiting area arc


	lane.laneGeo.toLaneLsSp = toLaneLsSp;  //toLane left side start point
	lane.laneGeo.toLaneRsSp = toLaneRsSp;  //toLane right side start point

};


export default modelIntWaitingAreaPoints;
