

import sharedErrors from "../../../../../SharedErrors/SharedErrors";

const verifyCwIfCrosswalk = (ifCrosswalk, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Crosswalk";
	if (typeof ifCrosswalk !== "boolean") {
		let message;
		if (language === 1) {
			message = "invalid ifCrosswalk in approach " + appId +
				"crosswalk data. It should be a boolean variable";
		}
		else {
			message = "道路编号" + appId + "中人行道的'ifCrosswalk'属性无效。该属性应该是一个布尔值。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

};


export default verifyCwIfCrosswalk;
