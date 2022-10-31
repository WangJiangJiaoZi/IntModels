

import drawCrosswalk from "./CrosswalkGeoDrawers/DrawCrosswalk";

/***********************************************************************
	Draw Crosswalk Geometry:
		1. Would draw crosswalk
		(2.Would draw crosswalk safe island if necessary...TBD)
************************************************************************/

const drawCrosswalkGeo = (crosswalk, scene, roadHeight, clickableObjs, meterToPix) => {

	const ifCrosswalk = crosswalk.ifCrosswalk;

	if (ifCrosswalk) {
		//******************** Draw crosswalk **********************
		const envSetters = crosswalk.approach.intersection.intModel.envSetters;
		const crosswalkHeight = envSetters.roadMarkHeight;  //in meters

		const crosswalkExtSettings = {depth: crosswalkHeight * meterToPix + roadHeight, bevelEnabled: false};
		const crosswalkColor = crosswalk.approach.intersection.crossWalkColor;
		const crosswalkMaterial = new crosswalk.THREE.MeshLambertMaterial({color: crosswalkColor});

		drawCrosswalk(crosswalk, scene, clickableObjs, crosswalkExtSettings, crosswalkMaterial);


		//TBD:
		//************ Draw crosswalk safe island if necessary***********
		//drawCrosswalkIsland(...)
	}


};


export default drawCrosswalkGeo;
