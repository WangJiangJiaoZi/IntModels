


const exportLaneGeoToJSON = (lane) => {
	const laneGeoData = {};

	// ***************** Collect lane level geo data ******************
	laneGeoData.laneId = lane.laneId;
	laneGeoData.laneMov = lane.laneMov; //to which lane in which approach: "appId-laneId"
	laneGeoData.whiteLinelength = lane.whiteLinelength; //meters
	laneGeoData.laneLength = lane.laneLength; //meters
	laneGeoData.laneWidth = lane.laneWidth; //meters
	laneGeoData.laneSpeedLimit = lane.laneSpeedLimit; //km/hr
	laneGeoData.laneText = lane.laneText;

	laneGeoData.waitingLength = lane.waitingLength;
	laneGeoData.laneLineColor = lane.laneLineColor;


	// ********************** Return the result **********************
	return laneGeoData;
};



export default exportLaneGeoToJSON;
