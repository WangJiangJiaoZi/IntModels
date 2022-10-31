import injectLGGGeo from "./InjectLGGGeo";
import updateLGGGeo from "./UpdateLGGGeo";
import exportLGGGeoToJSON from "./ExportLGGGeoToJSON";



class LaneGGGeoController {
	constructor(laneGG) {
		this.laneGG = laneGG;

		this.injectLGGGeo = injectLGGGeo;
		this.updateLGGGeo = updateLGGGeo;
		this.exportLGGGeoToJSON = exportLGGGeoToJSON;
	}
}


export default LaneGGGeoController;
