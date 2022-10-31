

import modelIntLaneGroupPoints from "./Modelers/ModelIntLaneGroupPoints";

/**************************************************************************
	Would model:
		1. lane group start and end points
		1. lane group geometry by asking each lane to model its geometry

	Note:
		"type" refers to "int" or "roundabout"
**************************************************************************/

const modelLaneGroupGeo = (laneGroup, intSize, type, meterToPixel, accuracy) => {
	const bound = laneGroup.bound;
	const lanes = laneGroup.lanes;
	//if an main laneGroup:
	if (bound === "inbound" || bound === "outbound") {
		// ************* Model lane group start and end points ***************
		modelIntLaneGroupPoints(laneGroup, intSize, meterToPixel, accuracy);

		// ************* Ask lanes to model themselves ***************
		lanes.forEach((oneLane) => {
			oneLane.laneModelers.laneGeoModeler.modelLaneGeo(
				oneLane, intSize, type, meterToPixel, accuracy
			);
		});
	}
	//else, a side laneGroup:
	else {
		// ************* Ask lanes to model themselves ***************
		//Assuming that only one side lane at most in one side laneGroup
		lanes.forEach((oneLane) => {
			oneLane.laneModelers.laneGeoModeler.modelSideLaneGeo(
				oneLane, intSize, type, meterToPixel, accuracy
			);
		});
	}

};


export default modelLaneGroupGeo;
