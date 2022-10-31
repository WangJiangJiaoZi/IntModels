
import sharedErrors from "../../../../SharedErrors/SharedErrors";
//import initSettings from "../../../../EnvSetters/InitSettings";
import verifyCornerGeo from "../../../Corner/CornerControllers/VerifyCornerGeo/VerifyCornerGeo";
import verifyCrosswalkGeo from "../../../Crosswalk/CrosswalkControllers/VerifyCrosswalkGeo/VerifyCrosswalkGeo";
import verifyDivGroupGeo from "../../../DividerGroup/DivGroupControllers/Controllers/VerifyDivGroupGeo";
import verifylaneGGGeo from "../../../../LaneGG/LaneGGControllers/LaneGGGeoController/VerifyLaneGGGeo";

import verifyAppAngle from "./Verificators/VerifyAppAngle";
import verifyAppFloat from "./Verificators/VerifyAppFloat";
import verifyAppInteger from "./Verificators/VerifyAppInteger";
import verifyAppStorageConflict from "./Verificators/VerifyAppStorageConflict";
import verifyAppAngleConflicts from "./Verificators/VerifyAppAngleConflicts";
/********************************************************************
		Verify approach geometry data:
			1. Verify approach level data.
			2. Ask corner to verify its geometry data.
			3. Ask crosswalk to verify its geometry data.
			4. Ask dividerGroup to verify its geometry data.
			5. Ask text to verify its geometry data.
			6. Ask laneGG to verify its geometry data.
*********************************************************************/
const verifyAppGeo = (appDataToVerify, appId, allAppsDataToVerify, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	//const SingleConflictError = sharedErrors.SingleConflictError;
	//const CompoundConflictError = sharedErrors.CompoundConflictError;
	const modelOwner = "Approach";
	let message;

	// ******************* Verify approach data structure ******************
	if (!appDataToVerify.constructor || appDataToVerify.constructor !== Object) {
		message = "invalid approach " + appId + "geometry data, which should be an object (dictionary).";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}


	// ******************* Extract intersection level data *******************
	let appAngle, inboundStorageLength, inboundSlipLength, inboundStorageWidth;
	let outboundStorageLength, outboundSlipLength, outboundStorageWidth;
	let appSpeedLimit, appRoadClass, appSlope;


	appAngle = appDataToVerify.appAngle;
	inboundStorageLength = appDataToVerify.inboundStorageLength;
	inboundSlipLength = appDataToVerify.inboundSlipLength;
	inboundStorageWidth = appDataToVerify.inboundStorageWidth;
	outboundStorageLength = appDataToVerify.outboundStorageLength;
	outboundSlipLength = appDataToVerify.outboundSlipLength;
	outboundStorageWidth = appDataToVerify.outboundStorageWidth;
	appSpeedLimit = appDataToVerify.appSpeedLimit;
	appRoadClass = appDataToVerify.appRoadClass;
	appSlope = appDataToVerify.slope;
	//appName = appDataToVerify.appName;


	// ******************* Verify single values *******************
	//verify appAngle:
	verifyAppAngle(appAngle, appId);

	//verify inboudnStorageLength, inboundSlipLength, inboundStorageWidth,
	//outboundStorageLength, outboundSlipLength, outboundStorageWidth,
	const floatValues = {
		inboundStorageLength: inboundStorageLength,
		inboundSlipLength: inboundSlipLength,
		inboundStorageWidth: inboundStorageWidth,
		outboundStorageLength: outboundStorageLength,
		outboundSlipLength: outboundSlipLength,
		outboundStorageWidth: outboundStorageWidth,
	};
	for (let floatName in floatValues) {
		const floatValue = floatValues[floatName];
		verifyAppFloat(floatValue, floatName, appId);
	}

	//verify appSpeedLimit and appRoadClass:
	const integerValues = {
		appSpeedLimit: appSpeedLimit,
		appRoadClass: appRoadClass,
		//slope: appSlope
	};
	for (let intergerName in integerValues) {
		const integerValue = integerValues[intergerName];
		verifyAppInteger(integerValue, intergerName, appId);
	}

	// ******************* Verify single conflict *******************
	//verify inboudnStorageLength + inboundSlipLength:
	verifyAppStorageConflict(inboundStorageLength, inboundSlipLength, appId);

	//verify outboundStorageLength + outboundSlipLength:
	verifyAppStorageConflict(outboundStorageLength, outboundSlipLength, appId);


	// ******************* Ask corner to verify itself *******************
	// (corner and approach compound conflict would be verified at corner level)
	const cornerDataToVerify = appDataToVerify.corner;
	verifyCornerGeo(cornerDataToVerify, appId, appDataToVerify, language);


	// ******************* Ask crosswalk to verify itself *******************
	const crosswalkDataToVerify = appDataToVerify.crosswalk;
	verifyCrosswalkGeo(crosswalkDataToVerify, appId, language);


	// ******************* Ask dividerGroup to verify itself *******************
	const divGroupDataToVerify = appDataToVerify.dividerGroup;
	verifyDivGroupGeo(divGroupDataToVerify, appId, language, language);


	// ******************* Ask laneGG to verify itself *******************
	const laneGGDataToVerify = appDataToVerify.laneGG;
	verifylaneGGGeo(laneGGDataToVerify, appId, appDataToVerify, language);



	// ******************* Verify compound conflict *******************
	//verify appAngles:
	const allAngles = [];
	allAppsDataToVerify.forEach((oneAppDataToVerify, index) => {
		const oneAngle = oneAppDataToVerify.appAngle;
		allAngles.push(oneAngle);
	});
	verifyAppAngleConflicts(allAngles, language);


};


export default verifyAppGeo;
