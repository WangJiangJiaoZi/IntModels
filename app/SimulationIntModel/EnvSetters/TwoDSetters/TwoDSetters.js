
import setupCamera from "./Setters/SetupCamera";
import setupScene from "./Setters/SetupScene";
import setupLights from "./Setters/SetupLights";
import setupRenderer from "./Setters/SetupRenderer";
import setupControls from "./Setters/SetupControls";
import setupSceneMouse from "./Setters/SetupSceneMouse";


class TwoDSetters {
	constructor(envSetters) {
		this.envSetters = envSetters;
		this.simulationIntModel = envSetters.simulationIntModel;
		this.THREE = envSetters.THREE;

		this.twoDCameraInitSettings = {
			near: 1,
			far: 2000,
			position: {
				x: 0,
				y: 0,
				z: 500,
			}
		};

		//ground initial settings:
		this.twoDGroundInitialSettings = {
			groundColor: "#C8C8C8"
		};
	}

	setupTwoDEnv({domHeight, domWidth, containerId}) {
		//set dimension (2d or 3d):
		this.simulationIntModel.containerId = containerId;

		//camera:
		const cameraSettings = this.twoDCameraInitSettings;
		cameraSettings.aspect = domWidth / domHeight;
		this.simulationIntModel.camera = setupCamera({
			THREE: this.THREE,
			domWidth: domWidth,
			domHeight: domHeight,
			cameraSettings: cameraSettings
		});


		//scene:
		this.simulationIntModel.scene = setupScene(this.THREE);

		//lights:
		this.simulationIntModel.lights = setupLights({
			THREE: this.THREE,
			scene: this.simulationIntModel.scene,
		});

		//renderer
		const container = document.getElementById(containerId);
		container.innerHTML = "";
		this.simulationIntModel.container = container;
		this.simulationIntModel.renderer = setupRenderer({
			THREE: this.THREE,
			backgroundColor: this.envSetters.backgroundColor,
			width: domWidth,
			height: domHeight,
			container: container,
		});


		//controls
		/*		*/
		this.simulationIntModel.controls = setupControls({
			THREE: this.THREE,
			camera: this.simulationIntModel.camera,
			renderer: this.simulationIntModel.renderer
		});


		/*		*/
		//sceneMouse
		this.simulationIntModel.sceneMouse = setupSceneMouse({
			envSetters: this.envSetters,
			container: container,
			THREE: this.THREE,
			domHeight: domHeight,
			domWidth: domWidth
		});

		/*
		//ground
		setupGround({
			intModel: intModel,
			groundInitialSettings: initialSettings.groundInitialSettings
		});
		*/
	}

	resetTwoDEnv({domHeight, domWidth}) {
		//camera:
		const cameraSettings = this.twoDCameraInitSettings;
		cameraSettings.aspect = domWidth / domHeight;
		this.simulationIntModel.camera = setupCamera({
			THREE: this.THREE,
			domWidth: domWidth,
			domHeight: domHeight,
			cameraSettings: cameraSettings
		});

		//controls:
		this.simulationIntModel.controls.dispose();
		this.simulationIntModel.controls = setupControls({
			THREE: this.THREE,
			camera: this.simulationIntModel.camera,
			renderer: this.simulationIntModel.renderer
		});
	}
}


export default TwoDSetters;
