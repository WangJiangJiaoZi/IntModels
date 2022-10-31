import injectAppGeo from "./InjectAppGeo";
import updateAppGeo from "./UpdateAppGeo";
import exportAppGeoToDB from "./ExportAppGeoToDB";
import exportAppGeoToJSON from "./ExportAppGeoToJSON";


class AppGeoController {
	constructor(approach) {
		this.approach = approach;

		this.injectAppGeo = injectAppGeo;
		this.updateAppGeo = updateAppGeo;
		this.exportAppGeoToDB = exportAppGeoToDB;
		this.exportAppGeoToJSON = exportAppGeoToJSON;
	}
}


export default AppGeoController;
