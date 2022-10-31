
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyCwSize = (sizeValue, sizeName, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Crosswalk";
	const top = 50; //meters
	const reg = /^\+?\d+?(\.\d+)?$/;  //positive number/float

	if (!reg.test(sizeValue) || sizeValue > top) {
		let message;
		if (language === 1) {
			message = "invalid " + sizeName + " in approach " + appId +
				" crosswalk data. It should be a positive integer less than 50 (meters).";
		}
		else {
			message = "道路编号为" + appId + "中人行道属性" + sizeName + "的值无效。该属性应该是" +
				"一个大于0（米）小于50（米）的数。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyCwSize;
