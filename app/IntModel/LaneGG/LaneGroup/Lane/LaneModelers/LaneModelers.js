
import LaneGeoModeler from "./LaneGeoModeler/LaneGeoModeler";

class LaneModelers {
	constructor(lane) {
		this.lane = lane;
		this.laneGeoModeler = new LaneGeoModeler(lane);
	}
}

export default LaneModelers;
