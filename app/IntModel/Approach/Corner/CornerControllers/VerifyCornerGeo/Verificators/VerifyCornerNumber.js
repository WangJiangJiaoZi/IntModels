
import sharedErrors from "../../../../../SharedErrors/SharedErrors";
//import initSettings from "../../../../../EnvSetters/InitSettings";


const verifyCornerNumber = (numberValue, numberName, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Corner";
	const reg = /^\+?\d+?(\.\d+)?$/;  //positive number/float
	//const sharedInitSettings = initSettings.sharedInitSettings;
	//const intRadius = sharedInitSettings.intDiameter / 2; //in meters
	if (!reg.test(numberValue)) {// || numberValue >= intRadius) {
		let message;
		if (language === 1) {
			message = "invalid " + numberName + " in approach " + appId +
				". It should be a positive number within a reasonable range.";
		}
		else {
			message = "道路编号" + appId + "的" + numberName + "无效。该值应该是不过大的一个正数。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyCornerNumber;
