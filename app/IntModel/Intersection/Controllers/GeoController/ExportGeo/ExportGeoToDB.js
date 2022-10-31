




const exportGeoToDB = (intModel, url) => {
	const exportGeoDataPromise = new Promise((resolve, reject) => {

		const geoData = intModel.intersection.controllers.geoController.exportGeo.exportGeoToJSON(
			this.intModel.intersection,
		);

		fetch(url, {
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(geoData)
		}).then((response) => {
			console.log(response);
			resolve();
		});
	});


	return exportGeoDataPromise;
};


export default exportGeoToDB;
