
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyCornerType = (cornerType, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Corner";
	const reg = /^(1|2|3)$/;  //should be 1, 2, or 3
	if (!reg.test(cornerType)) {
		let message;
		if (language === 1) {
			message = "invalid cornerType in approach " + appId +
				". The cornerType can only be 1, 2, or 3.";
		}
		else {
			message = "道路编号" + appId + "的转角类型无效。转角类型只能是1， 2， 或者3。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};

export default verifyCornerType;
