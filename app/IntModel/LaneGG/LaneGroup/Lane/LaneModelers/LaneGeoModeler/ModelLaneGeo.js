
import modelIntLaneSidesPoints from "./Modelers/ModelIntLaneSidesPoints";
import modelIntLaneMidLinePoints from "./Modelers/ModelIntLaneMidLinePoints";
import modelIntLaneLinePoints from "./Modelers/ModelIntLaneLinePoints";
import modelIntLaneArrowType from "./Modelers/ModelIntLaneArrowType";

/**************************************************************************
	Would model:
		1. lane left and right sides start and end points
		2. lane middle line's start and end points
		3. lane lines' points
		4. lane arrow type
		5. lane arrow's center point
		6. lane text if any

	Note:
		"type" refers to "int" or "roundabout"
**************************************************************************/
const modelLaneGeo = (lane, intSize, type, meterToPixel, accuracy) => {

	//if "int" intersection
	if (type === "int") {
		const laneGroup = lane.laneGroup;
		const bound = laneGroup.bound;
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const laneIndex = lane.laneIndex;

		//********** Model lane left and right sides' start and end points **********
		modelIntLaneSidesPoints(lane, intSize, meterToPixel, accuracy);


		//***** Model lane middle line's start and end points, and arrow center point *****
		modelIntLaneMidLinePoints(lane, intSize, meterToPixel, accuracy);


		//********** Model lane line points and curves **********
		let ifNeed = true;

		//only need to draw line if the lane is the inner lane:
		if (bound === "inbound" && laneGroupIndex === 0 && laneIndex === 0) {
			ifNeed = false;
		}
		else if (bound === "outbound" && laneIndex === 0) {
			ifNeed = false;
		}

		if (ifNeed) {
			modelIntLaneLinePoints(lane, intSize, meterToPixel);
		}


		//********** Model lane arrow type ************
		//only need to draw arrow if the lane is not a side road:
		if (bound === "inbound" || bound === "outbound") {
			modelIntLaneArrowType(lane, intSize, meterToPixel);
		}

		//********** Model lane text if any ************
		//TBD...

	}
	//else, it is "roundabout"
	else {
		//TBD
	}
};


export default modelLaneGeo;
