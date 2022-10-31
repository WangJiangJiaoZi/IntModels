

class UpdateLaneGGLevelGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;
		this.modelGeo = modelGeo;
		this.drawGeo = drawGeo;
		this.getGeo = getGeo;

		this.modelIntGeo = modelGeo.modelIntGeo;
		this.redrawIntGeo = drawGeo.redrawIntGeo;

		this.updateLaneFeature = this.updateLaneFeature.bind(this);
	}

	addLaneGroup(curAppIndex, bound, ifReDraw, language = 1) {

	}

	removeLaneGroup(curAppIndex, bound, ifReDraw, language = 1) {

	}

	addLane(curAppIndex, bound, ifReDraw, language = 1) {
		//Get laneGG by curAppIndex:
		const getApproachByAppIndex = this.getGeo.getAppLevelGeo.getApproachByAppIndex;
		const curApp = getApproachByAppIndex(curAppIndex, language);
		const curLaneGG = curApp.laneGG;

		//Would add a lane with empty laneMov:
		let defaultWhitleLaneLength = 0;
		let defaultLaneLength = -1;  //unlimited meters
		if (bound === "inbound") {
			defaultWhitleLaneLength = (curApp.inboundStorageLength > 0) ? (curApp.inboundStorageLength / 2) : 20;  //meters
			defaultLaneLength = (curApp.inboundStorageLength > 0) ? (curApp.inboundStorageLength) : -1; //meters
		}
		else if (bound === "outbound") {
			defaultLaneLength = (curApp.outboundStorageLength > 0) ? (curApp.outboundStorageLength) : -1;  //meters
		}
		const laneGeoToAdd = {
			laneId: null,
			laneMov: (bound === "inbound" || bound === "outbound") ? [] : null, //to which lane in which approach: "appId-laneId"
			whiteLinelength: defaultWhitleLaneLength,
			laneLength: defaultLaneLength,
			laneWidth: 3.5, //meters
			laneSpeedLimit: 30, //km/hr
			laneText: [],
			waitingLength: 0, //meters
			//signalGroupId: 4,
			laneLineColor: "#FFFFFF",
		};

		//Ask the laneGG to add lane:
		curLaneGG.laneGGControllers.laneGGGeoController.updateLGGGeo.addLane(
			curLaneGG, bound, laneGeoToAdd, language
		);

		//re-model:
		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);

		//redraw:
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	removeLane(curAppIndex, bound, laneIndex, ifReDraw, language = 1) {
		//Get laneGG by curAppIndex:
		const getApproachByAppIndex = this.getGeo.getAppLevelGeo.getApproachByAppIndex;
		const curApp = getApproachByAppIndex(curAppIndex, language);
		const curLaneGG = curApp.laneGG;


		//Ask the laneGG to remove lane by laneIndex and bound:
		curLaneGG.laneGGControllers.laneGGGeoController.updateLGGGeo.removeLane(
			curLaneGG, bound, laneIndex, language
		);

		//re-model:
		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);

		//redraw:
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}


	updateLaneFeature(curAppIndex, bound, laneIndex, featureName, featureValue, ifReDraw, language = 1) {

		//Get laneGG by curAppIndex:
		const getApproachByAppIndex = this.getGeo.getAppLevelGeo.getApproachByAppIndex;
		const curApp = getApproachByAppIndex(curAppIndex, language);
		const curLaneGG = curApp.laneGG;

		//Ask the laneGG to update the feature:
		curLaneGG.laneGGControllers.laneGGGeoController.updateLGGGeo.updateLaneFeature(
			curLaneGG, bound, laneIndex, featureName, featureValue, language
		);

		//re-model:
		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);

		//redraw:
		if (ifReDraw) {
			this.redrawIntGeo();
		}

	}
}

export default UpdateLaneGGLevelGeo;
