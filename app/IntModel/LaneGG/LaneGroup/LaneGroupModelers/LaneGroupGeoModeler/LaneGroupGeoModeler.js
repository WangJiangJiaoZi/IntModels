
import modelLaneGroupGeoForApp from "./ModelLaneGroupGeoForApp";
import modelLaneGroupGeo from "./ModelLaneGroupGeo";


class LaneGroupGeoModeler {
	constructor(laneGroup) {
		this.laneGroup = laneGroup;

		this.modelLaneGroupGeoForApp = modelLaneGroupGeoForApp;
		this.modelLaneGroupGeo = modelLaneGroupGeo;
	}
}


export default LaneGroupGeoModeler;
