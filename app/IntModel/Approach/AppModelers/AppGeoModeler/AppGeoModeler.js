

import modelGeoForInt from "./ModelGeoForInt";
import modelGeoForCorner from "./ModelGeoForCorner";
import modelAppGeo from "./ModelAppGeo";

class AppGeoModeler {
	constructor(approach) {
		this.approach = approach;
		this.modelGeoForInt = modelGeoForInt;
		this.modelGeoForCorner = modelGeoForCorner;
		this.modelAppGeo = modelAppGeo;
	}
}



export default AppGeoModeler;
