
import sharedErrors from "../../../../SharedErrors/SharedErrors";


class GetCornerLevelGeo {
	constructor(intModel, getAppLevelGeo) {
		this.intModel = intModel;
		this.getAppLevelGeo = getAppLevelGeo;
	}


	getCornerByAppIndex(appIndex, language = 1) {
		try {
			const curApp = this.getAppLevelGeo.getApproachByAppIndex(appIndex, language);
			const curCorner = curApp.corner;

			return curCorner;
		}
		catch (error) {
			throw error;
		}
	}



	getCornerFeaturesByAppIndex(appIndex, language = 1) {
		try {
			const curApp = this.getAppLevelGeo.getApproachByAppIndex(appIndex, language);
			const curCorner = curApp.corner;

			const curCornerFeatures = {
				cornerType: curCorner.cornerType,
				cornerRadius: curCorner.cornerRadius,
				channelWidth: curCorner.channelWidth,
				cornerInboundWidth: curCorner.cornerInboundWidth,
				cornerOutboundWidth: curCorner.cornerOutboundWidth
			};

			return curCornerFeatures;
		}
		catch (error) {
			throw error;
		}
	}
}

export default GetCornerLevelGeo;
