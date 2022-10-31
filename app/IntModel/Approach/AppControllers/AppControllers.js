import AppGeoController from "./AppGeoController/AppGeoController";
import AppFeatureController from "./AppFeatureController/AppFeatureController";

import sharedErrors from "../../SharedErrors/SharedErrors";

class AppControllers {
	constructor(approach) {
		this.approach = approach;
		this.appGeoController = new AppGeoController(approach);
		this.appFeatureController = new AppFeatureController(approach, sharedErrors);
	}
}



export default AppControllers;
