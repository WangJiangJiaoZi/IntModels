

class ImpExportFeature {
	constructor(intModel, impExportFeatureErHints, sharedErrors) {
		this.intModel = intModel;
		this.impExportFeatureErHints = impExportFeatureErHints;
		this.sharedErrors = sharedErrors;
	}

	/*************************************************************************
		Setup movements from a JSON file.
		Input: a two-dimension array JSON of boolean values:
			[
				[true, true, false, true],   //app0 movements
				[true, true, false, true],   //app1 movements
				[true, true, false, false],   //app2 movements
				[true, true, false, true]    //app3 movements
			]
	**************************************************************************/
	setupMovementFrJSON(movJSON) {
		const movSetting = JSON.parse(movJSON);

		//geometry must be imported before movements setup
		if (this.intModel.intersection.approaches.length === 0) {
			const message = this.impExportFeatureErHints.setupMovementFrJSON;
			const modelOwner = "ImpExpFeature";
			const featureJSONError = new this.sharedErrors.SingleValueError(modelOwner, message);

			throw featureJSONError;
		}
		else {
			const intersection = this.intModel.intersection;
			intersection.controllers.intFeatureController.impExportIntFeature.setupMovement(movSetting);
		}
	}


	/*************************************************************************
		Import feature data from a JSON file.
		Input: an array of objects:
			[
				{
					level: "movement"/"int"/...,
					type: "volume",
					unit: "s",  //(optional unit to display)
					values: [
						[...], [...], ...
					]
				}
			]
	**************************************************************************/
	importFeatureFrJSON(nextFeatureJSON) {
		const featureData = JSON.parse(nextFeatureJSON);
		//verify if featureData is valid:
		if (Array.isArray(featureData)) {
			const requiredProperties = ["level", "type", "values"];
			featureData.forEach((oneFeatureData) => {
				requiredProperties.forEach((oneProperty) => {
					if (!oneFeatureData.hasOwnProperty(oneProperty)) {
						const message = this.impExportFeatureErHints.importFeatureFrJSON;
						const modelOwner = "ImpExpFeature";
						const featureJSONError = new this.sharedErrors.SingleValueError(modelOwner, message);

						throw featureJSONError;
					}
				});
			});
		}
		else {
			const message = this.impExportFeatureErHints.importFeatureFrJSON;
			const modelOwner = "ImpExpFeature";
			const featureJSONError = new this.sharedErrors.SingleValueError(modelOwner, message);

			throw featureJSONError;
		}


		const intersection = this.intModel.intersection;
		intersection.controllers.intFeatureController.impExportIntFeature.importIntFeature(featureData);
	}
}


export default ImpExportFeature;
