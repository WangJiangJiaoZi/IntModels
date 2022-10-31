

class UpdateIntLevelFeature {
	constructor(intModel, erHints, sharedErrors) {
		this.intModel = intModel;
		this.erHints = erHints;
		this.sharedErrors = sharedErrors;
	}

	updateIntControlType(nextIntControlType) {
		const intFeatureController = this.intModel.intersection.controllers.intFeatureController;
		intFeatureController.updateIntFeature.updateIntControlType(
			nextIntControlType
		);
	}
}


export default UpdateIntLevelFeature;
