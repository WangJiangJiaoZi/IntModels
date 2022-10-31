

import sharedErrors from "../../../../SharedErrors/SharedErrors";
import verifyAppGeo from "../../../../Approach/AppControllers/AppGeoController/VerifyAppGeo/VerifyAppGeo";

import verifyIntId from "./Verificators/VerifyIntId";
import verifyLocation from "./Verificators/VerifyLocation";
import verifyIntClass from "./Verificators/VerifyIntClass";
import verifyColor from "./Verificators/VerifyColor";

/********************************************************************
		Verify geometry data for intersection model (class):
			1. Verify intersection level data.
			2. Ask approach to verify approach level data.
*********************************************************************/
const verifyGeo = (geoDataToVerify, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const SingleConflictError = sharedErrors.SingleConflictError;
	const CompoundConflictError = sharedErrors.CompoundConflictError;
	const modelOwner = "Intersection";
	let message;

	// ******************* Verify intersection data structure ******************
	if (typeof geoDataToVerify !== "object") {
		message = "invalid intersection geometry data, which should be an object (dictionary).";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	// ******************* Extract intersection level data *******************
	let intId, location, intClass, controlType, roadColor, cornerIslandColor;
	let crossWalkColor, textColor, backgroundColor, approaches;


	intId = geoDataToVerify.intId;
	location = geoDataToVerify.location;
	intClass = geoDataToVerify.class;
	roadColor = geoDataToVerify.roadColor;
	cornerIslandColor = geoDataToVerify.cornerIslandColor;
	crossWalkColor = geoDataToVerify.crossWalkColor;
	textColor = geoDataToVerify.textColor;
	backgroundColor = geoDataToVerify.backgroundColor;

	approaches = geoDataToVerify.approaches;

	// ******************* 1.1 Verify single value *******************
	//verify intId:
	verifyIntId(intId);

	//verify location:
	verifyLocation(location);

	//verify intClass:
	verifyIntClass(intClass);

	//verify roadColor, cornerIslandColor, crossWalkColor, textColor and backgroundColor:
	const colors = {
		roadColor: roadColor,
		cornerIslandColor: cornerIslandColor,
		crossWalkColor: crossWalkColor,
		textColor: textColor,
		backgroundColor: backgroundColor
	};
	for (let key in colors) {
		const oneColor = colors[key];
		verifyColor(oneColor, key);
	}


	// ******************* 1.2 Verify single conflict *******************
	//intersection has no single conflict...


	// ******************* 1.3 Verify compound conflict *******************
	//intersection has no compound conflict...


	// ******************* 2. Ask approaches to verify themselves *******************
	//approaches should be an array of at least 3 elements:
	if (!Array.isArray(approaches) || approaches.length < 3) {
		message = "invalid approaches data, which should be an array of at least 3 elements.";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}


	approaches.forEach((oneApproachDataToVerify, index) => {
		verifyAppGeo(oneApproachDataToVerify, index, approaches, language);
	});
};


export default verifyGeo;
