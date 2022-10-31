
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyCwAngle = (crosswalkAngle, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Crosswalk";
	const reg = /^\+?(0|[1-9]\d*)$/;  //positive integer
	if (!reg.test(crosswalkAngle) || crosswalkAngle >= 180) {
		let message;
		if (language === 1) {
			message = "invalid crosswalkAngle in approach " + appId +
				"crosswalk data. It should be a positive integer in the range of [0, 180).";
		}
		else {
			message = "道路编号为" + appId + "中人行道'crosswalkAngle'属性无效。该属性应该是一个介于" +
				"[0, 180)间的正数。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyCwAngle;
