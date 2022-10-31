
import IntModelBaseClass from "../IntModelBaseClass";


import AppControllers from "./AppControllers/AppControllers";
import AppModelers from "./AppModelers/AppModelers";
import AppDrawers from "./AppDrawers/AppDrawers";

class Approach extends IntModelBaseClass {
	constructor(intersection, appIndex, THREE, errorHints) {
		super("Approach", errorHints.approach);
		this.intersection = intersection;
		this.appId = appIndex;   //approach index
		this.THREE = THREE;
		this.errorHints = errorHints;


		this.appRealId = null;  //unique id from DB
		this.appAngle = null;
		this.inboundStorageLength = 0;
		this.inboundSlipLength = 0;
		this.inboundStorageWidth = 0;
		this.outboundStorageLength = 0;
		this.outboundSlipLength = 0;
		this.outboundStorageWidth = 0;
		this.appName = "Unnamed Approach";
		this.appSpeedLimit = null;
		this.appRoadClass = null;
		this.slope = 0;

		this.corner = null;
		this.crosswalk = null;
		this.dividerGroup = null;
		this.laneGG = null;
		this.text = null;


		this.appControllers = new AppControllers(this);
		this.appModelers = new AppModelers(this);
		this.appDrawers = new AppDrawers(this);
		this.layerId = 0;

		this.appShape = {};  //would contain calculated THREE.js shape
		/*appShape contents:
			{
				curves: an intance of THREE.Shape object describing approach outline curves,

			}
		*/


		this.appGeo = {}; //would contain calculated vertex information
		/*appGeo contents:
		{
			outerSides: [{a: a, b: b1}, {a: a, b: b2}], //for right outer side and left outer side
			outerLeftEndPoint: [x, y], //for left outer side end point
			outerRightEndPoint: [x, y], //for right outer side end point
			centerEndPoint: [x, y], //for center end point (NOT divider but geometry middle line)

			outerRightSp: [x1, y1], //for right outer side start point
			outerLeftSp: [x2, y2], //for left outer side start point

			innerRightEp: [x, y], //for inner right side end point
			innerLeftEp: [x, y],  //for inner left side end point
			innerSides: [{a: appA, b: b1}, {a: appA, b: b2}],  //for inner right and left sides

			rightSideCps: [[x1, y1], [x2, y2]],
				//right side bezier curve control points. If no storage,
				//the two points would be the same
			leftSideCps: [[x1, y1], [x2, y2]],
				//left side bezier curve control points. If no storage,
				//the two points would be the same

		}


		*/
	}
}

export default Approach;
