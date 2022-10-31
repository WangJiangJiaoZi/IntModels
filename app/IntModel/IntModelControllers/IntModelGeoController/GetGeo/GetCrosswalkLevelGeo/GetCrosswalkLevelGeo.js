

import sharedErrors from "../../../../SharedErrors/SharedErrors";


class GetCrosswalkLevelGeo {
	constructor(intModel, getAppLevelGeo) {
		this.intModel = intModel;
		this.getAppLevelGeo = getAppLevelGeo;
	}

	getCrosswalkByAppIndex(appIndex, language = 1) {
		const curApp = this.getAppLevelGeo.getApproachByAppIndex(appIndex, language);
		const crosswalkToGet = curApp.crosswalk;

		return crosswalkToGet;
	}

	getCrosswalkFeaturesByAppIndex(appIndex, language = 1) {
		//try to get crosswalk by appIndex, (would throw error if failed):
		const curCrosswalk = this.getCrosswalkByAppIndex(appIndex, language);

		//get feature:
		const features = {
			ifCrosswalk: curCrosswalk.ifCrosswalk,
			crosswalkAngle: curCrosswalk.crosswalkAngle,
			crosswalkOffset: curCrosswalk.crosswalkOffset,
			crossswalkWidth: curCrosswalk.crossswalkWidth,
			crosswalkBuffer: curCrosswalk.crosswalkBuffer,
			crosswalkHeight: curCrosswalk.crosswalkHeight,
			crosswalkGap: curCrosswalk.crosswalkGap,
			ifIslandEnd: curCrosswalk.crosswalkGeo.ifIslandEnd
		};

		return features;
	}
}


export default GetCrosswalkLevelGeo;
