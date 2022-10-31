
import modelIntCrosswalkSps from "./Modelers/ModelIntCrosswalkSps";
import modelIntCrosswalkEps from "./Modelers/ModelIntCrosswalkEps";
import modelIntCrosswalkCurves from "./Modelers/ModelIntCrosswalkCurves";

/************************************************************
	Model Crosswalk Geometry:
		1. Would model crosswalk itself according to its type ("int" or "roundabout").

	Inputs:
		1. one crosswalk object
		2. intSize in pixel
		3. type: "int" or "roundabout"
*************************************************************/

const modelCrosswalkGeo = (crosswalk, intSize, type, meterToPixel, accuracy) => {

	const ifCrosswalk = crosswalk.ifCrosswalk;

	if (ifCrosswalk) {
		if (type === "int") {
			//model crosswalk start points:
			modelIntCrosswalkSps(crosswalk, intSize, meterToPixel);

			//model crosswalk end points:
			modelIntCrosswalkEps(crosswalk, intSize, meterToPixel, accuracy);

			//model crosswalk curves:
			modelIntCrosswalkCurves(crosswalk, intSize, meterToPixel);

		}
		else {
			//TBD
		}
	}


};


export default modelCrosswalkGeo;
