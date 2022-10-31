

import LaneGGGeoDrawers from "./LaneGGGeoDrawers/LaneGGGeoDrawers";
import LaneGGFeatureDrawers from "./LaneGGFeatureDrawers/LaneGGFeatureDrawers";

class LaneGGDrawers {
	constructor(laneGG) {
		this.laneGG = laneGG;

		//geometry drawers:
		const laneGGGeoDrawers = new LaneGGGeoDrawers(laneGG);
		this.drawLaneGGGeo = laneGGGeoDrawers.drawLaneGGGeo;
		this.drawLaneGGEndConnectP = laneGGGeoDrawers.drawLaneGGEndConnectP;
		this.undrawLaneGGEndConnectP = laneGGGeoDrawers.undrawLaneGGEndConnectP;
		this.drawLaneGGStartConnectP = laneGGGeoDrawers.drawLaneGGStartConnectP;
		this.undrawLaneGGStartConnectP = laneGGGeoDrawers.undrawLaneGGStartConnectP;
		this.drawLaneArrowColor = laneGGGeoDrawers.drawLaneArrowColor;

		//feature drawers:
		const laneGGFeatureDrawers = new LaneGGFeatureDrawers(laneGG);
		this.drawMovementArrow = laneGGFeatureDrawers.drawMovementArrow;
		this.drawMovementFeature = laneGGFeatureDrawers.drawMovementFeature;
		this.undrawMovementArrow = laneGGFeatureDrawers.undrawMovementArrow;
		this.undrawMovementFeature = laneGGFeatureDrawers.undrawMovementFeature;
	}

}



export default LaneGGDrawers;
