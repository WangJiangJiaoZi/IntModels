

import sharedErrors from "../../../../../SharedErrors/SharedErrors";
import verifyLaneGeo from "../../../Lane/LaneControllers/VerifyLaneGeo/VerifyLaneGeo";

import verifyLgBound from "./Verificators/VerifyLgBound";

/********************************************************************
		Verify laneGG geometry data:
			1. Verify laneGG level data.
			2. Ask lanes to verify themselves.
*********************************************************************/
const verifyLaneGroupGeo = (laneGroupDataToVerify, appId, laneGroupId, appDataToVerify) => {
	const SingleValueError = sharedErrors.SingleValueError;
	//const SingleConflictError = sharedErrors.SingleConflictError;
	//const CompoundConflictError = sharedErrors.CompoundConflictError;
	const modelOwner = "LaneGroup";
	let message;


	/**********************************************************************
						Verify laneGroup level data
	***********************************************************************/
	// ******************* Extract laneGroup level data *******************
	const bound = laneGroupDataToVerify.bound; //"inbound" / "outbound" / "inboundSide" / "outboundSide"


	// ******************* Verify single value *******************
	//verify bound:
	verifyLgBound(bound, laneGroupId, appId);



	// ******************* Verify single conflict *******************
	//none for now...


	/**********************************************************************
						Verify lane level data
	***********************************************************************/
	const lanesDataToVerify = laneGroupDataToVerify.lanes;
	if (lanesDataToVerify.constructor !== Array || lanesDataToVerify.length < 1) {
		message = "wrong data structure of lanes in laneGroup " + laneGroupId +
				"in approach " + appId + ". It should be an array of at least one lane (object).";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	const ifNew = false;
	lanesDataToVerify.forEach((oneLaneDataToVerify, oneLaneIndex) => {
		verifyLaneGeo(oneLaneDataToVerify, oneLaneIndex, bound, appId, ifNew, laneGroupId);
	});



};


export default verifyLaneGroupGeo;
