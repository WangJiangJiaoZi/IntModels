
import sharedErrors from "../../../../SharedErrors/SharedErrors";


import verifyDivGeo from "../../Divider/DividerControllers/VerifyDivGeo/VerifyDivGeo";
/********************************************************************
		Verify dividerGroup geometry data:
			1.  Ask dividers to verify their geometry data.
*********************************************************************/
const verifyDivGroupGeo = (divGroupDataToVerify, appId, language = 1) => {

	// ************* Ask dividers to verify their geometry data *************
	if (!divGroupDataToVerify.constructor || divGroupDataToVerify.constructor !== Array) {
		const SingleValueError = sharedErrors.SingleValueError;
		const modelOwner = "DividerGroup";
		let message;
		if (language === 1) {
			message = "no divGroup data or wrong data format (should be an array) in approach " + appId;
		}
		else {
			message = "道路编号" + appId + "缺失隔离带组的信息/隔离带组的信息格式错误(应该是一个array)。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	// ************* Ask dividers to verify their geometry data *************
	divGroupDataToVerify.forEach((oneDivDataToVerify) => {
		verifyDivGeo(oneDivDataToVerify, appId, language);
	});

};

export default verifyDivGroupGeo;
