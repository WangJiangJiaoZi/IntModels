
import setupCamera from "./Setters/SetupCamera";
import setupScene from "./Setters/SetupScene";
import setupLights from "./Setters/SetupLights";
import setupRenderer from "./Setters/SetupRenderer";
import setupMapControls from "./Setters/SetupMapControls";
import setupOrbitControls from "./Setters/SetupOrbitControls";
import setupSceneMouse from "./Setters/SetupSceneMouse";

class ThreeDSetters {
	constructor(envSetters) {
		this.envSetters = envSetters;
		this.simulationIntModel = envSetters.simulationIntModel;
		this.THREE = envSetters.THREE;
		this.ifMapControls = false;

		this.threeDCameraInitSettings = {
			fov: 60,
			aspect: 4 / 3,  //initial setting
			near: 1,
			far: 2000000,
			position: {
				x: 200,
				y: 450,
				z: 200,
			}
		};

		this.threeDGroundInitialSettings = {
			groundColor: "#C8C8C8"
		};
	}


	setupThreeDEnv({domHeight, domWidth, containerId}) {
		this.simulationIntModel.containerId = containerId;

		//camera:
		const cameraSettings = this.threeDCameraInitSettings;
		cameraSettings.aspect = domWidth / domHeight;
		const canvasSize = domHeight;
		this.simulationIntModel.camera = null;
		this.simulationIntModel.camera = setupCamera({
			THREE: this.THREE, cameraSettings: cameraSettings, canvasSize: canvasSize
		});

		//scene:
		this.simulationIntModel.scene = null;
		this.simulationIntModel.scene = setupScene(this.THREE);

		//lights:
		this.simulationIntModel.lights = null;
		this.simulationIntModel.lights = setupLights({
			THREE: this.THREE,
			scene: this.simulationIntModel.scene
		});

		//renderer
		const container = document.getElementById(containerId);
		container.innerHTML = "";
		this.simulationIntModel.container = container;
		this.simulationIntModel.renderer = null;
		this.simulationIntModel.renderer = setupRenderer({
			THREE: this.THREE,
			backgroundColor: this.envSetters.backgroundColor,
			width: domWidth,
			height: domHeight,
			container: container,
		});


		//controls
		/*		*/
		this.simulationIntModel.controls = null;
		this.ifMapControls = true;
		this.simulationIntModel.controls = setupMapControls({
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
		//sky
		setupEnv.setupSky({
			intModel: intModel,
		});

		//ground
		setupGround({
			intModel: intModel,
			groundInitialSettings: initialSettings.groundInitialSettings
		});
		*/
	}

	toggleControlType() {
		if (this.simulationIntModel.controls) {
			this.simulationIntModel.controls.dispose();
			this.simulationIntModel.controls = null;
		}
		if (this.ifMapControls) {
			this.simulationIntModel.controls = setupOrbitControls({
				THREE: this.THREE,
				camera: this.simulationIntModel.camera,
				renderer: this.simulationIntModel.renderer
			});
			this.ifMapControls = false;
		}
		else {
			this.simulationIntModel.controls = setupMapControls({
				THREE: this.THREE,
				camera: this.simulationIntModel.camera,
				renderer: this.simulationIntModel.renderer
			});
			this.ifMapControls = true;
		}
	}


	resetThreeDEnv({domHeight, domWidth}) {
		//camera:
		const cameraSettings = this.threeDCameraInitSettings;
		cameraSettings.aspect = domWidth / domHeight;
		this.simulationIntModel.camera = null;
		this.simulationIntModel.camera = setupCamera({
			THREE: this.THREE, cameraSettings: cameraSettings, canvasSize: domHeight
		});

		//controls:
		this.simulationIntModel.controls.dispose();
		this.simulationIntModel.controls = null;
		this.simulationIntModel.controls = setupMapControls({
			THREE: this.THREE,
			camera: this.simulationIntModel.camera,
			renderer: this.simulationIntModel.renderer
		});
	}
}


export default ThreeDSetters;
