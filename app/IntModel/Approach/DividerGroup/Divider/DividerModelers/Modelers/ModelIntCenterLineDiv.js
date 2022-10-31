
import SharedGeometryLib from "../../../../../SharedGeometryLib";

/***************************************************************************
	Would model:
		Center linear divider geometry.

	Would update:
		1. divider.divShape.divCurves = [an instance of THREE.Shape]

	Note:
		The shape would vary between single line (solid/dash) and
		double lines (solid/dash).
****************************************************************************/

const modelIntCenterLineDiv = (divider, intSize, meterToPixel) => {
	//************************ Prepare parameters ************************
	const sharedGeometryLib = new SharedGeometryLib(divider.THREE);
	const envSetters = divider.divGroup.approach.intersection.intModel.envSetters;

	const app = divider.divGroup.approach;
	const appRightIsEp = app.appGeo.innerRightEp;  //[x, y]
	const appLeftIsEp = app.appGeo.innerLeftEp;    //[x, y]

	const cornerRadius = app.corner.cornerRadius; //in meters
	//radius in pixel
	const r = (cornerRadius > 5 && cornerRadius < 11) ? (cornerRadius * meterToPixel) : 5 * meterToPixel;

	const roadMarkWidth = envSetters.roadLineMarkWidth * meterToPixel;  //in pixel

	//************************ Middle curves ************************
	const midSp = divider.divGeo.centerMidSp;  //center divider middle start point
	const midEp = divider.divGeo.centerMidEp;  //center divider middle end point
	const midCp1 = divider.divGeo.centerMidCp1;  //center divider middle bezier curve start point 1
	const midCp2 = divider.divGeo.centerMidCp2;  //center divider middle bezier curve end point 2

	const getVectorsOnBzConnectParaLines = sharedGeometryLib.getVectorsOnBzConnectParaLines;
	//would get an array of vectors:
	//	[
	//		curves start point, //same as sp
	//		bezier start point,
	//		bezier end point,
	//		curves end point,  //same as ep
	//		bezier control point1, //same as cp1
	//		bezier control point2  //same as cp2
	// 	]
	const midVectors = getVectorsOnBzConnectParaLines(
						midSp, midEp, midCp1, midCp2, r
					);
	const reversedMidVectors = getVectorsOnBzConnectParaLines(
						midEp, midSp, midCp2, midCp1, r
					);

	//************************ Build shapes according to type ************************
	//null: none
	//1: dash line
	//2: single solid line
	//3: double line
	//4: left line and right dash line ---------------------- (TBD...)
	//5: left dash line and right line ---------------------- (TBD...)
	//6: wall (usually for median or hov)---------------------- (TBD...)
	//7: sticks ---------------------- (TBD...)
	//8: grass (non-linear type)
	//9: shadow (non-linear type)
	const divLineType = divider.type;

	const getShiftedCurves = sharedGeometryLib.shiftConnectedParaLines;

	const ibShiftVec = new divider.THREE.Vector2(
						appRightIsEp[0] - appLeftIsEp[0],
						appRightIsEp[1] - appLeftIsEp[1],
					);
	const obShiftVec = new divider.THREE.Vector2(
						appLeftIsEp[0] - appRightIsEp[0],
						appLeftIsEp[1] - appRightIsEp[1],
					);


	//single line:
	if (divLineType === 1 || divLineType === 2) {
		let divCurves = new divider.THREE.Shape();

		const sgIbShiftVec = ibShiftVec.clone();  //single line inbound shift vector
		sgIbShiftVec.setLength(roadMarkWidth / 2);

		const sgObShiftVec = obShiftVec.clone();  //single line outbound shift vector
		sgObShiftVec.setLength(roadMarkWidth / 2);

		const ibCurves = getShiftedCurves(midVectors, sgIbShiftVec);

		//single dash line:
		if (divLineType === 1) {
			const getDashShapesAlongCurves = sharedGeometryLib.getDashShapesAlongCurves;
			const dashLen = envSetters.roadDashLineLength * meterToPixel;
			const obCurves = getShiftedCurves(midVectors, sgObShiftVec);

			divCurves = getDashShapesAlongCurves(
							ibCurves, obCurves, dashLen
						);  //an array of shapes

			divider.divShape.divCurves = divCurves;
		}
		//single solid line:
		else {
			const reversedObCurves = getShiftedCurves(reversedMidVectors, sgObShiftVec);

			const ibCurvesSpVec = ibCurves.getPoint(0);
			const ibCurvesEpVec = ibCurves.getPoint(1);
			const revObCurvesSpVec = reversedObCurves.getPoint(0);
			const revObCurvesEpVec = reversedObCurves.getPoint(1);

			divCurves.moveTo(ibCurvesSpVec.x, ibCurvesSpVec.y);
			ibCurves.curves.forEach((oneCurve) => {
				divCurves.add(oneCurve);
			});
			divCurves.moveTo(ibCurvesEpVec.x, ibCurvesEpVec.y);

			divCurves.lineTo(revObCurvesSpVec.x, revObCurvesSpVec.y);
			reversedObCurves.curves.forEach((oneCurve) => {
				divCurves.add(oneCurve);
			});
			divCurves.moveTo(revObCurvesEpVec.x, revObCurvesEpVec.y);
			divCurves.closePath();

			divider.divShape.divCurves = [divCurves];
		}


	}
	//double line:
	else if (divLineType === 3) {
		//************ inbound curves *************
		const sgIbShiftVec = ibShiftVec.clone();  //single line inbound shift vector
		sgIbShiftVec.setLength(roadMarkWidth * 1.5);

		const ibOuterCurves = getShiftedCurves(midVectors, sgIbShiftVec);
		sgIbShiftVec.setLength(roadMarkWidth / 2);
		const revIbInnerCurves = getShiftedCurves(reversedMidVectors, sgIbShiftVec);

		const ibOuterSpVec = ibOuterCurves.getPoint(0);
		const ibOuterEpVec = ibOuterCurves.getPoint(1);
		const revIbInnerSpVec = revIbInnerCurves.getPoint(0);
		const revIbInnerEpVec = revIbInnerCurves.getPoint(1);

		const ibDivCurves = new divider.THREE.Shape();
		ibDivCurves.moveTo(ibOuterSpVec.x, ibOuterSpVec.y);

		ibOuterCurves.curves.forEach((oneCurve) => {
			ibDivCurves.add(oneCurve);
		});
		ibDivCurves.moveTo(ibOuterEpVec.x, ibOuterEpVec.y);

		ibDivCurves.lineTo(revIbInnerSpVec.x, revIbInnerSpVec.y);
		revIbInnerCurves.curves.forEach((oneCurve) => {
			ibDivCurves.add(oneCurve);
		});
		ibDivCurves.moveTo(revIbInnerEpVec.x, revIbInnerEpVec.y);
		ibDivCurves.closePath();

		//************ outbound curves *************
		const sgObShiftVec = obShiftVec.clone();  //single line outbound shift vector
		sgObShiftVec.setLength(roadMarkWidth * 1.5);

		const obOuterCurves = getShiftedCurves(midVectors, sgObShiftVec);
		sgObShiftVec.setLength(roadMarkWidth / 2);
		const revObInnerCurves = getShiftedCurves(reversedMidVectors, sgObShiftVec);

		const obOuterSpVec = obOuterCurves.getPoint(0);
		const obOuerEpVec = obOuterCurves.getPoint(1);
		const revObInnerSpVec = revObInnerCurves.getPoint(0);
		const revObInnerEpVec = revObInnerCurves.getPoint(1);

		const obDivCurves = new divider.THREE.Shape();
		obDivCurves.moveTo(obOuterSpVec.x, obOuterSpVec.y);
		obOuterCurves.curves.forEach((oneCurve) => {
			obDivCurves.add(oneCurve);
		});

		obDivCurves.moveTo(obOuerEpVec.x, obOuerEpVec.y);
		obDivCurves.lineTo(revObInnerSpVec.x, revObInnerSpVec.y);

		revObInnerCurves.curves.forEach((oneCurve) => {
			obDivCurves.add(oneCurve);
		});
		obDivCurves.moveTo(revObInnerEpVec.x, revObInnerEpVec.y);
		obDivCurves.closePath();

		divider.divShape.divCurves = [ibDivCurves, obDivCurves];

	}
	//other linear types that to be done......
	else if (divLineType > 3 && divLineType < 8) {
		console.log("linear center divider type TBD...");
	}
	//error.....
	else {
		console.log("should be handled in phsical center divider...");
	}



};


export default modelIntCenterLineDiv;
