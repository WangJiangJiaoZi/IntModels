import injectGeo from "./InjectGeo";
import verifyGeo from "../VerifyGeo/VerifyGeo";



const importGeoByJSON = (intModel, nextGeoJSON) => {
	/*
	const geoDataToVerify = JSON.parse(nextGeoJSON);
	intModel.geoVersionId = geoData.geoVersionId;
	intModel.geoData = geoData;

	injectGeo(intModel);
	*/

	const geoDataToVerify = JSON.parse(nextGeoJSON);
	//verify geo data:
	const language = intModel.language;
	verifyGeo(geoDataToVerify, language);
	//if verified:
	//intModel.geoVersionId = nextGeoVersionId;
	const geoData = geoDataToVerify;
	//inject the verified geo data:
	injectGeo(intModel, geoData);

};

export default importGeoByJSON;
