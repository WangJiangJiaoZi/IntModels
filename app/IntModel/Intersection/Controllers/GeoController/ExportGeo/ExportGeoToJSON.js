


const exportGeoToJSON = (intersection) => {
	const geoDataToExport = {};

	// ********************* Collect intersection level data ***********************

	geoDataToExport.geoVersionId = intersection.geoVersionId;
	geoDataToExport.intId = intersection.intId;
	geoDataToExport.timestamp = intersection.timestamp;
	geoDataToExport.location = intersection.location;
	geoDataToExport.intDiameter = intersection.intDiameter;
	geoDataToExport.class = intersection.class;
	geoDataToExport.roadColor = intersection.roadColor;
	geoDataToExport.cornerIslandColor = intersection.cornerIslandColor;
	geoDataToExport.crossWalkColor = intersection.crossWalkColor;
	geoDataToExport.textColor = intersection.textColor;
	geoDataToExport.backgroundColor = intersection.backgroundColor;


	// *********** Traverse Approaches to  collect approaches level data ***********
	const approachesGeoData = [];
	intersection.approaches.forEach((oneApp) => {
		const oneAppGeoDataToExport = oneApp.appControllers.appGeoController.exportAppGeoToJSON(oneApp);
		approachesGeoData.push(oneAppGeoDataToExport);
	});

	geoDataToExport.approaches = approachesGeoData;

	// ********************* Jsonfy and return the result ***********************
	return geoDataToExport;
};


export default exportGeoToJSON;
