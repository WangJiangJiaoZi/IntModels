
import sharedErrors from "../../../../SharedErrors/SharedErrors";


class GetDividerLevelGeo {
	constructor() {

	}

	getDivFeatures(divider, language = 1) {
		try {
			const features = {};
			features.divColor = divider.color;
			features.divOffset = divider.offset;
			features.divWidth = divider.startWidth;
			features.divCapRadius = divider.capRadius;
			features.storageLen = divider.storageLength;
			features.sotrageWidth = divider.storageWidth;
			features.storageSlipLen = divider.storageSlipLength;

			return features;
		}
		catch (error) {
			throw error;
		}
	}
}

export default GetDividerLevelGeo;
