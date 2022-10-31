
/*********************************************************************************
	Would model:
		Intersection height. No height info would result in 0.

	Would update:
		intersection.intGeo.height = x;  //in meters
**********************************************************************************/

const modelHeight = (intersection, meterToPixel, accuracy) => {
	const height = (intersection.location.h) ? intersection.location.h * meterToPixel : 0; //in pixel
	intersection.intGeo.height = height;
};


export default modelHeight;