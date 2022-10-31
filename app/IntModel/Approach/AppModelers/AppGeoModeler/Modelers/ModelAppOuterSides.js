/**************************************************************************
	Would model:
		outer sides for the approach: [l1, l2],
		where l1 is right side and l2 is left side, both in the form of a and b

	Would update:
		approach.appGeo.outerSides = [{a: a, b: b1}, {a: a, b: b2}];
**************************************************************************/
const modelAppOuterSides = (approach, intSize, meterToPixel, accuracy) => {

	//get dividers width:
	const dividerGroup = approach.dividerGroup;
	const modelDivGroupGeoForApp = dividerGroup.divGroupModelers.modelDivGroupGeoForApp;
	modelDivGroupGeoForApp(dividerGroup, intSize, meterToPixel, accuracy);
	const divGroupWidth = dividerGroup.divGroupGeo.divGroupWidth;


	//get laneGG width (width of all lanes):
	const laneGG = approach.laneGG;
	const modelLaneGGGeoForApp = laneGG.laneGGModelers.laneGGGeoModeler.modelLaneGGGeoForApp;
	modelLaneGGGeoForApp(laneGG);
	const laneGGWidth = laneGG.laneGGGeo.laneGGWidth;  //in meters
	const appWidth = laneGGWidth + divGroupWidth;  //in meters

	const appWidthSize = appWidth * meterToPixel; //in pixel
	const w = appWidthSize / 2; //half of appWidthSize in pixel


	//calculate a & b for l1 & l2
	//slope for both l1 and l2:
	let a;
	if (approach.appAngle === 0 || approach.appAngle === 180) {
		a = null;
	}
	else if (approach.appAngle === 90 || approach.appAngle === 270) {
		a = 0;
	}
	else {
		a = Math.tan(Math.PI / 2 - approach.appAngle * Math.PI / 180);
	}

	//intercept for l1 and l2:
	let b1, b2;
	//when the approach is perpendicular to X, there is no b at all
	//b would save the intersect on X
	if (approach.appAngle === 0) {
		b1 = -w;
		b2 = w;
	}
	else if (approach.appAngle === 180) {
		b1 = w;
		b2 = -w;
	}
	else {
		b1 = w / Math.sin(approach.appAngle * Math.PI / 180);
		b2 = -b1;
	}

	approach.appGeo.outerSides = [{a: a, b: b1}, {a: a, b: b2}];

	//return [{a: a, b: b1}, {a: a, b: b2}];

};

export default modelAppOuterSides;
