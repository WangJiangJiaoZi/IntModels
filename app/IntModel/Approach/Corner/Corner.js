
import cornerControllers from "./CornerControllers";
import cornerModelers from "./CornerModelers";
import cornerDrawers from "./CornerDrawers";

class Corner {
	constructor(approach, THREE) {

		this.approach = approach;
		this.THREE = THREE;

		this.cornerId = null;  //unique id from DB
		this.cornerType = 2; //1 for polyline, 2 for arc, 3 for arc and island
		this.cornerRadius = 5; //meters
		this.cornerInboundWidth = 0; //meters
		this.cornerOutboundWidth = 0; //meters
		this.channelWidth = 0; //meters
		this.cornerCrosswalkWidth = 0;  //meters

		this.cornerControllers = cornerControllers;
		this.cornerModelers =  cornerModelers;
		this.cornerDrawers =  cornerDrawers;
		this.layerId = 0;


		this.cornerShape = null;
		/*
			{
				intCornerShape: {
					cornerCurves: [],
						(an array of THREE.js Shape obejct for int corner itself
						in normal case / themselves in special case)
					islandCurves: an instance of Shape
				},
				raCornerShape: {}
			}
		*/


		this.cornerGeo = null;
		/*
			contents of cornerGeo:
			{
				intCornerGeo: {
					outerArcPoints: [[x1, y1], [x2, y2]] or [[x1, y1], [x2, y2], [x3, y3], [x4, y4]],
						(start and end points of the outer arc(s))
					outerArcMidPoint: [x, y];
						(Refers to the middle point of the outer arc.)
					curAppCornerLength: d1,
						(Refers to the corner length in meters on the current approach side.)
					neiAppCornerLength: d2,
						(Refers to the corner length in meters on the neighbor approach side.)
					innerArcPoints: [[x1, y1], [x2, y2]] or [[x1, y1], [x2, y2], [x3, y3], [x4, y4]],
						(start and end points of the inner arc(s))
					islandTip: [x, y],
						(the tip point of the island)
					curAppIslandLength: d1,
						(Refers to the island width in meters on the current approach side.)
					neiAppIslandLength: d2,
						(Refers to the island width in meters on the neighbor approach side.)
					curAppIslandMidPoint: [x1, y1],
						(Refers to the middle point on the current approach side.)
					neiAppIslandMidPoint: [x2, y2],
						(Refers to the middle point on the neighbor approach side.)
					islandArcMidPoint: [x, y],
						(Refers to the middle point of the island arc)
				},
				raCornerGeo: {}
			}
		*/
	}
}


export default Corner;
