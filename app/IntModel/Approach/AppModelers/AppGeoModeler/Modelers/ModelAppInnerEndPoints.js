
import SharedGeometryLib from "../../../../SharedGeometryLib";


/**************************************************************************
	Would model:
		Inner sides end points

	Would update:
		approach.appGeo.innerRightEp = [x1, y1];
		approach.appGeo.innerLeftEp = [x2, y2];

	Note:
		None
**************************************************************************/

const modelAppInnerEndPoints = (approach, intSize, meterToPixel) => {
	const sharedGeometryLib = new SharedGeometryLib(approach.THREE);

	const rightWidth = meterToPixel * approach.inboundStorageWidth;
	const leftWidth = meterToPixel * approach.outboundStorageWidth;
	const rightOuterEp = approach.appGeo.outerRightEndPoint;
	const leftOuterEp = approach.appGeo.outerLeftEndPoint;

	let rightInnerEp, leftInnerEp;
	const getPointMovedDistFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
	//right side:
	rightInnerEp = getPointMovedDistFromAtoB(
					rightOuterEp[0], rightOuterEp[1],
					leftOuterEp[0], leftOuterEp[1],
					rightWidth
				);

	//left side:
	leftInnerEp = getPointMovedDistFromAtoB(
					leftOuterEp[0], leftOuterEp[1],
					rightOuterEp[0], rightOuterEp[1],
					leftWidth
				);


	approach.appGeo.innerRightEp = rightInnerEp;
	approach.appGeo.innerLeftEp = leftInnerEp;

};


export default modelAppInnerEndPoints;
