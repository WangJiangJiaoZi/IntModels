

import sharedErrors from "../../../../SharedErrors/SharedErrors";

import verifyCwIfCrosswalk from "./Verificators/VerifyCwIfCrosswalk";
import verifyCwAngle from "./Verificators/VerifyCwAngle";
import verifyCwOffset from "./Verificators/VerifyCwOffset";
import verifyCwSize from "./Verificators/VerifyCwSize";
/********************************************************************
		Verify crosswalk geometry data:
			1. Verify crosswalk level data.
*********************************************************************/

const verifyCrosswalkGeo = (crosswalkDataToVerify, appId) => {
	const SingleValueError = sharedErrors.SingleValueError;
	//const SingleConflictError = sharedErrors.SingleConflictError;
	//const CompoundConflictError = sharedErrors.CompoundConflictError;
	const modelOwner = "Crosswalk";
	let message;

	// ******************* Verify crosswalk data structure *******************
	if (!crosswalkDataToVerify.constructor || crosswalkDataToVerify.constructor !== Object) {
		message = "no crosswalk data or wrong data fromat in approach " + appId;
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	// ******************* Extract crosswalk level data *******************
	let ifCrosswalk, crosswalkAngle, crosswalkOffset, crosswalkWidth;
	let crosswalkBuffer, crosswalkHeight, crosswalkGap;

	ifCrosswalk = crosswalkDataToVerify.ifCrosswalk;
	crosswalkAngle = crosswalkDataToVerify.crosswalkAngle;
	crosswalkOffset = crosswalkDataToVerify.crosswalkOffset; //meters
	crosswalkWidth = crosswalkDataToVerify.crosswalkWidth; //meters
	crosswalkBuffer = crosswalkDataToVerify.crosswalkBuffer; //meters
	crosswalkHeight = crosswalkDataToVerify.crosswalkHeight; //meters
	crosswalkGap = crosswalkDataToVerify.crosswalkGap; //meters

	// ******************* Verify single values *******************
	//verify ifCrosswalk:
	verifyCwIfCrosswalk(ifCrosswalk, appId);

	//verify crosswalkAngle:
	verifyCwAngle(crosswalkAngle, appId);

	//verify crosswalkOffset:
	verifyCwOffset(crosswalkOffset, appId);

	//verify the meters:
	const meterValues = {
		//crosswalkOffset: crosswalkOffset,
		crosswalkWidth: crosswalkWidth,
		crosswalkBuffer: crosswalkBuffer,
		crosswalkHeight: crosswalkHeight,
		crosswalkGap: crosswalkGap
	};
	for (let sizeName in meterValues) {
		const sizeValue = meterValues[sizeName];
		verifyCwSize(sizeValue, sizeName, appId);
	}

	// ******************* Verify single conflict *******************
	//none for now

	// ******************* Verify compound conflict *******************
	//none for now

};


export default verifyCrosswalkGeo;
