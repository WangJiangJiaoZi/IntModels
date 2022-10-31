
import SimulationBound from "./SimulationBound";


class SimulationApp {
	constructor(approach) {
		this.approach = approach;
		this.simuIB = null;  //would be null or an instance of simulationBound after initialized
		this.simuOB = null;  //would be null or an instance of simulationBound after initialized
	}

	/*************************************************************
		Would ask simulationApps to initialize themselves.
		Would NOT initialize this.intConnectors, which would be
		done during coordinates translation to save useless connectors.
	**************************************************************/
	initialize() {
		//********* check bounds the approach (leg) owns *********
		let ifIB = false, ifOB = false;
		const laneGroups = this.approach.laneGG.laneGroups;
		laneGroups.forEach((oneLaneGroup) => {
			const bound = oneLaneGroup.bound;
			if (bound === "inbound" || bound === "inboundSide") {
				ifIB = true;
			}
			else {
				ifOB = true;
			}
		});

		//********* initialize simulationBounds *********
		const laneGG = this.approach.laneGG;
		if (ifIB) {
			this.simuIB = new SimulationBound(laneGG, "IB");
			this.simuIB.initialize();
		}
		if (ifOB) {
			this.simuOB = new SimulationBound(laneGG, "OB");
			this.simuOB.initialize();
		}
	}


	translateCoordinate(tobedetermined) {

	}
}


export default SimulationApp;
