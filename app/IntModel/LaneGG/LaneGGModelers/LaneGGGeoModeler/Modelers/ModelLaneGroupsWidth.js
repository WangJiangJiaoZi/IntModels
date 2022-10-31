//import SharedGeometryLib from "../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		Inbound lane groups width (inbound main lane groups and side one) in pixel

	Would update:
		1. laneGG.laneGGGeo.ibMainLgWidth = xxx;  //inbound main lane groups width in pixel
		2. laneGG.laneGGGeo.ibSideLgWidth = xxx;  //inbound side lane group width in pixel
		3. laneGG.laneGGGeo.obMainLgWidth = xxx;  //outbound main lane group width in pixel
		4. laneGG.laneGGGeo.obSideLgWidth = xxx;  //outbound side lane group width in pixel
**************************************************************************/

const modelIbLaneGroupsWidth = (laneGG, intSize, meterToPixel, accuracy) => {
	//************************ Prepare parameters ************************
	let ibMainLgWidth = 0; //in pixel
	let ibSideLgWidth = 0; //in pixel
	let obMainLgWidth = 0; //in pixel
	let obSideLgWidth = 0; //in pixel

	const laneGroups = laneGG.laneGroups;

	laneGroups.forEach((oneLaneGroup) => {
		const lgBound = oneLaneGroup.bound;  //"inbound" / "outbound" / "inboundSide" / "outboundSide"
		const lgWidth = oneLaneGroup.laneGroupGeo.laneGroupWidth * meterToPixel;  //laneGroup width in pixel
		if (lgBound === "inbound") {
			ibMainLgWidth += lgWidth;
		}
		else if (lgBound === "outbound") {
			obMainLgWidth += lgWidth;
		}
		else if (lgBound === "inboundSide") {
			ibSideLgWidth += lgWidth;
		}
		else {
			obSideLgWidth += lgWidth;
		}
	});


	laneGG.laneGGGeo.ibMainLgWidth = ibMainLgWidth;  //inbound main lane groups width in pixel
	laneGG.laneGGGeo.ibSideLgWidth = ibSideLgWidth;  //inbound side lane group width in pixel
	laneGG.laneGGGeo.obMainLgWidth = obMainLgWidth;  //outbound main lane group width in pixel
	laneGG.laneGGGeo.obSideLgWidth = obSideLgWidth;  //outbound side lane group width in pixel
};


export default modelIbLaneGroupsWidth;
