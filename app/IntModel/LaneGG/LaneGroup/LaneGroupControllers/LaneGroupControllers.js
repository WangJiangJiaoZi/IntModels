import LaneGroupGeoController from "./LaneGroupGeoController/LaneGroupGeoController";


class LaneGroupControllers {
	constructor(laneGroup) {
		this.laneGroup = laneGroup;
		this.laneGroupGeoController = new LaneGroupGeoController(laneGroup);
	}
}

export default LaneGroupControllers;
