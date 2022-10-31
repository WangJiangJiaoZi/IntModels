
import SimulationApp from "./SimulationApp";


class SimulationInt {
	constructor(intersection, THREE, errorHints) {
		this.intersection = intersection;
		this.THREE = THREE;
		this.errorHints = errorHints;

		this.simulationApps = {}; //would be a dict like {appId1: simuApp1, appId2: simuApp2, ...}
		this.intConnectors = {}; //would be a dict like {fr1: {to1: connector1, to2: ..}, fr2: {...}}
	}


	/*************************************************************
		Would ask simulationApps to initialize themselves.
		Would NOT initialize this.intConnectors, which would be
		done during coordinates translation to save useless connectors.
	**************************************************************/
	initialize() {
		this.intersection.approaches.forEach((oneApp) => {
			const oneAppId = oneApp.appRealId;
			const oneSimuApp = new SimulationApp(oneApp);
			oneSimuApp.initialize();
			this.simulationApps[oneAppId] = oneSimuApp;
		});
	}


	/*************************************************************
		Would translate coordinate based on its type.
		Would update this.intConnectors if the connector has not
		been initialized before.
	**************************************************************/
	translateCoordinate(coordinateInfo) {
		//ask simuApp to translate its coordinate


		//check if the intConnector exists. If not, instantiate one.
		//ask intConnector to translate its coordinate
	}
}


export default SimulationInt;
