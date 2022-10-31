
import modelIntSideLaneSidesPoints from "./Modelers/ModelIntSideLaneSidesPoints";
import modelIntSideLaneMidLinePoints from "./Modelers/ModelIntSideLaneMidLinePoints";

/**************************************************************************
	Would model:
		1. side lane left and right sides start and end points
		2. side lane middle line's start and end points


	Note:
		1. Assuming that only one side lane at most in one side laneGroup.
		2. "type" refers to "int" or "roundabout"
**************************************************************************/
const modelSideLaneGeo = (lane, intSize, type, meterToPixel, accuracy) => {

	//if "int" intersection
	if (type === "int") {
		//********** Model side lane left and right sides' start and end points **********
		modelIntSideLaneSidesPoints(lane, intSize, meterToPixel);


		//***** Model lane middle line's start and end points *****
		modelIntSideLaneMidLinePoints(lane, meterToPixel);

	}
	//else, it is "roundabout"
	else {
		//TBD
	}
};


export default modelSideLaneGeo;
