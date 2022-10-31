
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyIntId = (intId) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Intersection";
	//verify intId:
	const reg = /^\d+$/;  //intId should be purely digits
	if (!reg.test(intId)) {
		const message = "invalid intId, which should be purely digits";
		const oneValueError = new SingleValueError(modelOwner, message);
		//throw oneValueError;
	}
};


export default verifyIntId;
