

/************************************************************************************
	Would model movement text panel width and center point for every type.

	Would update:
		movFeatureGeo.volume.panelWidth = xxx;  //volume panel width in pixel
		movFeatureGeo.volume.panelCp = xxx;  //volume panel center point

		movFeatureGeo.delay.panelWidth = xxx;  //delay panel width in pixel
		movFeatureGeo.delay.panelCp = xxx;  //delay panel center point

		movFeatureGeo.stop.panelWidth = xxx;  //stop panel width in pixel
		movFeatureGeo.stop.panelCp = xxx;  //stop panel center point

		movFeatureGeo.queue.panelWidth = xxx;  //queue panel width in pixel
		movFeatureGeo.queue.panelCp = xxx;  //queue panel center point

		movFeatureGeo.overflow.panelWidth = xxx;  //overflow panel width in pixel
		movFeatureGeo.overflow.panelCp = xxx;  //overflow panel center point
*************************************************************************************/

const modelMovTextPanel = (movement, intSize, meterToPixel, accuracy) => {
	// ****************** parameters preparation ******************
	const midLineSp = movement.movFeatureGeo.midLineSp;  //[x, y]
	const midLineEp = movement.movFeatureGeo.midLineEp;  //[x, y]

	const intersection = movement.frLaneGG.approach.intersection;
	const envSetters = intersection.intModel.envSetters;
	const panelOffest = (envSetters.movArrowCenterOffest * 2  + envSetters.movTextGap) *meterToPixel;
	const panelHeight = intersection.intFeatureGeo.movTextPanelHeight;  //in pixel
	const oneCharWidth = panelHeight * 0.5;  //in pixel

	const THREE = movement.THREE;


	// ********************** do calculation **********************
	const types = ["volume", "delay", "stop", "queue", "overflow"];
	types.forEach((oneType) => {
		const oneTextWidth = movement.frLaneGG.laneGGFeatureGeo.movsTextMaxLen[oneType] * oneCharWidth; //in pixel
		const onePanelWidth = oneTextWidth + panelHeight * 0.2;

		const onePanelCpVec = new THREE.Vector2(
								midLineSp[0], midLineSp[1]
							);
		const midLineVec = new THREE.Vector2(
							midLineEp[0] - midLineSp[0],
							midLineEp[1] - midLineSp[1]
						);
		midLineVec.setLength(panelOffest + onePanelWidth / 2);
		onePanelCpVec.add(midLineVec);
		const onePanelCp = [onePanelCpVec.x, onePanelCpVec.y];

		// ******************** update movFeatureGeo ********************
		movement.movFeatureGeo[oneType] = {
			panelWidth: onePanelWidth,
			panelCp: onePanelCp
		};
	});

};


export default modelMovTextPanel;
