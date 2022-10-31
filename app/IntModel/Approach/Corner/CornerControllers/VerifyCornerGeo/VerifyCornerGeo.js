
import sharedErrors from "../../../../SharedErrors/SharedErrors";

import verifyCornerType from "./Verificators/VerifyCornerType";
import verifyCornerNumber from "./Verificators/VerifyCornerNumber";
import verifyCornerWidthConflicts from "./Verificators/VerifyCornerWidthConflicts";
import verifyCornerAppConflict from "./Verificators/VerifyCornerAppConflict";
/********************************************************************
		Verify corner geometry data:
			1. Verify corner level data.
*********************************************************************/
const verifyCornerGeo = (cornerDataToVerify, appId, appDataToVerify, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const SingleConflictError = sharedErrors.SingleConflictError;
	const CompoundConflictError = sharedErrors.CompoundConflictError;
	const modelOwner = "Corner";
	let message;


	// ******************* Verify corner data structure *******************
	if (!cornerDataToVerify.constructor || cornerDataToVerify.constructor !== Object) {
		if (language === 1) {
			message = "no corner data or wrong data fromat in approach " + appId;
		}
		else {
			message = "道路编号" + appId + "缺少转角几何数据或者其数据格式不正确。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	// ******************* Extract corner level data *******************
	let cornerType, cornerRadius, cornerInboundWidth, cornerOutboundWidth;
	let channelWidth, cornerCrosswalkWidth;

	cornerType = cornerDataToVerify.cornerType; //1 for polyline, 2 for arc, 3 for arc and island
	cornerRadius = cornerDataToVerify.cornerRadius; //meters
	cornerInboundWidth = cornerDataToVerify.cornerInboundWidth; //meters
	cornerOutboundWidth = cornerDataToVerify.cornerOutboundWidth; //meters
	channelWidth = cornerDataToVerify.channelWidth; //meters
	cornerCrosswalkWidth = cornerDataToVerify.cornerCrosswalkWidth;  //meters


	// ******************* Verify single values *******************
	//verify cornerType:
	verifyCornerType(cornerType, appId, language);

	//verify cornerRadius:
	//verify cornerRadius, cornerInboundWidth, cornerOutboundWidth,
	//channelWidth, and cornerCrosswalkWidth:
	const widths = {
		cornerRadius: cornerRadius,
		cornerInboundWidth: cornerInboundWidth,
		cornerOutboundWidth: cornerOutboundWidth,
		channelWidth: channelWidth,
		cornerCrosswalkWidth: cornerCrosswalkWidth
	};

	for (let numberName in widths) {
		const numberValue = widths[numberName];
		verifyCornerNumber(numberValue, numberName, appId, language);
	}

	// ******************* Verify single conflict *******************
	verifyCornerWidthConflicts(
		cornerType, channelWidth, cornerInboundWidth, cornerOutboundWidth, appId, language
	);



	// ******************* Verify compound conflict *******************
	//verify inboundStorageLength, inboundSlipLength, and corner radius:
	//(although corner radius not always equals to its length on approach side,
	//it would still be highly unreasonable for the sum of the three to be close to
	//the half intSize.)
	const inboundStorageLength = appDataToVerify.inboundStorageLength;
	const inboundSlipLength = appDataToVerify.inboundSlipLength;
	verifyCornerAppConflict(inboundStorageLength, inboundSlipLength, cornerRadius, appId, language);
};


export default verifyCornerGeo;
