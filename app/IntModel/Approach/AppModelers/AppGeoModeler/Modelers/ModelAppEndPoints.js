
import SharedGeometryLib from "../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		approach center line end point: [x, y],
		where center line is the geometry center of the approach (NOT a divider)

	Would update:
		approach.appGeo.centerEndPoint = [x, y];
**************************************************************************/
const modelAppCenterEndPoint = (approach, intSize, accuracy) => {
	const sharedGeometryLib = new SharedGeometryLib(approach.THREE);
	//center line slope and intersect:
	const a = approach.appGeo.outerSides[0].a;
	const b = 0;

	let x, y; //x and y of the center end point
	let epCandidates, ep1, ep2;  //two potential end points candidates


	//when approach is perpendicular to X:
	if (a === null) {
		x = 0;
		y = (approach.appAngle === 0) ? intSize / 2 : intSize / (-2);
	}
	else {
		const getPointOnCircle = sharedGeometryLib.getPointOnCircleBySlopAndIntersect;
		epCandidates = getPointOnCircle(0, 0, intSize / 2 ,a, b, accuracy);

		if (epCandidates === null) {
			const erMessage = "Approach wider than intSize. Model geometry failed.";
			const endPointError = new Error(erMessage);
			throw endPointError;
		}

		ep1 = epCandidates[0];
		ep2 = epCandidates[1];
		//quadrant I:
		if (approach.appAngle > 0 && approach.appAngle <= 90) {
			x = (ep1[0] > 0 && ep1[1] >= 0) ? ep1[0] : ep2[0];
			y = (ep1[0] > 0 && ep1[1] >= 0) ? ep1[1] : ep2[1];
		}
		//quadrant II:
		else if (approach.appAngle > 90 && approach.appAngle < 180) {
			x = (ep1[0] > 0 && ep1[1] < 0) ? ep1[0] : ep2[0];
			y = (ep1[0] > 0 && ep1[1] < 0) ? ep1[1] : ep2[1];
		}
		//quadrant III:
		else if (approach.appAngle > 180 && approach.appAngle <= 270) {
			x = (ep1[0] < 0 && ep1[1] <= 0) ? ep1[0] : ep2[0];
			y = (ep1[0] < 0 && ep1[1] <= 0) ? ep1[1] : ep2[1];
		}
		//quadrant IV:
		else {
			x = (ep1[0] < 0 && ep1[1] > 0) ? ep1[0] : ep2[0];
			y = (ep1[0] < 0 && ep1[1] > 0) ? ep1[1] : ep2[1];
		}
	}

	approach.appGeo.centerEndPoint = [x, y];

};


export default modelAppCenterEndPoint;
