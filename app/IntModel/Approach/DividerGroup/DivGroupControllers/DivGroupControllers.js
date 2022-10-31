import injectDivGroupGeo from "./Controllers/InjectDivGroupGeo";
import updateDivGroupGeo from "./UpdateDivGroupGeo";
import exportDivGroupGeoToJSON from "./Controllers/ExportDivGroupGeoToJSON";


class DivGroupControllers {
	constructor(divGroup) {
		this.divGroup = divGroup;

		this.injectDivGroupGeo = injectDivGroupGeo;
		this.updateDivGroupGeo = updateDivGroupGeo;
		this.exportDivGroupGeoToJSON = exportDivGroupGeoToJSON;
	}
}


export default DivGroupControllers;
