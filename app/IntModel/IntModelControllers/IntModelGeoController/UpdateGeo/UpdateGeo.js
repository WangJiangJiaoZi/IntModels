
import UpdateModelLevelGeo from "./UpdateModelLevelGeo";
import UpdateIntLevelGeo from "./UpdateIntLevelGeo";
import UpdateAppLevelGeo from "./UpdateAppLevelGeo";
import UpdateCornerLevelGeo from "./UpdateCornerLevelGeo";
import UpdateDivGroupLevelGeo from "./UpdateDivGroupLevelGeo";
import UpdateCrosswalkLevelGeo from "./UpdateCrosswalkLevelGeo";
import UpdateTextLevelGeo from "./UpdateTextLevelGeo";
import UpdateLaneGGLevelGeo from "./UpdateLaneGGLevelGeo";

class UpdateGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;

		this.updateModelLevelGeo = new UpdateModelLevelGeo(intModel, modelGeo, drawGeo, getGeo);
		this.updateIntLevelGeo = new UpdateIntLevelGeo(intModel, modelGeo, drawGeo, getGeo);

		this.updateAppLevelGeo = new UpdateAppLevelGeo(intModel, modelGeo, drawGeo, getGeo);
		this.updateCornerLevelGeo = new UpdateCornerLevelGeo(intModel, modelGeo, drawGeo, getGeo);
		this.updateDivGroupLevelGeo = new UpdateDivGroupLevelGeo(intModel, modelGeo, drawGeo, getGeo);
		this.updateCrosswalkLevelGeo = new UpdateCrosswalkLevelGeo(intModel, modelGeo, drawGeo, getGeo);
		this.updateTextLevelGeo = new UpdateTextLevelGeo(intModel, modelGeo, drawGeo, getGeo);

		this.updateLaneGGLevelGeo = new UpdateLaneGGLevelGeo(intModel, modelGeo, drawGeo, getGeo);
	}

}


export default UpdateGeo;
