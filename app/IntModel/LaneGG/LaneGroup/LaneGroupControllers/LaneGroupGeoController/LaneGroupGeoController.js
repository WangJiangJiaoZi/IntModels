import injectLaneGroupGeo from "./InjectLaneGroupGeo";
import updateLaneGroupGeo from "./UpdateLaneGroupGeo";
import exportLaneGroupGeoToJSON from "./ExportLaneGroupGeoToJSON";



class LaneGroupGeoController {
	constructor(laneGroup) {
		this.laneGroup = laneGroup;

		this.injectLaneGroupGeo = injectLaneGroupGeo;
		this.updateLaneGroupGeo = updateLaneGroupGeo;
		this.exportLaneGroupGeoToJSON = exportLaneGroupGeoToJSON;
	}
}

export default LaneGroupGeoController;
