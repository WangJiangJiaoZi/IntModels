


const exportCornerGeoToJSON = (corner) => {

	const cornerGeoData = {};

	// ********************* Collect corner level data ***********************

	cornerGeoData.cornerId = corner.cornerId;  //unique id from DB
	cornerGeoData.cornerType = corner.cornerType; //1 for polyline, 2 for arc, 3 for arc and island
	cornerGeoData.cornerRadius = corner.cornerRadius; //meters
	cornerGeoData.cornerInboundWidth = corner.cornerInboundWidth; //meters
	cornerGeoData.cornerOutboundWidth = corner.cornerOutboundWidth; //meters
	cornerGeoData.channelWidth = corner.channelWidth; //meters
	cornerGeoData.cornerCrosswalkWidth = corner.cornerCrosswalkWidth;  //meters


	// ************************ Return the result ****************************

	return cornerGeoData;

};


export default exportCornerGeoToJSON;
