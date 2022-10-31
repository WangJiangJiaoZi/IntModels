

import modelLaneGroupsWidth from "./Modelers/ModelLaneGroupsWidth";

import modelIntLaneGGStopBar from "./Modelers/ModelIntLaneGGStopBar";

import modelLaneGGCount from "./Modelers/ModelLaneGGCount";

/**************************************************************************
	Would model:
		1. inbound lane groups width (inbound main lane groups and side one)
		   outbound lane groups width (outbound main lane groups and side one)
		2. LaneGG stop bar.
		3. Ask lane groups to model themselves.

	Note:
		"type" refers to "int" or "roundabout"
**************************************************************************/
const modelLaneGGGeo = (laneGG, intSize, type, meterToPixel, accuracy) => {

	//********** Model laneGG width **********
	//update width in meters of the current laneGG (sum width of all its laneGroups)
	modelLaneGroupsWidth(laneGG, intSize, meterToPixel, accuracy);

	//********** Get index array of main lane groups and side lane groups by bound *********
	modelLaneGGCount(laneGG);


	if (type === "int") {
		//********** Model laneGG stop bar **********
		modelIntLaneGGStopBar(laneGG, intSize, meterToPixel, accuracy);

		//********** Ask lane groups to model themselves **********
		const laneGroups = laneGG.laneGroups;
		laneGroups.forEach((oneLaneGroup) => {
			oneLaneGroup.laneGroupModelers.laneGroupGeoModeler.modelLaneGroupGeo(
				oneLaneGroup, intSize, type, meterToPixel, accuracy
			);
		});
	}
	else {
		console.log("model roundabout laneGG. TBD ...");
	}



};



export default modelLaneGGGeo;
