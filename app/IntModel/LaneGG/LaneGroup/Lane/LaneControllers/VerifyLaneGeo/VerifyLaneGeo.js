
import sharedErrors from "../../../../../SharedErrors/SharedErrors";

import verifyLaneId from "./Verificators/VerifyLaneId";
import verifyLaneMov from "./Verificators/VerifyLaneMov";
import verifyLaneLength from "./Verificators/VerifyLaneLength";
import verifyLaneWidth from "./Verificators/VerifyLaneWidth";
import verifyLaneSpeedLimit from "./Verificators/VerifyLaneSpeedLimit";
import verifyLaneText from "./Verificators/VerifyLaneText";
import verifyLaneConflict from "./Verificators/VerifyLaneConflict";

import verifyLaneWaitingLength from "./Verificators/VerifyLaneWaitingLength";
import verifyLaneLineColor from "./Verificators/VerifyLaneLineColor";
import verifyLaneSigalGroupId from "./Verificators/VerifyLaneSigalGroupId";
/********************************************************************
		Verify lane geometry data:
			1. Verify lane level data.
*********************************************************************/
const verifyLaneGeo = (laneDataToVerify, laneIndex, bound, appId, laneGroupId, ifNew = false, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const SingleConflictError = sharedErrors.SingleConflictError;
	const CompoundConflictError = sharedErrors.CompoundConflictError;
	const modelOwner = "Lane";
	let message;

	// ******************* Extract lane level data *******************
	const laneId = laneDataToVerify.laneId;
	const laneMov = laneDataToVerify.laneMov; //to which lane in which approach: "appId-laneId"
	const whiteLinelength = laneDataToVerify.whiteLinelength; //meters, -1 for unlimited
	const laneLength = laneDataToVerify.laneLength; //meters, -1 for unlimited
	const laneWidth = laneDataToVerify.laneWidth; //meters
	const laneSpeedLimit = laneDataToVerify.laneSpeedLimit; //km/hr
	const laneText = laneDataToVerify.laneText;

	const waitingLength = laneDataToVerify.waitingLength;
	const laneLineColor = laneDataToVerify.laneLineColor;
	//const signalGroupId = laneDataToVerify.signalGroupId;

	// ******************* Verify single values *******************
	//verify laneId:
	if (!ifNew) {
		//verifyLaneId(laneId, laneIndex, laneGroupId, appId, language);
	}

	//verify laneMov:
	verifyLaneMov(laneMov, bound, laneIndex, laneGroupId, appId, language);


	//verify waitingLength:
	verifyLaneWaitingLength(waitingLength, laneGroupId, appId, language);

	//verify laneLineColor:
	verifyLaneLineColor(laneLineColor, appId, laneGroupId, language);

	//verify signalGroupId and bound:
	//verifyLaneSigalGroupId(signalGroupId, bound, appId, laneGroupId);



	//verify whiteLinelength, laneLength:
	const lengthValues = {
		whiteLinelength: whiteLinelength,
		laneLength: laneLength
	};
	for (let lengthName in lengthValues) {
		const lengthValue = lengthValues[lengthName];
		verifyLaneLength(lengthValue, lengthName, laneIndex, laneGroupId, appId, language);
	}

	//verify laneWidth:
	verifyLaneWidth(laneWidth, laneIndex, laneGroupId, appId, language);

	//verify laneSpeedLimit:
	verifyLaneSpeedLimit(laneSpeedLimit, laneIndex, laneGroupId, appId, language);


	//verify laneText, which should be either an array of strings:
	//verifyLaneText(laneText, laneIndex, laneGroupId, appId, language);

	// ******************* Verify single conflict *******************
	//verify whiteLinelength and laneLength:
	//whiteLinelength should be smaller than laneLength when laneLength is not -1.
	verifyLaneConflict(laneLength, whiteLinelength, laneIndex, laneGroupId, appId, language);
};


export default verifyLaneGeo;
