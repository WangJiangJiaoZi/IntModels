import SharedGeometryLib from "../../../../../SharedGeometryLib";

/***************************************************************************
	Would model:
		Center physical divider geometry.

	Would update:
		1. divider.divShape.divCurves = [an instance of THREE.Shape]

	Note:
		The divider head (start) cap would differ as the width of the divider
		differs.
****************************************************************************/


const modelIntCenterPhyDiv = (divider, intSize, meterToPixel) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(divider.THREE);
	//const accuracy = initSettings.sharedInitSettings.accuracy * intSize;  //in pixel

	const approach = divider.divGroup.approach;
	const cornerRadius = approach.corner.cornerRadius; //in meters
	//radius in pixel
	const r = (cornerRadius > 5 && cornerRadius < 11) ? (cornerRadius * meterToPixel) : 5 * meterToPixel;

	const ibSp = divider.divGeo.centerIbSp;  //center divider inbound side start point
	const ibEp = divider.divGeo.centerIbEp;  //center divider inbound side end point
	const ibCp1 = divider.divGeo.centerIbCp1;  //center divider inbound side bezier curve start point 1
	const ibCp2 = divider.divGeo.centerIbCp2;  //center divider inbound side bezier curve end point 2

	const obSp = divider.divGeo.centerObSp;  //center divider outbound side start point
	const obEp = divider.divGeo.centerObEp;  //center divider outbound side end point

	const startWidth = divider.divGroup.divGroupGeo.centerDivStartWidth;  //in pixel
	let capRadius = divider.capRadius * meterToPixel;  //in pixel
	capRadius = (startWidth > capRadius * 2) ? capRadius : startWidth / 2;


	//************************ Build curves ************************
	const connectParaLinesWzCurves = sharedGeometryLib.connectParaLinesWzCurves;
	const capParaLinesWzCwArc = sharedGeometryLib.capParaLinesWzCwArc;

	const ibCurves = connectParaLinesWzCurves(
						ibCp1, ibCp2, ibSp, ibEp, r
					);

	const capCurves = capParaLinesWzCwArc(
					obSp, ibSp, capRadius
				);


	//************************ Build divCurves ************************
	const divCurves = new divider.THREE.Shape();

	divCurves.moveTo(ibSp[0], ibSp[2]);
	ibCurves.curves.forEach((oneCurve) => {
		divCurves.add(oneCurve);
	});

	divCurves.moveTo(ibEp[0], ibEp[1]);
	divCurves.lineTo(obEp[0], obEp[1]);
	divCurves.lineTo(obSp[0], obSp[1]);

	capCurves.curves.forEach((oneCurve) => {
		divCurves.add(oneCurve);
	});
	capCurves.closePath();


	divider.divShape.divCurves = [divCurves];

};


export default modelIntCenterPhyDiv;
