
import ImpExportFeature from "./ImpExportFeature/ImpExportFeature";
import ModelFeature from "./ModelFeature/ModelFeature";
import DrawFeature from "./DrawFeature/DrawFeature";
import UpdateFeature from "./UpdateFeature/UpdateFeature";

import sharedErrors from "../../SharedErrors/SharedErrors";


class IntModelFeatureController {
	constructor(intModel, featureControllerErHints) {
		this.intModel = intModel;
		this.featureControllerErHints = featureControllerErHints;

		this.sharedErrors = sharedErrors;

		this.impExportFeature = new ImpExportFeature(
									intModel, featureControllerErHints.impExportFeature,
									sharedErrors
								);
		this.modelFeature = new ModelFeature(
								intModel, featureControllerErHints.modelFeature,
								sharedErrors
							);
		this.drawFeature = new DrawFeature(
								intModel, featureControllerErHints.drawFeature,
								sharedErrors
							);

		this.updateFeature = new UpdateFeature(
								intModel, featureControllerErHints.updateFeature,
								sharedErrors
							);
	}
}


export default IntModelFeatureController;
