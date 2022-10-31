import LaneControllers from "./LaneControllers/LaneControllers";
import LaneDrawers from "./LaneDrawers/LaneDrawers";
import LaneModelers from "./LaneModelers/LaneModelers";


class Lane {
	constructor(laneGroup, THREE) {
		this.laneGroup = laneGroup;
		this.THREE = THREE;

		this.laneIndex = null; //index of the lane in current laneGroup

		this.laneId = null;  //unique id of the lane from DB
		this.laneMov = []; //to which lane in which approach: "appId-laneId"
		this.whiteLinelength = 10; //meters
		this.laneLength = -1; //meters, -1 means unlimited
		this.laneWidth = 3.5; //meters
		this.laneSpeedLimit = 30; //km/hr
		this.laneText = null;
		this.waitingLength = 0;   //in meters
		this.laneLineColor = "#FFFFFF";  //white
		this.signalGroupId = null;


		this.laneControllers = new LaneControllers(this);
		this.laneDrawers = new LaneDrawers(this);
		this.laneModelers = new LaneModelers(this);

		this.laneConnectP = null;  //would be a THREE.Mesh
		this.laneArrow = null;     //would be a THREE.Mesh

		this.laneShape = {};
		/*laneShape contents:
			{
				laneSolidLineCurves: an instance of THREE.Shape,
				laneDashLineCurves: [intances of THREE.Shape],

				wAreaLsCurves: [intances of THREE.Shape],
				wAreaRsCurves: [intances of THREE.Shape],
				wAreaStopBar: an instance of THREE.Shape,

				//laneArrowCurves:,

				laneTextCurves: TBD
			}

		*/


		this.laneGeo = {};
		/*laneGeo contents:
			{
				//left and right does not vary between different bounds:
				lsSp: [x, y],  //start point of the lane left side
				lsEp: [x, y],  //end point of the lane left side
				rsSp: [x, y],  //start point of the lane right side
				rsEp: [x, y],  //end point of the lane right side

				midLineSp: [x, y],  //start point of the lane middle line
				midLineEp: [x, y],  //end point of the lane middle line
				arrowCp: [x, y],  //center point of the lane arrow
				midLineCp: [x, y],  //a control point on the middle line
				//that is 10 meters away from end point (for connector calculation)

				ifConnectPoint: true/false,

				// *********** arrow ************
				arrowType: would be an arrow type number,
					// 1 for straight,
					// 2 for sharp left
					// 3 for left
					// 4 for slight left
					// 5 for slight right
					// 6 for right
					// 7 for sharp right
					// 8 for uTurn

				arrowAngle: an radian angle determines clockwise
					rotation of the angle,

				arrowInitType: would be an arrow type array of single arrow
					type number,

				// *********** waiting area ************
				wArcLsSp: [x, y],  //left start point of the waiting area arc
				wArcRsSp: [x, y],  //right start point of the waiting area arc
				wArcLsEp: [x, y],  //left end point of the waiting area arc
				wArcRsEp: [x, y],  //right end point of the waiting area arc
				wArcCp: [x, y],  //center point of the waiting area arc (could be null if
					the origin lane and destination lane are parallel)

				toLaneLsSp: [x, y],  //toLane left side start point
				toLaneRsSp: [x, y],  //toLane right side start point

				// *********** for side lane only ************
				//"left" and "right" are relative to the approach's inbound direction
				rsCps: [[x1, y1], [x2, y2]],  //control points for side lane
				lsCps: [[x1, y1], [x2, y2]]   //control points for side lane
			}
		*/

	}
}


export default Lane;
