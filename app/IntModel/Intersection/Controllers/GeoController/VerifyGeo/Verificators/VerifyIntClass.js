

import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyIntClass = (intClass) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Intersection";

	//verify intClass:
	if (!Number.isInteger(intClass)) {
		const message = "invalid intersection class, which should be an integer.";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyIntClass;
