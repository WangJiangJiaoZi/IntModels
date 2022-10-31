
import sharedErrors from "../../SharedErrors/SharedErrors";
import SimulationInt from "../../SimulationInt/SimulationInt";


class ModelSimu {
	constructor(simulationIntModel, errorHints) {
		this.simulationIntModel = simulationIntModel;
		this.errorHints = errorHints;
		this.sharedErrors = sharedErrors;
	}

	/******************************************************************
		Would use intModel to model int geometry and do more about
		simulation initialization (simulationInt).
		Would update:
			simulationIntModel.canvasSize
			simulationIntModel.meterToPixel
			simulationIntModel.simulationInt
	*******************************************************************/
	modelIntGeo(canvasSize) {

		// ********************** verify canvasSize **********************
		if (!canvasSize || canvasSize <= 0) {
			const modelOwner = "SimulationIntModelController";
			const message = this.errorHints.modelIntGeo;
			const oneValueError = new this.sharedErrors.SingleValueError(modelOwner, message);
			throw oneValueError;
		}

		// ********************** use intModel to model geo *******************
		this.simulationIntModel.canvasSize = canvasSize;
		const intModel = this.simulationIntModel.intModel;
		intModel.intModelControllers.intModelGeoController.modelGeo.modelIntGeo(canvasSize);
		this.simulationIntModel.meterToPixel = intModel.meterToPixel;


		// ********************** initialize simulationInt *******************
		this.simulationIntModel.simulationInt = new SimulationInt(
			intModel.intersection,
			this.simulationIntModel.THREE,
			this.errorHints
		);
		this.simulationIntModel.simulationInt.initialize();
	}


	modelVehicles() {
		
	}

}


export default ModelSimu;
