

import EnvSetters from "./EnvSetters/EnvSetters";
import SimulationIntModelControllers from "./SimulationIntModelControllers/SimulationIntModelControllers";

import SharedGeometryLib from "./SharedGeometryLib/SharedGeometryLib";


class SimulationIntModel {
	constructor(intModel, THREE, errorHints) {
		this.intModel = intModel;
		this.THREE = THREE;
		this.errorHints = errorHints;

		this.camera = null;
		this.scene = null;
		this.sceneHasRotated = false;
		this.renderer = null;
		this.rendererEvents = {};  //would be like {eventName1: [callback1, callback2], eventName2: [...]}
		this.lights = null;
		this.controls = null;
		this.sceneMouse = null;  //would be a THREE.Vector2
		this.anmimationFrameId = null;

		this.canvasSize = null;  //size for drawing
		this.meterToPixel = null;
		//this.accuracy = null;
		this.dimension = null;  //2d or 3d dimension
		this.container = null;
		this.containerId = null;  //id of the html container

		this.clickableObjects = new Set();
		this.envSetters = new EnvSetters(this, THREE);

		this.simulationInt = null;  //would be an instance of SimulationInt once initialized

		this.simulationIntModelControllers = new SimulationIntModelControllers(this, errorHints);

		this.sharedGeometryLib = new SharedGeometryLib(THREE);
	}
}

export default SimulationIntModel;
