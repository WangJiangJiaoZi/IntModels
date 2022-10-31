
import LaneGroupGeoModeler from "./LaneGroupGeoModeler/LaneGroupGeoModeler";



class LaneGroupModelers {
	constructor(laneGroup) {
		this.laneGroup = laneGroup;
		this.laneGroupGeoModeler = new LaneGroupGeoModeler(laneGroup);
	}
}

export default LaneGroupModelers;
