
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";


const verifyDivSize = (oneValue, valueName, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Divider";

	const reg = /^\d+?(\.\d+)?$/;  //a positive number/float

	if (!reg.test(oneValue)) {
		let message;
		if (language === 1) {
			message = "invalid " + valueName + " in divider geometry data in approach " +
				appId + ". It should be a positive number (float).";
		}
		else {
			message = "道路编号" + appId + "中的隔离带无效参数：" + valueName +
				". 该参数应该是一个正数（整数或者小数)。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

};


export default verifyDivSize;
