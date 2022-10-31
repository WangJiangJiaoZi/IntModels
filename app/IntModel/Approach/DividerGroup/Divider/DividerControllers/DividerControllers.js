import injectDivGeo from "./Controllers/InjectDivGeo";
import updateDivGeo from "./Controllers/UpdateDivGeo";
import exportDivGeoToJSON from "./Controllers/ExportDivGeoToJSON";


class DividerControllers {
	constructor(divider) {
		this.divider = divider;

		this.injectDivGeo = injectDivGeo;

		this.updateDivGeo = updateDivGeo;

		this.exportDivGeoToJSON = exportDivGeoToJSON;
	}


}


export default DividerControllers;
