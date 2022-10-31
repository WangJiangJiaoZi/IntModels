
import SharedGeometryLib from "../../../../SharedGeometryLib";


/******************************************************************************
	Would model:
		Inner sides of the approach.

	Would update:
		approach.appGeo.innerSides = [{a: a1, b: b1}, {a: a2, b: b2}], where
		a1, b1 for the right inner side, a2, b2 for the left inner side
*******************************************************************************/


const modelAppInnerSides = (approach, meterToPixel) => {
	const appA = approach.appGeo.outerSides[0].a;  //approach slope
	const rightIsEp = approach.appGeo.innerRightEp; //right inner side end point
	const leftIsEp = approach.appGeo.innerLeftEp;  //left inner side end point

	let b1, b2; //b1 for right side, b2 for left side

	if (appA === null) {
		b1 = rightIsEp[0];
		b2 = leftIsEp[0];
	}
	else {
		b1 = rightIsEp[1] - appA * rightIsEp[0];
		b2 = leftIsEp[1] - appA * leftIsEp[0];
	}

	approach.appGeo.innerSides = [{a: appA, b: b1}, {a: appA, b: b2}];
};


export default modelAppInnerSides;
