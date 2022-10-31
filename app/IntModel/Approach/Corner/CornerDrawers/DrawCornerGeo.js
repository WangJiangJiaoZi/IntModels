

import drawIntCorner from "./CornerGeoDrawers/DrawIntCorner";
import drawIntCornerIsland from "./CornerGeoDrawers/DrawIntCornerIsland";
/***********************************************************************
	Draw Corner Geometry:
		1. Would draw corner according to type ("int" or "ra");
		2. Would draw corner island if necessary according to type.
		3. Would draw corner crosswalk if necessary according to type.
************************************************************************/

const drawCornerGeo = (corner, scene, roadExtSettings, roadMaterial, clickableObjs, type, meterToPix) => {

	//******************** Draw int corner **********************
	if (type === "int") {
		//******************** Draw int corner itself **********************
		drawIntCorner(corner, scene, roadExtSettings, roadMaterial, clickableObjs);


		//************** Draw int corner island if necessary ***************
		if (corner.cornerType > 2) {
			const islandColor = corner.approach.intersection.cornerIslandColor;
			const islandMaterial = new corner.THREE.MeshLambertMaterial({color: islandColor});
			const envSetters = corner.approach.intersection.intModel.envSetters;
			let islandHeight = envSetters.cornerIslandHeight;  //in meters

			const islandExtSettings = {depth: islandHeight * meterToPix + roadExtSettings.depth, bevelEnabled: false};

			drawIntCornerIsland(corner, scene, islandMaterial, islandExtSettings);
		}

		//************** Draw int corner crosswalk if necessary ***************


	}
	//******************** Draw roundabout corner **********************
	else {
		//TBD
	}

};


export default drawCornerGeo;
