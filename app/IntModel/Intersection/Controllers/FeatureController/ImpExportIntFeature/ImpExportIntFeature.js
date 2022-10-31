

class ImpExportIntFeature {
	constructor(intFeatureController, intersection) {
		this.intersection = intersection;
		this.intFeatureController = intFeatureController;
	}

	setupMovement(movSetting) {
		const approaches = this.intersection.approaches;
		const appCounts = approaches.length;
		let ifError = false;

		if (!Array.isArray(movSetting)) {
			ifError = true;
		}
		else if (movSetting.length !== appCounts) {
			ifError = true;
		}
		else {
			movSetting.forEach((oneAppMovSetting) => {
				if (!Array.isArray(oneAppMovSetting)) {
					ifError = true;
				}
				else if (oneAppMovSetting.length !== appCounts) {
					ifError = true;
				}
			});
		}

		if (ifError) {
			const info = this.intersection.modelErrorHints.setupMovementInfo;
			const reason = this.intersection.modelErrorHints.setupMovementReason;
			this.intersection.handleInjectError(info, reason);
		}
		else {
			movSetting.forEach((oneAppMovSetting, appIndex) => {
				const oneApp = approaches[appIndex];
				oneApp.appControllers.appFeatureController.setupMovement(oneAppMovSetting);
			});
		}
	}

	injectIntFeature(intFeatureData) {
		const acceptableTypes = ["LOS", "delay", "controlType"];
		intFeatureData.forEach((oneIntFeature) => {
			if (acceptableTypes.indexOf(oneIntFeature.type) > -1) {
				const verifyIntFeature = this.intFeatureController.verifyIntFeature;
				const type = oneIntFeature.type;

				if (type === "controlType") {
					verifyIntFeature.verifyIntControlType(oneIntFeature.values);
				}
				else if (type === "LOS") {
					verifyIntFeature.verifyIntLOS(oneIntFeature.values);
				}

				this.intersection[type] = oneIntFeature.values;
			}
			else {
				const info = this.intersection.modelErrorHints.injectIntFeatureInfo;
				const reason = this.intersection.modelErrorHints.injectIntFeatureReason;
				this.intersection.handleInjectError(info, reason);
			}
		});
	}

	importIntFeature(featureData) {
		//find the features that is at intersection level:
		const intFeatureData = [];
		const otherFeatureData = [];

		featureData.forEach((oneFeature) => {
			const oneFeatureLevel = oneFeature.level;
			if (oneFeatureLevel === "intersection") {
				intFeatureData.push(oneFeature);
			}
			else {
				otherFeatureData.push(oneFeature);
			}
		});

		//inject int level features:
		this.injectIntFeature(intFeatureData);


		//traverse otherFeatureData and ask approaches to handle:
		const approaches = this.intersection.approaches;
		otherFeatureData.forEach((oneFeatureData) => {
			const oneFeatureLevel = oneFeatureData.level;
			const oneFeatureType = oneFeatureData.type;
			const oneFeatureUnit = (oneFeatureData.unit) ? oneFeatureData.unit : "";
			const oneFeatureValues = oneFeatureData.values;

			let ifError = false;
			const appCounts = approaches.length;
			if (!Array.isArray(oneFeatureValues)) {
				ifError = true;
			}
			else {
				ifError = (oneFeatureValues.length === appCounts) ? false : true;
			}

			if (ifError) {
				const info = this.intersection.modelErrorHints.injectFeatureInfo1;
				const reason = this.intersection.modelErrorHints.injectFeatureReason1;
				this.intersection.handleInjectError(info, reason);
			}
			else {
				oneFeatureValues.forEach((oneFeatureAppData, frAppIndex) => {
					const approach = approaches[frAppIndex];
					approach.appControllers.appFeatureController.injectAppFeature(
						oneFeatureAppData,
						oneFeatureLevel,
						oneFeatureType,
						oneFeatureUnit
					);
				});
			}
		});
	}


	exportIntFeatureToJSON() {

	}
}


export default ImpExportIntFeature;
