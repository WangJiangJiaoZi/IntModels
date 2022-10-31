

const injectCornerGeo = (oneCorner, oneCornerGeoData) => {

	oneCorner.cornerId = oneCornerGeoData.cornerId;  //unique id from DB
	oneCorner.cornerType = oneCornerGeoData.cornerType; //1 for polyline, 2 for arc, 3 for arc and island
	oneCorner.cornerRadius = oneCornerGeoData.cornerRadius; //meters
	oneCorner.cornerInboundWidth = oneCornerGeoData.cornerInboundWidth; //meters
	oneCorner.cornerOutboundWidth = oneCornerGeoData.cornerOutboundWidth; //meters
	oneCorner.channelWidth = oneCornerGeoData.channelWidth; //meters
	oneCorner.cornerCrosswalkWidth = oneCornerGeoData.cornerCrosswalkWidth;  //meters


	oneCorner.cornerShape = {
		intCornerShape: {},
		raCornerShape: {}
	};
	oneCorner.cornerGeo = {
		intCornerGeo: {},
		raCornerGeo: {}
	};
};


export default injectCornerGeo;
