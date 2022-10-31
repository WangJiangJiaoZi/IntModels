
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyCwOffset = (crosswalkOffset, appId, langugae = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Crosswalk";
	const reg = /^\-?\d+?(\.\d+)?$/;  //positive number/float
	if (!reg.test(crosswalkOffset)) {
		let message;
		if (langugae === 1) {
			message = "invalid crosswalkOffset in approach " + appId +
				" crosswalk data. It should be a number less than 50 (meters).";
		}
		else {
			message = "道路编号为" + appId + "中的人行道'crosswalkOffset'属性无效。该属性应该是一个" +
				"小于50（米）的数值。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};

export default verifyCwOffset;
