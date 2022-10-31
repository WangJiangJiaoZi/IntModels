

class ModelFeature {
	constructor(intModel, modelFeatureErHints, sharedErrors) {
		this.intModel = intModel;
		this.modelFeatureErHints = modelFeatureErHints;
		this.sharedErrors = sharedErrors;
	}

	modelIntFeature() {
		//geometry must be modeled before features:
		if (!this.intModel.canvasSize) {
			const modelOwner = "ModelFeature";
			const message = this.modelFeatureErHints.modelIntFeature;
			const modelFeatureEr = new this.sharedErrors.SingleConflictError(modelOwner, message);
			throw modelFeatureEr;
		}
		else {
			const envSetters = this.intModel.envSetters;
			//for single intersection. intBoxSize is canvasSize
			const intBoxSize = this.intModel.canvasSize;
			const intSize = intBoxSize * (1 - 2 * envSetters.boundaryScale);
			const accuracy = intSize * envSetters.accuracy;   //in pixel
			const meterToPixel = this.intModel.meterToPixel;

			const intersection = this.intModel.intersection;
			intersection.modelers.featureModeler.modelIntFeature(intSize, meterToPixel, accuracy);
		}
	}
}


export default ModelFeature;
