
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyDivBound = (divBound, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Divider";
	const reg = /^(1|2|3)$/;  //can only be 1, 2, or 3
	if (!reg.test(divBound)) {
		let message;
		if (language === 1) {
			message = "invalid dividerType in approach " + appId +
				" It can only be 1 (inbound), 2 (outbound), or 3 (center).";
		}
		else {
			message = "道路编号" + appId + "中的隔离带参数'dividerType'无效。" +
				"该参数只能是 1(进口方向隔离带), 2(出口方向隔离带), 或者3(中央隔离带)。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

};


export default verifyDivBound;
