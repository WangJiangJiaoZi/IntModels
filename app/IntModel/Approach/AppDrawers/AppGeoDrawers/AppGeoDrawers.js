
import drawApproach from "./Drawers/DrawApproach";


class AppGeoDrawers {
	constructor(approach) {
		this.approach = approach;
	}


	/************************************************************
		Draw Approach Geometry:
			1. Would draw approach itself.
			2. Would ask corner to draw itself.
			3. Would ask crosswalk to draw itself.
			4. Would ask divGroup to draw ifself.
			5. Would ask laneGG to draw itself.
			6. Would ask text to draw itself.
	*************************************************************/
	drawAppGeo(scene, roadExtSettings, roadMaterial, clickableObjs, type, meterToPix, options) {
		const approach = this.approach;
		//******************** Draw approach **********************
		drawApproach(approach, scene, roadExtSettings, roadMaterial);

		//**** Draw corner (& corner crosswalk if necessary) ******
		const corner = approach.corner;
		corner.cornerDrawers.drawCornerGeo(
			corner, scene, roadExtSettings, roadMaterial,
			clickableObjs, type, meterToPix
		);


		const roadDepth = roadExtSettings.depth;  //in meters
		//********************** Draw crosswalk if necessary **********************
		if (options.ifDrawCross) {
			const crosswalk = approach.crosswalk;
			crosswalk.crosswalkDrawers.drawCrosswalkGeo(
				crosswalk, scene, roadDepth,
				clickableObjs, meterToPix
			);
		}

		//********************** Draw laneGG **********************
		const laneGG = approach.laneGG;
		laneGG.laneGGDrawers.drawLaneGGGeo(
			scene, clickableObjs,
			type, meterToPix, roadDepth, options
		);


		//********************** Draw divGroup if necessary **********************
		if (options.ifDrawLineAndDiv) {
			const dividerGroup = approach.dividerGroup;
			dividerGroup.divGroupDrawers.drawDivGroupGeo(
				dividerGroup, scene, clickableObjs,
				type, meterToPix, roadDepth, options
			);
		}


		//********************** Draw text **********************
		if (options.ifDrawText) {
			const text = approach.text;
			text.textDrawers.drawText(
				scene, clickableObjs
			);
		}
	}

	drawAppRoadName(scene, clickableObjects) {
		const text = this.approach.text;
		text.textDrawers.drawTextRoadName(scene, clickableObjects);
	}

	undrawAppRoadName(scene, clickableObjects) {
		const text = this.approach.text;
		text.textDrawers.undrawTextRdName(scene, clickableObjects);
	}

	drawAppStartConnectP(modelScene, clickableObjects, translate, meterToPix, roadThick) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.drawLaneGGStartConnectP(
			modelScene, clickableObjects, translate, roadThick
		);

		const divGroup = this.approach.dividerGroup;
		divGroup.divGroupDrawers.drawDivGroupStartConnectP(
			modelScene, clickableObjects, translate, meterToPix, roadThick
		);
	}

	undrawAppStartConnectP(modelScene, clickableObjects) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.undrawLaneGGStartConnectP(modelScene, clickableObjects);

		const divGroup = this.approach.dividerGroup;
		divGroup.divGroupDrawers.undrawDivGroupStartConnectP(
			modelScene, clickableObjects
		);
	}

	drawAppEndConnectP(modelScene, clickableObjects, translate, meterToPix, roadThick) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.drawLaneGGEndConnectP(
			modelScene, clickableObjects, translate, roadThick
		);

		const divGroup = this.approach.dividerGroup;
		divGroup.divGroupDrawers.drawDivGroupEndConnectP(
			modelScene, clickableObjects, translate, meterToPix, roadThick
		);
	}

	undrawAppEndConnectP(modelScene, clickableObjects) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.undrawLaneGGEndConnectP(modelScene, clickableObjects);

		const divGroup = this.approach.dividerGroup;
		divGroup.divGroupDrawers.undrawDivGroupEndConnectP(
			modelScene, clickableObjects
		);
	}

	drawLaneArrowColor(laneIndex, colorHexCode) {
		//ask laneGG to draw:
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.drawLaneArrowColor(laneIndex, colorHexCode);

	}
}


export default AppGeoDrawers;

