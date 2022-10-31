import setupCamera from "./Setters/SetupCamera";
import setupScene from "./Setters/SetupScene";
import setupLights from "./Setters/SetupLights";
import setupRenderer from "./Setters/SetupRenderer";
import setupControls from "./Setters/SetupControls";
//import setupSceneMouse from "./Setters/SetupSceneMouse";
//import setupGround from "./Setters/SetupGround";


class TwoDSetters {
	constructor(envSetters) {
		this.envSetters = envSetters;
		this.intModel = envSetters.intModel;
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
		const intModel = this.intModel;
		//set dimension (2d or 3d):
		intModel.containerId = containerId;

		//camera:
		const cameraSettings = this.twoDCameraInitSettings;
		cameraSettings.aspect = domWidth / domHeight;
		intModel.camera = setupCamera({
			THREE: intModel.THREE,
			domWidth: domWidth,
			domHeight: domHeight,
			cameraSettings: cameraSettings
		});


		//scene:
		intModel.scene = setupScene(intModel.THREE);

		//lights:
		intModel.lights = setupLights({
			THREE: intModel.THREE,
			scene: intModel.scene,
		});

		//renderer
		const container = document.getElementById(containerId);
		container.innerHTML = "";
		intModel.renderer = setupRenderer({
			THREE: intModel.THREE,
			width: domWidth,
			height: domHeight,
			container: container,
			backgroundColor: this.envSetters.backgroundColor
		});


		//controls
		/*		*/
		intModel.controls = setupControls({
			THREE: intModel.THREE,
			camera: intModel.camera,
			renderer: intModel.renderer
		});


		/*
		//sceneMouse
		intModel.sceneMouse = setupSceneMouse({
			intModel: intModel,
			container: container,
			domWidth: domWidth,
			canvasSize: domHeight
		});
		*/
		/*
		//ground
		setupGround({
			intModel: intModel,
			groundInitialSettings: initialSettings.groundInitialSettings
		});
		*/
	}

	resetTwoDEnv({domHeight, domWidth}) {
		const intModel = this.intModel;
		//camera:
		const cameraSettings = this.twoDCameraInitSettings;
		cameraSettings.aspect = domWidth / domHeight;
		intModel.camera = setupCamera({
			THREE: intModel.THREE,
			domWidth: domWidth,
			domHeight: domHeight,
			cameraSettings: cameraSettings
		});

		//controls:
		intModel.controls.dispose();
		intModel.controls = setupControls({
			THREE: intModel.THREE,
			camera: intModel.camera,
			renderer: intModel.renderer
		});
	}



}



export default TwoDSetters;

