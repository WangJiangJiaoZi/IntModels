
import Lane from "../../Lane/Lane";


const injectLaneGroupGeo = (oneLaneGroup, oneLaneGroupGeoData, index) => {

	oneLaneGroup.laneGroupIndex = index;

	oneLaneGroup.bound = oneLaneGroupGeoData.bound; //"inbound" / "outbound" / "inboundSide" / "outboundSide"
	//oneLaneGroup.waitingLength = oneLaneGroupGeoData.waitingLength; //meters
	//oneLaneGroup.signalGroupId = oneLaneGroupGeoData.signalGroupId;
	//oneLaneGroup.laneLineColor = oneLaneGroupGeoData.laneLineColor;

	oneLaneGroup.laneGroupGeo = {};


	oneLaneGroupGeoData.lanes.forEach((oneLaneGeoData, laneIndex) => {
		const oneLane = new Lane(oneLaneGroup, oneLaneGroup.THREE);
		oneLaneGroup.lanes.push(oneLane);
		oneLane.laneControllers.injectLaneGeo(oneLane, oneLaneGeoData, laneIndex);
	});
};



export default injectLaneGroupGeo;
