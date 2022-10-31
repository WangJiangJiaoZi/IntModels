import LaneGGGeoModeler from "./LaneGGGeoModeler/LaneGGGeoModeler";
import LaneGGFeatureModeler from "./LaneGGFeatureModeler/LaneGGFeatureModeler";

class LaneGGModelers {
	constructor(laneGG) {
		this.laneGG = laneGG;
		this.laneGGGeoModeler = new LaneGGGeoModeler(laneGG);
		this.laneGGFeatureModeler = new LaneGGFeatureModeler(laneGG);
	}
}

export default LaneGGModelers;
