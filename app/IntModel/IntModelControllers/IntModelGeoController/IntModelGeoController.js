
import UpdateGeo from "./UpdateGeo/UpdateGeo";
import ImportExportGeo from "./ImportExportGeo/ImportExportGeo";
import ModelGeo from "./ModelGeo/ModelGeo";
import DrawGeo from "./DrawGeo/DrawGeo";
import GetGeo from "./GetGeo/GetGeo";

class IntModelGeoController {
	constructor(intModel, geoControllerErHints) {
		this.intModel = intModel;
		this.geoControllerErHints = geoControllerErHints;

		const importExportGeo = new ImportExportGeo(intModel);
		const modelGeo = new ModelGeo(intModel);
		const drawGeo = new DrawGeo(intModel);
		const getGeo = new GetGeo(intModel);
		const updateGeo = new UpdateGeo(intModel, modelGeo, drawGeo, getGeo);

		this.importExportGeo = importExportGeo;
		this.modelGeo = modelGeo;
		this.drawGeo = drawGeo;
		this.getGeo = getGeo;
		this.updateGeo = updateGeo;

	}

}



export default IntModelGeoController;
