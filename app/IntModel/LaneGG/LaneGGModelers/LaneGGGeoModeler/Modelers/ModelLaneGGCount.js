
/**************************************************************************
	Would model:
		The main lane groups and side lane groups index by bound owned by the laneGG.

	Would update laneGGGeo:
		1. laneGG.laneGGGeo.mainIbLaneGroups = [xxx];  //inbound main lane groups' index array
		2. laneGG.laneGGGeo.sideIbLaneGroups = [xxx];  //inbound side lane groups' index array
		3. laneGG.laneGGGeo.mainObLaneGroups = [xxx];  //outbound main lane groups' index array
		4. laneGG.laneGGGeo.sideObLaneGroups = [xxx];  //outbound side lane groups' index array
**************************************************************************/


const modelLaneGGCount = (laneGG) => {
	let mainIbLaneGroups = [];
	let sideIbLaneGroups = [];
	let mainObLaneGroups = [];
	let sideObLaneGroups = [];

	const laneGroups = laneGG.laneGroups;

	laneGroups.forEach((oneLaneGroup, index) => {
		const laneGroupBound = oneLaneGroup.bound;

		if (laneGroupBound === "inbound") {
			mainIbLaneGroups.push(index);
		}
		else if (laneGroupBound === "inboundSide") {
			sideIbLaneGroups.push(index);
		}
		else if (laneGroupBound === "outbound") {
			mainObLaneGroups.push(index);
		}
		else {
			sideObLaneGroups.push(index);
		}
	});



	laneGG.laneGGGeo.mainIbLaneGroups = mainIbLaneGroups;  //inbound main
	laneGG.laneGGGeo.sideIbLaneGroups = sideIbLaneGroups;  //inbound side
	laneGG.laneGGGeo.mainObLaneGroups = mainObLaneGroups;  //outbound main
	laneGG.laneGGGeo.sideObLaneGroups = sideObLaneGroups;  //outbound side
};


export default modelLaneGGCount;
