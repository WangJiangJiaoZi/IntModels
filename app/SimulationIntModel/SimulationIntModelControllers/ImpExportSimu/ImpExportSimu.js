


class ImpExportSimu {
	constructor(simulationIntModel, errorHints) {
		this.simulationIntModel = simulationIntModel;
		this.errorHints = errorHints;
	}

	/******************************************************************
			Would use intModel to import geometry info.
	*******************************************************************/
	importIntGeo(geoJSON) {
		//import:
		const intModel = this.simulationIntModel.intModel;
		intModel.intersection.controllers.geoController.importGeo.importGeoFromJSON(
			intModel,
			geoJSON
		);
	}

	importVehicles() {

	}
}


export default ImpExportSimu;
