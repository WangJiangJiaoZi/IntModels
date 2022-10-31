

import ImpExportSimu from "./ImpExportSimu/ImpExportSimu";
import ModelSimu from "./ModelSimu/ModelSimu";
import DrawSimu from "./DrawSimu/DrawSimu";



class SimulationIntModelControllers {
	constructor(simulationIntModel, errorHints) {
		this.simulationIntModel = simulationIntModel;
		this.errorHints = errorHints;

		this.impExportSimu = new ImpExportSimu(simulationIntModel, errorHints);
		this.modelSimu = new ModelSimu(simulationIntModel, errorHints);
		this.drawSimu = new DrawSimu(simulationIntModel, errorHints);
	}

}

export default SimulationIntModelControllers;
