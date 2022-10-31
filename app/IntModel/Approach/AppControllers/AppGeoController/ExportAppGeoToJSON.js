

const exportAppGeoToJSON = (approach) => {
	const appGeoDataToExport = {};

	// ********************* Collect approach level data ***********************
	appGeoDataToExport.appId = approach.appRealId;
	appGeoDataToExport.appAngle = approach.appAngle;
	appGeoDataToExport.inboundStorageLength = approach.inboundStorageLength;
	appGeoDataToExport.inboundSlipLength = approach.inboundSlipLength;
	appGeoDataToExport.inboundStorageWidth = approach.inboundStorageWidth;
	appGeoDataToExport.outboundStorageLength = approach.outboundStorageLength;
	appGeoDataToExport.outboundSlipLength = approach.outboundSlipLength;
	appGeoDataToExport.outboundStorageWidth = approach.outboundStorageWidth;
	//appGeoDataToExport.appName = approach.appName;
	appGeoDataToExport.appSpeedLimit = approach.appSpeedLimit;
	appGeoDataToExport.appRoadClass = approach.appRoadClass;
	appGeoDataToExport.slope = approach.slope;


	// *************** Ask corner to  collect corner level data ****************
	const corner = approach.corner;
	const cornerGeoData = corner.cornerControllers.exportCornerGeoToJSON(corner);
	appGeoDataToExport.corner = cornerGeoData;  //should be an object


	// *************** Ask crosswalk to  collect crosswalk level data ****************
	const crosswalk = approach.crosswalk;
	const crosswalkGeoData = crosswalk.crosswalkControllers.exportCrosswalkGeoToJSON(crosswalk);
	appGeoDataToExport.crosswalk = crosswalkGeoData;  //should be an object


	// *************** Ask text to  collect text level data ****************
	const text = approach.text;
	const textGeoData = text.textControllers.exportTextGeoToJSON(text);
	appGeoDataToExport.appName = textGeoData;  //should be a string


	// *************** Ask divGroup to  collect divGroup level data ****************
	const dividerGroup = approach.dividerGroup;
	const divGroupGeoData = dividerGroup.divGroupControllers.exportDivGroupGeoToJSON(dividerGroup);
	appGeoDataToExport.dividerGroup = divGroupGeoData;  //should be an array


	// *************** Ask laneGG to collect laneGG level data ****************
	const laneGG = approach.laneGG;
	const laneGGGeoData = laneGG.laneGGControllers.laneGGGeoController.exportLGGGeoToJSON(laneGG);
	appGeoDataToExport.laneGG = laneGGGeoData;    //should be an array


	// **************************** Return the result ******************************
	return appGeoDataToExport;

};


export default exportAppGeoToJSON;
