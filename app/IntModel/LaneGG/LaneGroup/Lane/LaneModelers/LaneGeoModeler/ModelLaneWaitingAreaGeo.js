import modelIntWaitingAreaPoints from "./Modelers/ModelIntWaitingAreaPoints";
import modelIntWaitingAreaCurves from "./Modelers/ModelIntWaitingAreaCurves";

/**************************************************************************
	Would model:
		1. lane waiting area points
		2. lane waiting area curves

	Note:
		"type" refers to "int" or "roundabout"
**************************************************************************/


const modelLaneWaitingAreaGeo = (lane, intSize, type, meterToPixel, accuracy) => {

	modelIntWaitingAreaPoints(lane, intSize, meterToPixel, accuracy);

	modelIntWaitingAreaCurves(lane, intSize, meterToPixel, accuracy);

};


export default modelLaneWaitingAreaGeo;
