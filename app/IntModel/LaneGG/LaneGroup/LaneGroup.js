import LaneGroupControllers from "./LaneGroupControllers/LaneGroupControllers";
import LaneGroupDrawers from "./LaneGroupDrawers/LaneGroupDrawers";
import LaneGroupModelers from "./LaneGroupModelers/LaneGroupModelers";


class LaneGroup {
	constructor(laneGG, THREE) {
		this.laneGG = laneGG;
		this.THREE = THREE;

		this.laneGroupIndex = null;

		this.bound = null; //"inbound" / "outbound" / "inboundSide" / "outboundSide"
		//this.waitingLength = 0; //meters
		//this.signalGroupId = null;
		//this.laneLineColor = "#FFFFF";


		this.laneGroupControllers = new LaneGroupControllers(this);
		this.laneGroupDrawers = new LaneGroupDrawers(this);
		this.laneGroupModelers = new LaneGroupModelers(this);

		this.lanes = [];


		this.laneGroupGeo = {};
		/*
			laneGroupGeo contents:
			{
				laneGroupWidth: xxx,  //lane group width in meters

				sp: [x, y],
					(Start point. For inbound lane group, it is the left side start point.
					For outbound lane group, it is the right side start point.)
				ep: [x, y],
					(End point. For inbound lane group, it is the left side end point.
					For outbound lane group, it is the right side end point.)
			}
		*/
	}
}


export default LaneGroup;
