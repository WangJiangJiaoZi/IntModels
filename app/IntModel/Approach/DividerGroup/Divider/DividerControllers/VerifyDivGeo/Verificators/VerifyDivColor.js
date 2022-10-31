

import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyDivColor = (color, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Divider";
	const reg = /^#([0-9a-f]{3}|[0-9a-fA-F]{6})$/i;   //hex color
	if (!reg.test(color)) {
		let message;
		if (language === 1) {
			message = "invalid divider color in approach " + appId +
				" It can only be a hex code color.";
		}
		else {
			message = "道路编号" + appId + "中的隔离带参数'color'" + 
				"无效。该参数应该是hex code。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};

export default verifyDivColor;
