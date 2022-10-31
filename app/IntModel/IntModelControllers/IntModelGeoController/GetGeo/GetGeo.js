
import GetModelLevelGeo from "./GetModelLevelGeo/GetModelLevelGeo";
import GetIntLevelGeo from "./GetIntLevelGeo/GetIntLevelGeo";
import GetAppLevelGeo from "./GetAppLevelGeo/GetAppLevelGeo";
import GetTextLevelGeo from "./GetTextLevelGeo/GetTextLevelGeo";
import GetDivGroupLevelGeo from "./GetDivGroupLevelGeo/GetDivGroupLevelGeo";
import GetCornerLevelGeo from "./GetCornerLevelGeo/GetCornerLevelGeo";
import GetCrosswalkLevelGeo from "./GetCrosswalkLevelGeo/GetCrosswalkLevelGeo";
import GetLaneGGLevelGeo from "./GetLaneGGLevelGeo/GetLaneGGLevelGeo";

class GetGeo {
	constructor(intModel) {
		this.intModel = intModel;

		const getModelLevelGeo = new GetModelLevelGeo(intModel);
		const getIntLevelGeo = new GetIntLevelGeo(intModel);
		const getAppLevelGeo = new GetAppLevelGeo(intModel, getIntLevelGeo);
		const getTextLevelGeo = new GetTextLevelGeo(intModel, getAppLevelGeo);
		const getDivGroupLevelGeo = new GetDivGroupLevelGeo(intModel, getAppLevelGeo);
		const getCornerLevelGeo = new GetCornerLevelGeo(intModel, getAppLevelGeo);
		const getCrosswalkLevelGeo = new GetCrosswalkLevelGeo(intModel, getAppLevelGeo);
		const getLaneGGLevelGeo = new GetLaneGGLevelGeo(intModel, getIntLevelGeo, getAppLevelGeo);

		this.getModelLevelGeo = getModelLevelGeo;
		this.getIntLevelGeo = getIntLevelGeo;
		this.getAppLevelGeo = getAppLevelGeo;
		this.getTextLevelGeo = getTextLevelGeo;
		this.getDivGroupLevelGeo = getDivGroupLevelGeo;
		this.getCornerLevelGeo = getCornerLevelGeo;
		this.getCrosswalkLevelGeo = getCrosswalkLevelGeo;
		this.getLaneGGLevelGeo = getLaneGGLevelGeo;
	}

}

export default GetGeo;
