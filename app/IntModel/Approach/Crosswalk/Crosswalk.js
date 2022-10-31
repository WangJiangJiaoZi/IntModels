
import crosswalkControllers from "./CrosswalkControllers";
import crosswalkModelers from "./CrosswalkModelers";
import crosswalkDrawers from "./CrosswalkDrawers";

class Crosswalk {
	constructor(approach, THREE) {
		this.approach =  approach;
		this.THREE = THREE;

		this.ifCrosswalk = true;
		this.crosswalkId = null;  //unique id from DB
		this.crosswalkAngle = 0;  //0 for auto
		this.crosswalkOffset = 1; //meters, dist to center polygon
		this.crossswalkWidth = 4; //meters
		this.crosswalkBuffer = 0.75; //meters, dist to stopbar
		this.crosswalkHeight = 0.5; //meters
		this.crosswalkGap = 0.4; //meters


		this.crosswalkControllers = crosswalkControllers;
		this.crosswalkDrawers = crosswalkDrawers;
		this.crosswalkModelers = crosswalkModelers;

		this.layerId = 1;


		this.crosswalkShape = null;
		/*
			{
				rectCurves = [ an instance of THREE.Shape ]
			}
		*/
		this.crosswalkGeo = null;
		/*
			{
				startPoints: [[x1, y1], [x2, y2]],
					([x1, y1] would be the inner start point while [x2, y2] is the outer one.)
				endPoints: [[x1, y1], [x2, y2]],
					([x1, y1] would be the inner end point while [x2, y2] is the outer one.)
				ifIslandStart: true / false,
					(If the crosswalk starts from current approach island or not.)
				ifIslandEnd: true / false,
					(If the crosswalk ends at an island or not.)
			}
		*/

	}
}


export default Crosswalk;
