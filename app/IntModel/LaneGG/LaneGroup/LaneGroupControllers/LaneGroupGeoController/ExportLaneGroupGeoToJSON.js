



const exportLaneGroupGeoToJSON = (laneGroup) => {
	const laneGroupGeoData = {};

	// ************************* Collect laneGroup level geo data **************************
	laneGroupGeoData.bound = laneGroup.bound;
	laneGroupGeoData.lanes = [];

	// ********************* Ask lanes to collect lane level geo data **********************
	const lanes = laneGroup.lanes;
	lanes.forEach((oneLane) => {
		const oneLaneGeoData = oneLane.laneControllers.exportLaneGeoToJSON(oneLane);
		laneGroupGeoData.lanes.push(oneLaneGeoData);
	});


	return laneGroupGeoData;
};


export default exportLaneGroupGeoToJSON;
