

const exportCrosswalkGeoToJSON = (crosswalk) => {

	const crosswalkGeoData = {};

	// ********************* Collect crosswalk level data ***********************
	crosswalkGeoData.ifCrosswalk = crosswalk.ifCrosswalk;
	crosswalkGeoData.crosswalkId = crosswalk.crosswalkId;  //unique id from DB
	crosswalkGeoData.crosswalkAngle = crosswalk.crosswalkAngle;
	crosswalkGeoData.crosswalkOffset = crosswalk.crosswalkOffset; //meters
	crosswalkGeoData.crosswalkWidth = crosswalk.crossswalkWidth; //meters
	crosswalkGeoData.crosswalkBuffer = crosswalk.crosswalkBuffer; //meters
	crosswalkGeoData.crosswalkHeight = crosswalk.crosswalkHeight; //meters
	crosswalkGeoData.crosswalkGap = crosswalk.crosswalkGap; //meters

	// ************************** Return the result *****************************
	return crosswalkGeoData;
};


export default exportCrosswalkGeoToJSON;
