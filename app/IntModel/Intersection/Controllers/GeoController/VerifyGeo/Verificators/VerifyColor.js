
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyColor = (color, valueName) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Intersection";
	const reg = /^#([0-9a-f]{3}|[0-9a-fA-F]{6})$/i;   //hex color

	if (!reg.test(color)) {
		const message = "invalid " + valueName + ", which should be a hex color code.";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

};


export default verifyColor;
