
import modelIntCornerCurves from "./Modelers/ModelIntCornerCurves";
import modelIntCornerIslandCurves from "./Modelers/ModelIntCornerIslandCurves";
/************************************************************
	Model Intersection Corner Geometry:
		1. Would model int corner curves (outline curves).
		2. Would model channel island if necessary.
		3. Would model channel crosswalk if necessary.

	Inputs:
		1. current approach
		2. current corner object
		3. intSize in pixel
*************************************************************/

const modelIntCornerGeo = (curApp, corner, intSize, meterToPixel, accuracy) => {
	//**************** Model int corner curves *******************
	//model the shape of the corner
	modelIntCornerCurves(curApp, corner, intSize, meterToPixel, accuracy);


	//**************** Model int corner island if necessary *******************
	const cornerType = corner.cornerType; //1 for "channel" / 2 for "round" / 3 for "straight"
	if (cornerType === 3) {
		modelIntCornerIslandCurves(curApp, corner, intSize, meterToPixel, accuracy);
	}

};


export default modelIntCornerGeo;

