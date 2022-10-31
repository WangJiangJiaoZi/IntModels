


import Intersection from "./Intersection/Intersection";
import EnvSetters from "./EnvSetters/EnvSetters";
import IntModelControllers from "./IntModelControllers/IntModelControllers";

import enErrorHints from "./EnglishErrorHints";
import chErrorHints from "./ChineseErrorHints";

class IntModel {
	constructor(THREE, language = 1) {

		this.THREE = THREE;

		this.camera = null;
		this.scene = null;
		this.sceneHasRotated = false;
		this.renderer = null;
		this.container = null;
		this.lights = null;
		this.controls = null;
		this.sceneMouse = null;
		this.anmimationFrameId = null;

		this.canvasSize = null;  //size for drawing
		this.meterToPixel = null;
		this.dimension = null;  //2d or 3d dimension
		this.containerId = null;  //id of the html container


		this.geoVersionId = null;
		this.geoData = null;
		this.tmVersionId = null;
		this.tmData = null;
		this.photoInfoVersionId = null;
		this.photoInfo = null;


		this.language = language;  //1 for english, 2 for chinese, ...
		this.errorHints = (language === 2) ? chErrorHints : enErrorHints;


		this.intersection = new Intersection(this, this.THREE, this.errorHints.modeler);

		this.envSetters = new EnvSetters(this, this.THREE);
		this.clickableObjects = new Set();

		this.intModelControllers = new IntModelControllers(this, this.errorHints.controller);
	}
}


//const intModel = new IntModel();

export default IntModel;
