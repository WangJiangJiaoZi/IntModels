

const injectCrosswalkGeo = (oneCrosswalk, oneCrosswalkGeoData) => {

		oneCrosswalk.ifCrosswalk = oneCrosswalkGeoData.ifCrosswalk;
		oneCrosswalk.crosswalkId = oneCrosswalkGeoData.crosswalkId;  //unique id from DB
		oneCrosswalk.crosswalkAngle = oneCrosswalkGeoData.crosswalkAngle;
		oneCrosswalk.crosswalkOffset = oneCrosswalkGeoData.crosswalkOffset; //meters
		oneCrosswalk.crossswalkWidth = oneCrosswalkGeoData.crosswalkWidth; //meters
		oneCrosswalk.crosswalkBuffer = oneCrosswalkGeoData.crosswalkBuffer; //meters
		oneCrosswalk.crosswalkHeight = oneCrosswalkGeoData.crosswalkHeight; //meters
		oneCrosswalk.crosswalkGap = oneCrosswalkGeoData.crosswalkGap; //meters

		oneCrosswalk.crosswalkShape = {};
		oneCrosswalk.crosswalkGeo = {};

};


export default injectCrosswalkGeo;
