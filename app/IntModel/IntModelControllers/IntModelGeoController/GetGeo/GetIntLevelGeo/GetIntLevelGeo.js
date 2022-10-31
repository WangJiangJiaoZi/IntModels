
import sharedErrors from "../../../../SharedErrors/SharedErrors";


class GetIntLevelGeo {
	constructor (intModel) {
		this.intModel = intModel;

		this.getIntFeatures = this.getIntFeatures.bind(this);
	}

	getIntFeatures() {
		const intersection = this.intModel.intersection;
		let featureValues = {
			intId: intersection.intId,
			timestamp: intersection.timestamp,
			location: intersection.location,
			class: intersection.class,
			controlType: intersection.controlType,
			roadColor: intersection.roadColor,
			cornerIslandColor: intersection.cornerIslandColor,
			crossWalkColor: intersection.crossWalkColor,
			textColor: intersection.textColor,
			backgroundColor: intersection.backgroundColor,
		};

		return featureValues;
	}

	//get index of approach with at least one inbound (main or side) lane:
	getIbAppsIndex() {
		const ibAppsArray = [];
		const approaches = this.intModel.intersection.approaches;
		approaches.forEach((oneApp) => {
			const oneLaneGG = oneApp.laneGG;
			if (oneLaneGG.laneGGGeo.mainIbLaneGroups.length > 0 || oneLaneGG.laneGGGeo.sideIbLaneGroups.length > 0) {
				ibAppsArray.push(oneApp.appId);
			}
		});

		return ibAppsArray;
	}

	getIbAppsAngles() {
		const ibAppAngles = [];
		const approaches = this.intModel.intersection.approaches;
		approaches.forEach((oneApp) => {
			const oneLaneGG = oneApp.laneGG;
			if (oneLaneGG.laneGGGeo.mainIbLaneGroups.length > 0 || oneLaneGG.laneGGGeo.sideIbLaneGroups.length > 0) {
				ibAppAngles.push(oneApp.appAngle);
			}
		});

		return ibAppAngles;
	}


	getIndexOfAppWzCrosswalk() {
		const indexOfAppWzCrosswalk = [];
		const apps = this.intModel.intersection.approaches;
		apps.forEach((oneApp, onaAppIndex) => {
			if (oneApp.crosswalk.ifCrosswalk) {
				indexOfAppWzCrosswalk.push(onaAppIndex);
			}
		});

		return indexOfAppWzCrosswalk;
	}

}

export default GetIntLevelGeo;