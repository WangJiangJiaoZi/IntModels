

import sharedErrors from "../../../SharedErrors/SharedErrors";
import verifyLaneGroupGeo from "../../LaneGroup/LaneGroupControllers/LaneGroupGeoController/VerifyLaneGroupGeo/VerifyLaneGroupGeo";
/********************************************************************
		Verify laneGG geometry data:
			1. Verify laneGG level data.
			2. Ask laneGroups to verify themselves.
*********************************************************************/

const verifyLaneGGGeo = (laneGGDataToVerify, appId, appDataToVerify) => {

	const SingleValueError = sharedErrors.SingleValueError;
	const SingleConflictError = sharedErrors.SingleConflictError;
	//const CompoundConflictError = sharedErrors.CompoundConflictError;
	const modelOwner = "LaneGG";
	let message;

	// *************** Verify laneGG data structure *****************
	if (!laneGGDataToVerify.constructor || laneGGDataToVerify.constructor !== Array) {
		message = "no laneGG data or wrong data format (should be an array) in approach " + appId;
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	if (laneGGDataToVerify.length === 0) {
		message = "there should be at least one laneGroup data in laneGG geometry data in approach" +
			appId + ".";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	// *************** Ask laneGroups to verify themselves *****************
	laneGGDataToVerify.forEach((oneLaneGroupDataToVerify, laneGroupId) => {
		//verify laneGroup data structure:
		if (!oneLaneGroupDataToVerify.constructor || oneLaneGroupDataToVerify.constructor !== Object) {
			message = "wrong data type of laneGroup " + laneGroupId +
					" geometry data in approach " + appId;
			const oneValueError = new SingleValueError(modelOwner, message);
			throw oneValueError;
		}

		verifyLaneGroupGeo(oneLaneGroupDataToVerify, appId, laneGroupId, appDataToVerify);
	});


	// *************** Verify laneGG single conflict *****************
	const ibLgIndex = []; //should be continuous if not empty
	const obLgIndex = [];	//should be continous and bigger than ibLgIndex if not empty
	const ibLgSignalIndex = [];  //should have no repeated value
	laneGGDataToVerify.forEach((oneLaneGroupDataToVerify, laneGroupId) => {
		const bound = oneLaneGroupDataToVerify.bound;
		if (bound === "inbound" || bound === "inboundSide") {
			ibLgIndex.push(laneGroupId);
			const signalGroupId = oneLaneGroupDataToVerify.signalGroupId;
			ibLgSignalIndex.push(signalGroupId);
		}
		else {
			obLgIndex.push(laneGroupId);
		}
	});

	let preIndex = -1;
	ibLgIndex.forEach((oneIbIndex) => {
		if (oneIbIndex !== preIndex + 1) {
			message = "wrong laneGroup order in laneGG geometry data in approach " +
					appId + ". The laneGG should be an array starts from inbound laneGroups, " +
					"to inboundSide one, to outbound ones, to outboundSide one.";
			const oneConflictError = new SingleConflictError(modelOwner, message);
			throw oneConflictError;
		}
		preIndex++;
	});

	obLgIndex.forEach((oneObIndex) => {
		if (oneObIndex !== preIndex + 1) {
			message = "wrong laneGroup order in laneGG geometry data in approach " +
					appId + ". The laneGG should be an array starts from inbound laneGroups, " +
					"to inboundSide one, to outbound ones, to outboundSide one.";
			const oneConflictError = new SingleConflictError(modelOwner, message);
			throw oneConflictError;
		}
		preIndex++;
	});

	/*
	if (new Set(ibLgSignalIndex).size !== ibLgSignalIndex.length) {
		message = "wrong signalGroupId in laneGG geometry data in approach " +
				appId + ". All signalGroupId in one approach should be unique.";
		const oneConflictError = new SingleConflictError(modelOwner, message);
		throw oneConflictError;
	}
	*/

};


export default verifyLaneGGGeo;
