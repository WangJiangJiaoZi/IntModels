


class ImportExportGeo {
	constructor(intModel) {
		this.intModel = intModel;
	}

	importGeoFromDB(nextGeoVersionId, url) {
		/*
		//clean up mesh if necessary:
		const scene = this.intModel.scene;
		//if scene exists, remove all previous objects except lights
		if (scene) {
			for (let i = scene.children.length - 1; i >= 0; i--) {
				let obj = scene.children[i];
				if (!obj.isLight) {
					scene.remove(obj);
					obj = undefined;
				}
			}
		}
		*/

		//import:
		const downloadGeoDataPromise = this.intModel.intersection.controllers.geoController.importGeo.importGeoFromDB(
			this.intModel,
			nextGeoVersionId,
			url
		);

		return downloadGeoDataPromise;
	}


	importGeoFromJSON(nextGeoJSON) {
		/*
		//clean up mesh if necessary:
		const scene = this.intModel.scene;
		//if scene exists, remove all previous objects except lights
		if (scene) {
			for (let i = scene.children.length - 1; i >= 0; i--) {
				let obj = scene.children[i];
				if (!obj.isLight) {
					scene.remove(obj);
					obj = undefined;
				}
			}
		}
		*/

		//import:
		this.intModel.intersection.controllers.geoController.importGeo.importGeoFromJSON(
			this.intModel,
			nextGeoJSON
		);
	}


	exportGeoToDB(url) {
		const uploadGeoDataPromise = this.intModel.intersection.controllers.geoController.exportGeo.exportGeoToDB(
			this.intModel,
			url
		);

		return uploadGeoDataPromise;
	}

	exportGeoToObj() {
		const geoDataObjToExport = this.intModel.intersection.controllers.geoController.exportGeo.exportGeoToJSON(
			this.intModel.intersection,
		);

		return geoDataObjToExport;
	}
}

export default ImportExportGeo;
