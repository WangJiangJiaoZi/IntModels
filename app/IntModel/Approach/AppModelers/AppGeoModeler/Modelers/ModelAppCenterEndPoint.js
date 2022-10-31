
import SharedGeometryLib from "../../../../SharedGeometryLib";


/**************************************************************************
	Would model:
		End points for the approach: [[x1, y1], [x2, y2]]
		where [x1, y1] is the end point for l1, and [x2, y2] is for l2

	Would update:
		approach.appGeo.outerRightEndPoint = [x1, y1]
		approach.appGeo.outerLeftEndPoint = [x2, y2]
**************************************************************************/
const modelAppEndPoints = (approach, intSize, accuracy) => {
	const a = approach.appGeo.outerSides[0].a;
	const b1 = approach.appGeo.outerSides[0].b;  //intersect for right outer side
	const b2 = approach.appGeo.outerSides[1].b;
	const appCenterEndPoint = approach.appGeo.centerEndPoint;
	const sharedGeometryLib = new SharedGeometryLib(approach.THREE);

	let x1, y1, x2, y2;
	const getPointOnCircle = sharedGeometryLib.getPointOnCircleBySlopAndIntersect;
	const getDistBtwTwoPoints = sharedGeometryLib.getDistBtwTwoPoints;


	//right outer side:
	let rightEpCandidates, rightEp1, rightEp2;  //endpoints
	rightEpCandidates = getPointOnCircle(0, 0, intSize / 2, a, b1, accuracy);
	if (rightEpCandidates === null) {
		const erMessage = "Approach wider than intSize. Model geometry failed.";
		const endPointError = new Error(erMessage);
		throw endPointError;
	}
	else {
		rightEp1 = rightEpCandidates[0];  //[x11, y11]
		rightEp2 = rightEpCandidates[1];  //[x12, y12]

		const distBtwRightEp1AndEp = getDistBtwTwoPoints(
											rightEp1[0], rightEp1[1],
											appCenterEndPoint[0], appCenterEndPoint[1]
										);
		const distBtwRightEp2AndEp = getDistBtwTwoPoints(
											rightEp2[0], rightEp2[1],
											appCenterEndPoint[0], appCenterEndPoint[1]
										);
		x1 = (distBtwRightEp1AndEp < distBtwRightEp2AndEp) ? rightEp1[0] : rightEp2[0];
		y1 = (distBtwRightEp1AndEp < distBtwRightEp2AndEp) ? rightEp1[1] : rightEp2[1];

	}


	//left outer side:
	let leftEpCandidates, leftEp1, leftEp2;
	leftEpCandidates = getPointOnCircle(0, 0, intSize / 2, a, b2, accuracy);
	if (leftEpCandidates === null) {
		const erMessage = "Approach wider than intSize. Model geometry failed.";
		const endPointError = new Error(erMessage);
		throw endPointError;
	}
	else {
		leftEp1 = leftEpCandidates[0];	//[x21, y21]
		leftEp2 = leftEpCandidates[1];  //[x22, y22]

		const distBtwLeftEp1AndEp = getDistBtwTwoPoints(
											leftEp1[0], leftEp1[1],
											appCenterEndPoint[0], appCenterEndPoint[1]
										);
		const distBtwLeftEp2AndEp = getDistBtwTwoPoints(
											leftEp2[0], leftEp2[1],
											appCenterEndPoint[0], appCenterEndPoint[1]
										);
		x2 = (distBtwLeftEp1AndEp < distBtwLeftEp2AndEp) ? leftEp1[0] : leftEp2[0];
		y2 = (distBtwLeftEp1AndEp < distBtwLeftEp2AndEp) ? leftEp1[1] : leftEp2[1];
	}

	approach.appGeo.outerRightEndPoint = [x1, y1];
	approach.appGeo.outerLeftEndPoint = [x2, y2];


};

export default modelAppEndPoints;
