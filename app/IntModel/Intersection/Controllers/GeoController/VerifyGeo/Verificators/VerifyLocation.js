

import sharedErrors from "../../../../../SharedErrors/SharedErrors";

const verifyLocation = (location) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Intersection";
	const reg = /^[+-]?\d+(\.\d+)?$/;  //float number
	if (!reg.test(location.lat) || !reg.test(location.lng)) {
		const message = "invalid location, which should be in the form of {lat: ddd, lng: ddd}.";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyLocation;
