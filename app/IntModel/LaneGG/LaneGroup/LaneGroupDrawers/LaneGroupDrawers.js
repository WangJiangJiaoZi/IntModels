



class LaneGroupDrawers {
	constructor(laneGroup) {
		this.laneGroup = laneGroup;
	}

	/**********************************************************************
		Draw laneGroup geometry by asking lanes to draw themselves.

		Note that side road has nothing to draw.
	***********************************************************************/
	drawLaneGroupGeo(scene, clickableObjs, type, meterToPix, roadDepth, options) {
		const laneGroup = this.laneGroup;
		const bound = laneGroup.bound;

		//need to draw only when it is main laneGroups
		if (bound === "inbound" || bound === "outbound") {
			const lanes = laneGroup.lanes;

			lanes.forEach((oneLane) => {
				oneLane.laneDrawers.drawLaneGeo(
					scene, clickableObjs, type,
					meterToPix, bound, roadDepth, options
				);
			});

		}
	}


	drawLgConnectPoint(modelScene, clickableObjects, translate, roadThick) {
		const lanes = this.laneGroup.lanes;
		lanes.forEach((oneLane) => {
			oneLane.laneDrawers.drawLaneConnectPoint(modelScene, clickableObjects, translate, roadThick);
		});
	}

	undrawLgConnectPoint(modelScene, clickableObjects) {
		const lanes = this.laneGroup.lanes;
		lanes.forEach((oneLane) => {
			oneLane.laneDrawers.undrawLaneConnectPoint(modelScene, clickableObjects);
		});
	}

	drawLaneArrowColor(laneIndex, colorHexCode) {
		//ask lane to draw:
		if (this.laneGroup.lanes.length > laneIndex) {
			const lane = this.laneGroup.lanes[laneIndex];
			lane.laneDrawers.drawLaneArrowColor(colorHexCode);
		}
		else {
			const message = "Failed to draw lane arrow color. The lane index provided is out of range.";
			const modelOwner = "Lane";
			throw {
				message: message,
				modelOwner: modelOwner
			};
		}
	}
}



export default LaneGroupDrawers;
