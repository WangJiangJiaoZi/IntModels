
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";


const verifyDivOffset = (offset, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Divider";

	const reg = /^\-?\d+?(\.\d+)?$/;  //a number/float
	if (!reg.test(offset)) {
		let message;
		if (language === 1) {
			message = "invalid divider offset in divider geometry data in approach " +
				appId + ". It should be a number(float).";
		}
		else {
			message = "道路编号" + appId + "中的隔离带参数'offset'无效。" +
				"该参数应该是一个数字。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};

export default verifyDivOffset;
