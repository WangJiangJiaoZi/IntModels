
import ThreeDSetters from "./ThreeDSetters/ThreeDSetters";
import TwoDSetters from "./TwoDSetters/TwoDSetters";
import pointTexturePngUrl from "../../Images/ThreeDTextures/pointTexture.png";
import signalTexturePngUrl from "../../Images/ThreeDTextures/signalTexture.png";
import stopTexturePngUrl from "../../Images/ThreeDTextures/stopTexture.png";
import losAPngUrl from "../../Images/ThreeDTextures/losA.png";
import losBPngUrl from "../../Images/ThreeDTextures/losB.png";
import losCPngUrl from "../../Images/ThreeDTextures/losC.png";
import losDPngUrl from "../../Images/ThreeDTextures/losD.png";
import losEPngUrl from "../../Images/ThreeDTextures/losE.png";
import losFPngUrl from "../../Images/ThreeDTextures/losF.png";


class EnvSetters {
	constructor(intModel, THREE) {
		this.intModel = intModel;
		this.THREE = THREE;

		// ***************** geometry settings ********************
		this.boundaryScale = 0.01;  //boundary for text like "bound one"
		this.intDiameter = 300; //diameter of the intersection to draw, in meters
		this.accuracy = 0.0000002; //accepted accuracy in intSize/pixel

		this.roadHeight = 1;  //in meters
		this.cornerIslandHeight = 0.4;  //in meters
		this.roadMarkHeight = 0.05;  //in meters
		this.sideDivHeight = 0.8;  //in meters

		this.roadLineMarkWidth = 0.3;  //in meters
		this.roadDashLineLength = 3.5;  //in meters
		this.stopBarWidth = 0.5;   //in meters
		this.laneArrowOffset = 3;  //in meters

		this.roadMarkInitColor = "#FFFFFF";

		this.textFont = "Arial";
		this.textPanelHeight = 7;  //2D height in meters
		this.backgroundColor = "#FFFFFF";
		this.vertexColor = 0xFF8C00;   //orange
		this.vertexRgbColor = {r: 255, g: 140, b: 0};   //orange
		this.vertexSize = 25;  //in pixel
		this.lineColor = 0xFF8C00;   //orange, for backbone line
		this.connectorCpDist = 10;   //distance from lane middle line end point in meters (for connector calculation)

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


		// ***************** features settings ********************
		//intersection level settings:
		this.intCenterPanelDiameterScale = 0.35;  //diagnal length scale to int's center polygon bounding box
		this.intCenterPanelColor = "#FFFFFF"; //background color of int center info panel box
		this.signalTexturePngUrl = signalTexturePngUrl;
		this.stopTexturePngUrl = stopTexturePngUrl;
		this.losAPngUrl = losAPngUrl;
		this.losBPngUrl = losBPngUrl;
		this.losCPngUrl = losCPngUrl;
		this.losDPngUrl = losDPngUrl;
		this.losEPngUrl = losEPngUrl;
		this.losFPngUrl = losFPngUrl;

		//movement level settings:
		this.movSideGap = 3;  //gap in meters between movement info and road
		this.movMiddleGap = 5;  //gap in meters between each pair of movements
		this.movOffset = 7;  //offset in meters from corner's innerArc start point to movements info
		this.movMaxOffsetScale = 0.8;  //max scale of approach's right side
		this.movArrowCenterOffest = 3;  //offset in meters from movement start line to arrow box center
		this.movArrowColor = "#373737"; //movement arrow color
		this.movArrowScale = 0.000096;  //movement arrow scale to canvasSize
		this.movTextGap = 2;  //gap in meters between movement arrow and text
		this.movTextPanelHeight = 5;  //in meters
		this.movTextColor = "#171717"; //movement text color




		this.threeDSetters = new ThreeDSetters(this);
		this.twoDSetters = new TwoDSetters(this);
	}

	clearEnv() {
		const intModel = this.intModel;
		intModel.sceneHasRotated = false;
		intModel.container = null;
		intModel.sceneMouse = null;
		intModel.lights = undefined;
		intModel.camera = undefined;
		intModel.scene = undefined;

		//stop animation:
		if (intModel.anmimationFrameId) {
			cancelAnimationFrame(intModel.anmimationFrameId);
			intModel.anmimationFrameId = null;
		}

		//dispose renderer, controls,
		if (intModel.renderer) {
			intModel.renderer.clear();
			intModel.renderer.dispose();
		}
		intModel.renderer = undefined;
		if (intModel.controls) {
			intModel.controls.dispose();
		}
		intModel.controls = undefined;
	}
}


export default EnvSetters;
