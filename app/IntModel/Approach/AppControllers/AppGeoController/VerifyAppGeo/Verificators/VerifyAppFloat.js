
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyAppFloat = (floatValue, floatName, appId) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Approach";
	const reg = /^\+?\d+(\.\d+)?$/;  //positive float number
	if (!reg.test(floatValue)) {
		const message = "invalid " + floatName + " in approach " + appId + ", which should be 0 or a positive number.";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyAppFloat;
