
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyAppAngle = (appAngle, appId) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Approach";
	const reg = /^\+?(0|[1-9]\d*)$/;  //positive integer
	if (!reg.test(appAngle) || appAngle >= 360) {
		const message = "invalid appAngle data in approach " + appId + ", which should be an integer between [0, 360).";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyAppAngle;
