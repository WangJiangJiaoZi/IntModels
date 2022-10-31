
import sharedErrors from "../../../SharedErrors/SharedErrors";


class ModelGeo {
	constructor(intModel) {
		this.intModel = intModel;
	}

	/********************************************************************
		Would:
			1.Model int geo.

		Would update:
			intModel.canvasSize;
			intModel.meterToPixel;
	********************************************************************/
	modelIntGeo(canvasSize) {
		const intersection = this.intModel.intersection;

		if (!canvasSize || canvasSize <= 0) {
			const modelOwner = "IntModelGeoController";
			const message = "Invalid canvasSize. It should be a positive number.";
			const oneValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw oneValueError;
		}
		else {
			this.intModel.canvasSize = canvasSize;
			const envSetters = this.intModel.envSetters;
			//for single intersection. intBoxSize is canvasSize
			const intBoxSize = canvasSize;
			const intDiameter = this.intModel.intersection.intDiameter;
			const intSize = intBoxSize * (1 - 2 * envSetters.boundaryScale);
			const accuracy = intSize * envSetters.accuracy;   //in pixel
			const meterToPixel = intSize / intDiameter;
			this.intModel.meterToPixel = meterToPixel;
			//if one pixel cannot represent more than 0.4 meter, it would be a problem
			if (meterToPixel > 1 / 0.4) {
				const modelOwner = "IntModelGeoController";
				const message = "Invalid canvasSize. Please try a bigger one.";
				const oneValueError = new sharedErrors.SingleValueError(modelOwner, message);
				//throw oneValueError;
			}

			intersection.modelers.geoModeler.modelIntGeo(intersection, intSize, meterToPixel, accuracy);
		}
	}

	/********************************************************************
		Would:
			1.Model int geo in road network.

		Would update:
			Nothing
	********************************************************************/
	modelIntGeoForNetwork(accuracy, meterToPixel) {
		const intersection = this.intModel.intersection;
		const intSize = intersection.intDiameter * meterToPixel; //in pixel

		intersection.modelers.geoModeler.modelIntGeo(intersection, intSize, meterToPixel, accuracy);
	}
}

export default ModelGeo;
