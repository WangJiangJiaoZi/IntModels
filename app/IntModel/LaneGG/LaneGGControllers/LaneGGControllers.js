import LaneGGGeoController from "./LaneGGGeoController/LaneGGGeoController";
import LaneGGFeatureController from "./LaneGGFeatureController/LaneGGFeatureController";

class LaneGGControllers {
	constructor(laneGG) {
		this.laneGG = laneGG;

		this.laneGGGeoController = new LaneGGGeoController(laneGG);
		this.laneGGFeatureController = new LaneGGFeatureController(laneGG);
	}
}

export default LaneGGControllers;
