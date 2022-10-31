

class AppFeatureController {
	constructor(approach, sharedErrors) {
		this.approach = approach;
		this.sharedErrors = sharedErrors;
	}

	setupMovement(oneAppMovSetting) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGControllers.laneGGFeatureController.setupMovement(oneAppMovSetting);
	}


	injectAppFeature(oneFeatureAppValues, featureLevel, featureType, featureUnit) {
		if (featureLevel === "road") {
			//TBD..., handle road level features
		}
		else {
			const laneGG = this.approach.laneGG;
			const oneFeatureLaneGGValues = oneFeatureAppValues;
			laneGG.laneGGControllers.laneGGFeatureController.injectLaneGGFeature(
				oneFeatureLaneGGValues,
				featureLevel,
				featureType,
				featureUnit
			);
		}


	}

}


export default AppFeatureController;
