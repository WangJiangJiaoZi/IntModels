


//would update laneGroupGeo.laneGroupWidth in meters

const modelLaneGroupWidth = (laneGroup) => {
	let laneGroupWidth = 0;
	const lanes = laneGroup.lanes;

	lanes.forEach((oneLane) => {
		const oneLaneWidth = oneLane.laneWidth;
		laneGroupWidth += oneLaneWidth;
	});

	laneGroup.laneGroupGeo.laneGroupWidth = laneGroupWidth;

};


export default modelLaneGroupWidth;
