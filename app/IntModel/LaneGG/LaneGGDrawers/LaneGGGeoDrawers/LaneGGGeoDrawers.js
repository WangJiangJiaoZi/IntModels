
import drawLaneGGStopBar from "./Drawers/DrawLaneGGStopBar";

class LaneGGGeoDrawers {
	constructor(laneGG) {
		this.laneGG = laneGG;
	}


	/************************************************************
		Draw laneGG Geometry:
			1. Would draw laneGG stop bar.
			2. Would ask lane groups to draw themselves.
	*************************************************************/
	drawLaneGGGeo(scene, clickableObjs, type, meterToPix, roadDepth, options) {
		const laneGG = this.laneGG;
		if (options.ifDrawLineAndDiv) {
			const envSetters = laneGG.approach.intersection.intModel.envSetters;
			const roadMarkHeight = envSetters.roadMarkHeight;  //in meters
			const color = envSetters.roadMarkInitColor;

			const roadMarkExtSettings = {depth: roadMarkHeight * meterToPix + roadDepth, bevelEnabled: false};
			const roadMarkMaterial = new laneGG.THREE.MeshLambertMaterial({color: color});

			//************** Draw stop bar ***************
			drawLaneGGStopBar(laneGG, scene, roadMarkExtSettings, roadMarkMaterial);
		}

		//************** Draw lane groups geometry ***************
		const laneGroups = laneGG.laneGroups;

		laneGroups.forEach((oneLaneGroup) => {
			oneLaneGroup.laneGroupDrawers.drawLaneGroupGeo(
				scene, clickableObjs, type,
				meterToPix, roadDepth, options
			);
		});
	}


	drawLaneGGEndConnectP(modelScene, clickableObjects, translate, roadThick) {
		const laneGroups = this.laneGG.laneGroups;
		laneGroups.forEach((oneLaneGroup) => {
			if (oneLaneGroup.bound === "outbound" || oneLaneGroup.bound === "outboundSide") {
				oneLaneGroup.laneGroupDrawers.drawLgConnectPoint(
					modelScene, clickableObjects, translate, roadThick
				);
			}
		});
	}

	undrawLaneGGEndConnectP(modelScene, clickableObjects) {
		const laneGroups = this.laneGG.laneGroups;
		laneGroups.forEach((oneLaneGroup) => {
			if (oneLaneGroup.bound === "outbound" || oneLaneGroup.bound === "outboundSide") {
				oneLaneGroup.laneGroupDrawers.undrawLgConnectPoint(modelScene, clickableObjects);
			}
		});
	}

	drawLaneGGStartConnectP(modelScene, clickableObjects, translate, roadThick) {
		const laneGroups = this.laneGG.laneGroups;
		laneGroups.forEach((oneLaneGroup) => {
			if (oneLaneGroup.bound === "inbound" || oneLaneGroup.bound === "inboundSide") {
				oneLaneGroup.laneGroupDrawers.drawLgConnectPoint(
					modelScene, clickableObjects, translate, roadThick
				);
			}
		});
	}

	undrawLaneGGStartConnectP(modelScene, clickableObjects) {
		const laneGroups = this.laneGG.laneGroups;
		laneGroups.forEach((oneLaneGroup) => {
			if (oneLaneGroup.bound === "inbound" || oneLaneGroup.bound === "inboundSide") {
				oneLaneGroup.laneGroupDrawers.undrawLgConnectPoint(modelScene, clickableObjects);
			}
		});
	}

	drawLaneArrowColor(laneIndex, colorHexCode) {
		//find laneGroup:
		const laneGroup = this.laneGG.laneGroups.find((oneLaneGroup) => {
			const bound = oneLaneGroup.bound;
			let ifFound = false;
			//only inbound main laneGroup has arrows to draw
			if (bound === "inbound") {
				ifFound = true;
			}
			return ifFound;
		});

		//ask laneGroup to draw:
		if (laneGroup) {
			laneGroup.laneGroupDrawers.drawLaneArrowColor(laneIndex, colorHexCode);
		}
		else {
			const message = "Failed to draw lane arrow color. The approach has no inbound main lane.";
			const modelOwner = "laneGG";
			throw {
				message: message,
				modelOwner: modelOwner
			};
		}
	}
}

export default LaneGGGeoDrawers;
