import IntModelGeoController from "./IntModelGeoController/IntModelGeoController";
import IntModelFeatureController from "./IntModelFeatureController/IntModelFeatureController";

class IntModelControllers {
	constructor(intModel, controllerErrorHints) {
		this.intModel = intModel;

		this.intModelGeoController = new IntModelGeoController(intModel, controllerErrorHints.geo);
		this.intModelFeatureController = new IntModelFeatureController(intModel, controllerErrorHints.feature);
	}

}


export default IntModelControllers;
