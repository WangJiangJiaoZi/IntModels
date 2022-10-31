

const injectDivGeo = (oneDivider, oneDividerGeoData) => {
	oneDivider.dividerType = oneDividerGeoData.dividerType; //1 for "inbound" / 2 for "outbound" / 3 for "center"
	oneDivider.type = oneDividerGeoData.type; //1 for white dash, 2 for white solid, 3.......
	oneDivider.dividerId = oneDividerGeoData.dividerId;  //unique id from DB
	oneDivider.color = oneDividerGeoData.color;
	oneDivider.offset = oneDividerGeoData.offset; //meters
	oneDivider.storageLength = oneDividerGeoData.storageLength; //meters
	oneDivider.storageSlipLength = oneDividerGeoData.storageSlipLength; //meters
	oneDivider.storageWidth = oneDividerGeoData.storageWidth; //meters, only for center divider
	oneDivider.startWidth = oneDividerGeoData.startWidth; //meters
	oneDivider.capRadius = oneDividerGeoData.capRadius; //meters

	oneDivider.divConnectP = null;
	oneDivider.divShape = {};
	oneDivider.divGeo = {};
};

export default injectDivGeo;
