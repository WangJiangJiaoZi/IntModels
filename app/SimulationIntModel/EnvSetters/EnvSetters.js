
import ThreeDSetters from "./ThreeDSetters/ThreeDSetters";
import TwoDSetters from "./TwoDSetters/TwoDSetters";
import pointTexturePngUrl from "../../Images/ThreeDTextures/pointTexture.png";


class EnvSetters {
	constructor(simulationIntModel, THREE) {
		this.simulationIntModel = simulationIntModel;
		this.THREE = THREE;

		//initial settings:
		this.boundaryScale = 0.05;  //boundary for text
		this.accuracy = 0.0000002; //accepted accuracy in intSize/pixel

		this.roadHeight = 1;  //in meters (for connector)
		this.roadMarkHeight = 0.05;  //in meters
		this.roadLineMarkWidth = 0.3;  //in meters
		this.roadDashLineLength = 3.5;  //in meters
		this.roadMarkInitColor = "#FFFFFF";

		this.textFont = "Arial";
		this.textPanelHeight = 7;  //in meters
		this.backgroundColor = "#FFFFFF";
		this.vertexColor = 0xFF8C00;   //orange
		this.vertexRgbColor = {r: 255, g: 140, b: 0};   //orange
		this.vertexSize = 25;  //in pixel
		this.lineColor = 0xFF8C00;   //orange

		this.selectedColor = 0xFF8C00;  //orange

		this.vertexShaderText = "\
			attribute float size;\
			attribute vec3 myColor;\
			varying vec3 vColor;\
			void main() {\
				vColor = myColor;\
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\
				gl_PointSize = size;\
				gl_Position = projectionMatrix * mvPosition;\
			}\
		";

		this.fragmentShaderText = "\
			uniform vec3 color;\
			uniform sampler2D texture;\
			varying vec3 vColor;\
			void main() {\
				gl_FragColor = vec4( color * vColor, 1.0 );\
				gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );\
				if ( gl_FragColor.a < ALPHATEST ) discard;\
			}\
		";

		this.pointTexturePngUrl = pointTexturePngUrl;


		this.threeDSetters = new ThreeDSetters(this);
		this.twoDSetters = new TwoDSetters(this);
	}

	addRendererEventListener(eventName, callback) {
		this.simulationIntModel.renderer.domElement.addEventListener(eventName, callback, false);
		if (this.simulationIntModel.rendererEvents.hasOwnProperty(eventName)) {
			this.simulationIntModel.rendererEvents[eventName].push(callback);
		}
		else {
			this.simulationIntModel.rendererEvents[eventName] = [callback];
		}
	}

	removeRendererEventListener(eventName, callback) {
		this.simulationIntModel.renderer.domElement.removeEventListener(eventName, callback, false);
		this.simulationIntModel.rendererEvents[eventName].filter((oneCallback) => {
			return oneCallback !== callback;
		});
	}

	clearEnv() {
		this.simulationIntModel.sceneHasRotated = false;
		this.simulationIntModel.container = null;
		this.simulationIntModel.containerId = null;
		this.simulationIntModel.sceneMouse = null;
		this.simulationIntModel.lights = undefined;
		this.simulationIntModel.camera = undefined;
		this.simulationIntModel.scene = undefined;

		//stop animation:
		if (this.simulationIntModel.anmimationFrameId) {
			cancelAnimationFrame(this.simulationIntModel.anmimationFrameId);
			this.simulationIntModel.anmimationFrameId = null;
		}

		//dispose renderer, controls,
		if (this.simulationIntModel.renderer) {
			this.simulationIntModel.renderer.clear();

			//remove renderer's all events:
			for (let eventName in this.simulationIntModel.rendererEvents) {
				const callbacks = this.simulationIntModel.rendererEvents[eventName];
				callbacks.forEach((oneCallback) => {
					this.removeRendererEventListener(eventName, oneCallback);
				});
			}
			this.simulationIntModel.rendererEvents = {};

			this.simulationIntModel.renderer.dispose();
		}
		this.simulationIntModel.renderer = undefined;
		if (this.simulationIntModel.controls) {
			this.simulationIntModel.controls.dispose();
		}
		this.simulationIntModel.controls = undefined;
	}
}


export default EnvSetters;
