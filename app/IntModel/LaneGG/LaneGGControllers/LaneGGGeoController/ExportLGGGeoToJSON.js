


const exportLGGGeoToJSON = (laneGG) => {

	const laneGGGeoData = [];

	// *************** Ask laneGroup to collect laneGroup level data ****************
	const laneGroups = laneGG.laneGroups;
	laneGroups.forEach((oneLaneGroup) => {
		const oneLaneGroupGeoData = oneLaneGroup.laneGroupControllers.laneGroupGeoController.exportLaneGroupGeoToJSON(oneLaneGroup);
		laneGGGeoData.push(oneLaneGroupGeoData);
	});

	//make sure that laneGGGeoData starts from "inbound", "inboundSide", "outbound", to "outboundSide"
	const boundToNum = {
		"inbound": 0,
		"inboundSide": 1,
		"outbound": 2,
		"outboundSide": 3
	};

	laneGGGeoData.sort((laneGroupA, laneGroupB) => {
		const boundANum = boundToNum[laneGroupA.bound];
		const boundBNum = boundToNum[laneGroupB.bound];
		return (boundANum < boundBNum) ? -1 : 1;
	});
	// ***************************** Return the result ******************************
	return laneGGGeoData;
};

export default exportLGGGeoToJSON;
