
import UpdateIntLevelFeature from "./Updators/UpdateIntLevelFeature";
import UpdateMovLevelFeature from "./Updators/UpdateMovLevelFeature";

class UpdateFeature {
	constructor(intModel, updateFeatureErHints, sharedErrors) {

		this.updateIntLevelFeature = new UpdateIntLevelFeature(
										intModel, updateFeatureErHints.int,
										sharedErrors
									);

		this.updateMovLevelFeature = new UpdateMovLevelFeature(
										intModel, updateFeatureErHints.mov,
										sharedErrors
									);
	}
}

export default UpdateFeature;
