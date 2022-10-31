
import modelAppOuterSides from "./Modelers/ModelAppOuterSides";
import modelAppCenterEndPoint from "./Modelers/ModelAppCenterEndPoint";
import modelAppEndPoints from "./Modelers/ModelAppEndPoints";

const modelGeoForInt = (approach, intSize, meterToPixel, accuracy) => {

	modelAppOuterSides(approach, intSize, meterToPixel, accuracy);

	modelAppEndPoints(approach, intSize, accuracy);

	modelAppCenterEndPoint(approach, intSize, accuracy);

};


export default modelGeoForInt;
