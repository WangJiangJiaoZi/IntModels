
import modelAppOuterStartPoints from "./Modelers/ModelAppOuterStartPoints";


const modelGeoForCorner = (approach, intSize, type, meterToPixel, accuracy) => {
	//model approach outer sides start points
	modelAppOuterStartPoints(approach, intSize, "int", meterToPixel, accuracy);
};


export default modelGeoForCorner;
