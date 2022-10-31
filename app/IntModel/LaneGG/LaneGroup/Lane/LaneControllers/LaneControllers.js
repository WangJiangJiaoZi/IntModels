import injectLaneGeo from "./InjectLaneGeo";
import updateLaneGeo from "./UpdateLaneGeo";
import exportLaneGeoToJSON from "./ExportLaneGeoToJSON";

class LaneControllers {
	constructor(lane) {
		this.lane = lane;

		this.injectLaneGeo = injectLaneGeo;
		this.updateLaneGeo = updateLaneGeo;
		this.exportLaneGeoToJSON = exportLaneGeoToJSON;
	}
}


export default LaneControllers;
