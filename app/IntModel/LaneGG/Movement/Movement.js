
import IntModelBaseClass from "../../IntModelBaseClass";

import MovControllers from "./MovControllers/MovControllers";
import MovModelers from "./MovModelers/MovModelers";
import MovDrawers from "./MovDrawers/MovDrawers";

class Movement extends IntModelBaseClass {
	constructor(frLaneGG, toLaneGG, THREE, errorHints) {
		super("Movement", errorHints.movement);
		this.frLaneGG = frLaneGG;
		this.toLaneGG = toLaneGG;
		this.THREE = THREE;

		this.layerId = 3;

		this.movControllers = new MovControllers(this);
		this.movModelers = new MovModelers(this);
		this.movDrawers = new MovDrawers(this);

		this.bitMap = document.createElement("canvas");   //for text texture
		this.arrowMesh = null;  //would be a THREE.Mesh
		this.panelMesh = null;  //would be a THREE.Mesh

		this.volume = null;
		this.volumeUnit = "";
		this.delay = null;
		this.delayUnit = "";
		this.stop = null;
		this.stopUnit = "";
		this.queue = null;
		this.queueUnit = "";
		this.overflow = null;
		this.overflowUnit = "";


		this.movFeatureGeo = {};
		/*
			contents of movFeatureGeo:
			{
				order: x;  //order starts from 0, modeled at laneGG level
				arrowType: 2;  //type of the movement arrow, modeled at laneGG level
					// 1 for straight,
					// 2 for sharp left
					// 3 for left
					// 4 for slight left
					// 5 for slight right
					// 6 for right
					// 7 for sharp right
					// 8 for uTurn
				midLineSp: [x, y];  //middle line start point
				midLineEp: [x, y];  //middle line end point

				arrowCp: [x, y];  //center point of arrow box
				arrowAngle: xxx;  //clockwise rotation angle of the arrow

				//panels for different feature types:
				volume: {
					panelWidth: xxx,
					panelCp: [x, y]
				},
				delay: {
					panelWidth: xxx,
					panelCp: [x, y]
				},
				stop: {
					panelWidth: xxx,
					panelCp: [x, y]
				},
				queue: {
					panelWidth: xxx,
					panelCp: [x, y]
				},
				overflow: {
					panelWidth: xxx,
					panelCp: [x, y]
				}
			}

		*/
	}
}


export default Movement;
