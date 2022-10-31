


const exportDivGeoToJSON = (divider) => {
	const dividerGeoData = {};

	// ****************** Collect divider level geo data ********************
	dividerGeoData.dividerType = divider.dividerType; //1 for "inbound" / 2 for "outbound" / 3 for "center"
	dividerGeoData.type = divider.type; //1 for white dash, 2 for white solid, 3.......
	dividerGeoData.dividerId = divider.dividerId;  //unique id from DB
	dividerGeoData.color = divider.color;
	dividerGeoData.offset = divider.offset; //meters
	dividerGeoData.storageLength = divider.storageLength; //meters
	dividerGeoData.storageSlipLength = divider.storageSlipLength; //meters
	dividerGeoData.storageWidth = divider.storageWidth; //meters, only for center divider
	dividerGeoData.startWidth = divider.startWidth; //meters
	dividerGeoData.capRadius = divider.capRadius; //meters


	// ************************* Return the result **************************
	return dividerGeoData;
};


export default exportDivGeoToJSON;
