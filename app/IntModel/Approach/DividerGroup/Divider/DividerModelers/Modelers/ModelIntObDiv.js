import SharedGeometryLib from "../../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		Outbound divider geometry.

	Would update:
		1. divider.divShape.divCurves = [an instance of THREE.Shape]

	Note:
		The divider head (start) cap would differ as the width of the divider
		differs.
**************************************************************************/


const modelIntObDiv = (divider, intSize, meterToPixel) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(divider.THREE);
	//const accuracy = initSettings.sharedInitSettings.accuracy * intSize;  //in pixel

	const app = divider.divGroup.approach;
	const intersection = app.intersection;
	const neiAppIndex = (app.appId === app.intersection.approaches.length - 1) ? 0 : app.appId + 1;
	const neiApp = app.intersection.approaches[neiAppIndex];

	const cornerRadius = neiApp.corner.cornerRadius; //in meters
	//radius in pixel
	const r = (cornerRadius > 5 && cornerRadius < 11) ? (cornerRadius * meterToPixel) : 5 * meterToPixel;

	const obOuterSp = divider.divGeo.obOuterSp;
	const obOuterEp = divider.divGeo.obOuterEp;
	const obOuterCp1 = divider.divGeo.obOuterCp1;
	const obOuterCp2 = divider.divGeo.obOuterCp2;

	const obInnerSp = divider.divGeo.obInnerSp;
	const obInnerEp = divider.divGeo.obInnerEp;
	const obInnerCp1 = divider.divGeo.obInnerCp1;
	const obInnerCp2 = divider.divGeo.obInnerCp2;


	//************************ Build curves ************************
	const connectParaLinesWzBz = sharedGeometryLib.connectParaLinesWzCurves;
	const capParaLinesWzArc = sharedGeometryLib.capParaLinesWzCwArc;

	//outer curves:
	const obOuterCurves = connectParaLinesWzBz(
							obOuterCp2, obOuterCp1, obOuterEp, obOuterSp, r
						);
	//inner curves:
	const obInnerCurves = connectParaLinesWzBz(
							obInnerCp1, obInnerCp2, obInnerSp, obInnerEp, r
						);
	//cap curves:
	const capRadius = divider.capRadius * meterToPixel;  //cap radius in pixel
	const capCurves = capParaLinesWzArc(obOuterSp, obInnerSp, capRadius);

	//divider curves:
	const divCurves = new divider.THREE.Shape();

	divCurves.moveTo(obInnerSp[0], obInnerSp[1]);
	obInnerCurves.curves.forEach((oneCurve) => {
		divCurves.add(oneCurve);
	});
	divCurves.moveTo(obInnerEp[0], obInnerEp[1]);


	divCurves.lineTo(obOuterEp[0], obOuterEp[1]);
	obOuterCurves.curves.forEach((oneCurve) => {
		divCurves.add(oneCurve);
	});
	divCurves.moveTo(obInnerSp[0], obInnerSp[1]);

	/*	*/
	capCurves.curves.forEach((oneCurve) => {
		divCurves.add(oneCurve);
	});

	divCurves.closePath();


	divider.divShape.divCurves = [divCurves];
};


export default modelIntObDiv;
