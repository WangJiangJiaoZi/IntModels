

import ImpExportIntFeature from "./ImpExportIntFeature/ImpExportIntFeature";
import UpdateIntFeature from "./UpdateIntFeature/UpdateIntFeature";
import VerifyIntFeature from "./VerifyIntFeature/VerifyIntFeature";



class IntFeatureController {
	constructor(intersection) {
		this.intersection = intersection;

		this.impExportIntFeature = new ImpExportIntFeature(this, intersection);
		this.updateIntFeature = new UpdateIntFeature(this, intersection);
		this.verifyIntFeature = new VerifyIntFeature(intersection);
	}


}


export default IntFeatureController;
