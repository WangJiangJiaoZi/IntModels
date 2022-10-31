import importGeo from "./ImportGeo";
import updateGeo from "./UpdateGeo";
import exportGeo from "./ExportGeo";


class IntGeoController {
	constructor(intersection) {
		this.intersection = intersection;
		this.importGeo = importGeo;
		this.updateGeo = updateGeo;
		this.exportGeo = exportGeo;
	}
}


export default IntGeoController;

