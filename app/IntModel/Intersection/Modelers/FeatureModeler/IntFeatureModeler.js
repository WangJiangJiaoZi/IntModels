import modelCenterPanelDiameter from "./Modelers/ModelCenterPanelDiameter";
import modelMovsTextGap from "./Modelers/ModelMovsTextGap";


class IntFeatureModeler {
	constructor(intersection) {
		this.intersection = intersection;

		this.modelCenterPanelDiameter = modelCenterPanelDiameter;
		this.modelMovsTextGap = modelMovsTextGap;
	}


	/********************************************************************
		Would:
			1.Model int features.

		Would update:
			Nothing
	*********************************************************************/
	modelIntFeature(intSize, meterToPixel, accuracy) {
		//model intersection level features if any:
		this.modelCenterPanelDiameter(this.intersection);

		//model roads' level features:
		//model movements' gaps (modeled at int level since they are the same
		//across the whole intersection)
		this.modelMovsTextGap(this.intersection, intSize, meterToPixel, accuracy);

		const approaches = this.intersection.approaches;
		approaches.forEach((oneApp) => {
			oneApp.appModelers.appFeatureModeler.modelAppFeature(intSize, meterToPixel, accuracy);
		});
	}


	/********************************************************************
		Would:
			1.Model int features in road network.

		Would update:
			Nothing
	*********************************************************************/
	modelIntFeatureForNetwork(accuracy, meterToPixel) {

	}
}


export default IntFeatureModeler;
