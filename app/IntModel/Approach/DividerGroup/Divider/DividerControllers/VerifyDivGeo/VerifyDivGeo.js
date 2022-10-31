

import sharedErrors from "../../../../../SharedErrors/SharedErrors";
//import initSettings from "../../../../../EnvSetters/InitSettings";

import verifyDivBound from "./Verificators/VerifyDivBound";
import verifyDivType from "./Verificators/VerifyDivType";
import verifyDivColor from "./Verificators/VerifyDivColor";
import verifyDivOffset from "./Verificators/VerifyDivOffset";
import verifyDivSize from "./Verificators/VerifyDivSize";
import verifyDivConflict from "./Verificators/VerifyDivConflict";
/********************************************************************
		Verify divider geometry data:
			1.  Verify divider geometry data.
*********************************************************************/
const verifyDivGeo = (divDataToVerify, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	//const SingleConflictError = sharedErrors.SingleConflictError;
	//const CompoundConflictError = sharedErrors.CompoundConflictError;
	const modelOwner = "Divider";
	let message;

	// ******************* Verify divider data structure ******************
	if (typeof divDataToVerify !== "object") {
		message = "invalid divider geometry data in approach" + appId +
				". It should be an object (dictionary).";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	// ******************* Extract divider level data *******************
	let divBound, type, color, offset, storageLength, storageSlipLength;
	let storageWidth, startWidth, capRadius;

	divBound = divDataToVerify.dividerType; //1 for "inbound" / 2 for "outbound" / 3 for "center"
	type = divDataToVerify.type; //1 for white dash, 2 for white solid, 3.......
	color = divDataToVerify.color;
	offset = divDataToVerify.offset; //meters
	storageLength = divDataToVerify.storageLength; //meters
	storageSlipLength = divDataToVerify.storageSlipLength; //meters
	storageWidth = divDataToVerify.storageWidth; //meters, only for center divider
	startWidth = divDataToVerify.startWidth; //meters
	capRadius = divDataToVerify.capRadius; //meters


	// ******************* Verify single values *******************
	//verify dividerType (1 for "inbound" / 2 for "outbound" / 3 for "center"):
	verifyDivBound(divBound, appId, language);

	//verify type:
	//"div" is divider at right hand
	//null: none
	//1: dash line
	//2: single line
	//3: double line
	//4: left line and right dash line
	//5: left dash line and right line
	//6: wall (usually for median or hov)
	//7: sticks
	//8: grass
	//9: shadow
	verifyDivType(type, appId, language);

	//verify color:
	verifyDivColor(color, appId, language);

	//verify offset:
	verifyDivOffset(offset, appId, language);

	//verify meters:
	const meterValuesGroup = {
		startWidth: startWidth,
	};
	if (type === 8 || type === 9) {
		//verify capRadius for non-linear divider:
		meterValuesGroup.capRadius = capRadius;

		//verify storage index for non-linear center divider:
		//(inbound or outbound divider does not consider storage...)
		if (divBound === 3) {
			meterValuesGroup.storageLength = storageLength;
			meterValuesGroup.storageSlipLength = storageSlipLength;
			meterValuesGroup.storageWidth = storageWidth;
			meterValuesGroup.capRadius = capRadius;
		}
	}

	for (let key in meterValuesGroup) {
		const oneValue = meterValuesGroup[key];
		verifyDivSize(oneValue, key, appId, language);
	}

	// ******************* Verify single conflict values *******************
	// verify storageLength + storageSlipLength for center divider
	verifyDivConflict(divBound, storageLength, storageSlipLength, appId, language);

	// ******************* Verify compound conflict values *******************
	//none for now...


};


export default verifyDivGeo;
