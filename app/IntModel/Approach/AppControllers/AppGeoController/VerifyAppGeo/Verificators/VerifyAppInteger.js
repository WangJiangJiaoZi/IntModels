
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyAppInteger = (integerValue, intergerName, appId) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Approach";
	const reg = /^\+?(0|[1-9]\d*)$/;  //positive integer
	if (!reg.test(integerValue)) {
		const message = "invalid " + intergerName + " in approach " + appId + ", which should be 0 or a positive integer.";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

};

export default verifyAppInteger;
