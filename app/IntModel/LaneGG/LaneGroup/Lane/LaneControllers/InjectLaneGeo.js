


const injectLaneGeo = (oneLane, oneLaneGeoData, index) => {
	oneLane.laneIndex = index;

	oneLane.laneId = oneLaneGeoData.laneId;
	oneLane.laneMov = oneLaneGeoData.laneMov; //to which lane in which approach: "appId-laneId"
	oneLane.whiteLinelength = oneLaneGeoData.whiteLinelength; //meters
	oneLane.laneLength = oneLaneGeoData.laneLength; //meters
	oneLane.laneWidth = oneLaneGeoData.laneWidth; //meters
	oneLane.laneSpeedLimit = oneLaneGeoData.laneSpeedLimit; //km/hr
	oneLane.laneText = oneLaneGeoData.laneText;

	oneLane.waitingLength = oneLaneGeoData.waitingLength;
	oneLane.laneLineColor = oneLaneGeoData.laneLineColor;
	//oneLane.signalGroupId = oneLaneGeoData.signalGroupId;


	oneLane.laneShape = {};

	oneLane.laneGeo = {};
};


export default injectLaneGeo;
