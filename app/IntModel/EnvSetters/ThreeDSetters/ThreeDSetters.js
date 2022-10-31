import setupCamera from "./Setters/SetupCamera";
import setupScene from "./Setters/SetupScene";
import setupLights from "./Setters/SetupLights";
import setupRenderer from "./Setters/SetupRenderer";
import setupControls from "./Setters/SetupControls";
//import setupSceneMouse from "./Setters/SetupSceneMouse";
//import setupSky from "./Setters/SetupSky";
//import setupGround from "./Setters/SetupGround";


class ThreeDSetters {
	constructor(envSetters) {
		this.envSetters = envSetters;
		this.intModel = envSetters.intModel;
		this.THREE = envSetters.THREE;

		this.threeDCameraInitSettings = {
			fov: 60,
			aspect: 4 / 3,  //initial setting
			near: 1,
			far: 2000000,
			position: {
				x: 0,
				y: 450,
				z: 200,
			}
		};

		//ground initial settings:
		this.threeDGroundInitialSettings = {
			groundColor: "#C8C8C8"
		};
	}


	setupThreeDEnv({domHeight, domWidth, containerId}) {
		const intModel = this.intModel;
		intModel.containerId = containerId;

		//camera:
		const cameraSettings = this.threeDCameraInitSettings;
		cameraSettings.aspect = domWidth / domHeight;
		const canvasSize = domHeight;
		intModel.camera = null;
		intModel.camera = setupCamera({
			THREE: intModel.THREE, cameraSettings: cameraSettings, canvasSize: canvasSize
		});

		//scene:
		intModel.scene = null;
		intModel.scene = setupScene(intModel.THREE);

		//lights:
		intModel.lights = null;
		intModel.lights = setupLights({
			THREE: intModel.THREE,
			scene: intModel.scene,
		});

		//renderer
		const container = document.getElementById(containerId);
		container.innerHTML = "";
		intModel.renderer = null;
		intModel.renderer = setupRenderer({
			THREE: intModel.THREE,
			intersection: intModel.intersection,
			width: domWidth,
			height: domHeight,
			container: container,
			backgroundColor: this.envSetters.backgroundColor
		});


		//controls
		/*		*/
		intModel.controls = null;
		intModel.controls = setupControls({
			THREE: intModel.THREE,
			camera: intModel.camera,
			renderer: intModel.renderer
		});


		//sceneMouse
		/*
		intModel.sceneMous = null;
		intModel.sceneMouse = setupSceneMouse({
			intModel: intModel,
			container: container,
			domWidth: domWidth,
			canvasSize: domHeight
		});
		*/
		/*
		//sky
		setupEnv.setupSky({
			intModel: intModel,
		});

		//ground
		setupGround({
			intModel: intModel,
			groundInitialSettings: initialSettings.groundInitialSettings,
			THREE: this.THREE
		});
		*/
	}

	resetThreeDEnv({domHeight, domWidth}) {
		const intModel = this.intModel;
		//camera:
		const cameraSettings = this.threeDCameraInitSettings;
		cameraSettings.aspect = domWidth / domHeight;
		intModel.camera = setupCamera({
			THREE: intModel.THREE,
			cameraSettings: cameraSettings,
			canvasSize: domHeight
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





export default ThreeDSetters;

