

import SharedGeometryLib from "../../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		Inbound divider geometry.

	Would update:
		1. divider.divShape.divCurves = [an instance of THREE.Shape]

	Note:
		The divider head (start) cap would differ as the width of the divider
		differs.
**************************************************************************/

const modelIntIbDiv = (divider, intSize, meterToPixel) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(divider.THREE);
	//const accuracy = initSettings.sharedInitSettings.accuracy * intSize;  //in pixel

	const approach = divider.divGroup.approach;
	const cornerRadius = approach.corner.cornerRadius; //in meters
	//radius in pixel
	const r = (cornerRadius > 5 && cornerRadius < 11) ? (cornerRadius * meterToPixel) : 5 * meterToPixel;

	const ibOuterSp = divider.divGeo.ibOuterSp;
	const ibOuterEp = divider.divGeo.ibOuterEp;
	const ibOuterCp1 = divider.divGeo.ibOuterCp1;
	const ibOuterCp2 = divider.divGeo.ibOuterCp2;

	const ibInnerSp = divider.divGeo.ibInnerSp;
	const ibInnerEp = divider.divGeo.ibInnerEp;
	const ibInnerCp1 = divider.divGeo.ibInnerCp1;
	const ibInnerCp2 = divider.divGeo.ibInnerCp2;

	//************************ Build curves ************************
	const connectParaLinesWzBz = sharedGeometryLib.connectParaLinesWzCurves;
	const capParaLinesWzArc = sharedGeometryLib.capParaLinesWzCwArc;

	//outer curves:
	const ibOuterCurves = connectParaLinesWzBz(
							ibOuterCp1, ibOuterCp2, ibOuterSp, ibOuterEp, r
						);
	//inner curves:
	const ibInnerCurves = connectParaLinesWzBz(
							ibInnerCp2, ibInnerCp1, ibInnerEp, ibInnerSp, r
						);
	//cap curves:
	const capRadius = divider.capRadius * meterToPixel;  //cap radius in pixel
	const capCurves = capParaLinesWzArc(ibInnerSp, ibOuterSp, capRadius);

	//divider curves:
	const divCurves = new divider.THREE.Shape();

	divCurves.moveTo(ibOuterSp[0], ibOuterSp[1]);
	ibOuterCurves.curves.forEach((oneCurve) => {
		divCurves.add(oneCurve);
	});
	divCurves.moveTo(ibOuterEp[0], ibOuterEp[1]);


	divCurves.lineTo(ibInnerEp[0], ibInnerEp[1]);
	ibInnerCurves.curves.forEach((oneCurve) => {
		divCurves.add(oneCurve);
	});
	divCurves.moveTo(ibInnerSp[0], ibInnerSp[1]);

	/*	*/
	capCurves.curves.forEach((oneCurve) => {
		divCurves.add(oneCurve);
	});

	divCurves.closePath();


	divider.divShape.divCurves = [divCurves];

};

export default modelIntIbDiv;
