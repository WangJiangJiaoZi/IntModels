

//would update laneGG.laneGGGeo.laneGGWidth in meters

const modelLaneGGWidth = (laneGG) => {
	let laneGGWidth = 0;
	const laneGroups = laneGG.laneGroups;
	laneGroups.forEach((oneLaneGroup) => {
		const modelLaneGroupGeoForApp = oneLaneGroup.laneGroupModelers.laneGroupGeoModeler.modelLaneGroupGeoForApp;
		modelLaneGroupGeoForApp(oneLaneGroup);
		const oneLaneGroupWidth = oneLaneGroup.laneGroupGeo.laneGroupWidth;
		laneGGWidth += oneLaneGroupWidth;

	});

	laneGG.laneGGGeo.laneGGWidth = laneGGWidth;

};


export default modelLaneGGWidth;
