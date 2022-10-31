

class DrawFeature {
	constructor(intModel, drawFeatureErHints, sharedErrors) {
		this.intModel = intModel;
		this.drawFeatureErHints = drawFeatureErHints;
		this.sharedErrors = sharedErrors;
		this.modelOwner = "DrawFeature";
	}

	_checkIfGeoDrawn() {
		if (!this.intModel.scene) {
			const message = this.drawFeatureErHints.checkIfGeoDrawn;
			const error = new this.sharedErrors.SingleConflictError(this.modelOwner, message);
			throw error;
		}
	}

	//for single intersection only:
	drawMovementFeature(type) {
		//check if geometry has been drawn:
		this._checkIfGeoDrawn();
		//check if the type provided is acceptable:
		const typesAllowed = ["volume", "delay", "stop", "queue", "overflow"];
		if (typesAllowed.indexOf(type) === -1) {
			const message = this.drawFeatureErHints.drawMovementFeature;
			const error = new this.sharedErrors.SingleValueError(this.modelOwner, message);
			throw error;
		}
		else {
			//undraw roads' names:
			const intModelGeoController = this.intModel.intModelControllers.intModelGeoController;
			intModelGeoController.drawGeo.undrawIntRoadNames();

			//draw movements' feature:
			this.intModel.camera.layers.enable(3);
			const modelScene = this.intModel.scene;
			const clickableObjects = this.intModel.clickableObjects;
			const meterToPix = this.intModel.meterToPixel;
			const envSetters = this.intModel.envSetters;
			const movArrowScale = envSetters.movArrowScale * this.intModel.canvasSize;
			this.intModel.intersection.drawers.drawMovementArrow(modelScene, clickableObjects, meterToPix, movArrowScale);
			this.intModel.intersection.drawers.drawMovementFeature(modelScene, clickableObjects, type, meterToPix);
		}
	}

	//for single intersection only:
	undrawMovementFeature() {
		//draw roads' names:
		const intModelGeoController = this.intModel.intModelControllers.intModelGeoController;
		intModelGeoController.drawGeo.drawIntRoadNames();

		//undraw movements' feature:
		const clickableObjects = this.intModel.clickableObjects;
		this.intModel.intersection.drawers.undrawMovementArrow(clickableObjects);
		this.intModel.intersection.drawers.undrawMovementFeature(clickableObjects);
	}

	drawIntersectionFeature(type) {
		const typesAllowed = ["controlType", "LOS", "id"];
		if (typesAllowed.indexOf(type) === -1) {
			const message = this.drawFeatureErHints.drawIntersectionFeature;
			const error = new this.sharedErrors.SingleValueError(this.modelOwner, message);
			throw error;
		}

		//check if geometry has been drawn:
		this._checkIfGeoDrawn();

		//draw intersection's feature (such as intId, LOS, etc.):
		this.intModel.camera.layers.enable(3);
		const modelScene = this.intModel.scene;
		const clickableObjects = this.intModel.clickableObjects;
		const meterToPix = this.intModel.meterToPixel;

		this.intModel.intersection.drawers.drawIntFeature(type, modelScene, clickableObjects, meterToPix);
	}

	undrawIntersectionFeature() {
		const clickableObjects = this.intModel.clickableObjects;
		this.intModel.intersection.drawers.undrawIntFeature(clickableObjects);
	}
}


export default DrawFeature;
