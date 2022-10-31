
/****************************************************************************
	Would model intersection center panel diameter, which would be of certain
	scale of intersection's center polygon.

	Would update:
		intersection.intFeatureGeo.centerPanelDiameter = xxx;
*****************************************************************************/

const modelCenterPanelDiameter = (intersection) => {
	// ******************* parameters prepatation *******************
	const envSetters = intersection.intModel.envSetters;
	const scale = envSetters.intCenterPanelDiameterScale;
	const initCenterPoly = intersection.intGeo.initCenterPoly;  //[[x, y], [], [], ..]

	// ******************* do calculation *******************
	let minX = initCenterPoly[0][0];
	let minY = initCenterPoly[0][1];
	let maxX = minX;
	let maxY = minY;
	for (let i = 1; i < initCenterPoly.length; i ++) {
		minX = (initCenterPoly[i][0] < minX) ? initCenterPoly[i][0] : minX;
		minY = (initCenterPoly[i][1] < minY) ? initCenterPoly[i][1] : minY;
		maxX = (initCenterPoly[i][0] > maxX) ? initCenterPoly[i][0] : maxX;
		maxY = (initCenterPoly[i][1] > maxY) ? initCenterPoly[i][1] : maxY;
	}

	const side = Math.min((maxX - minX), (maxY - minY));
	const centerPanelDiameter = side * scale;

	// ******************* do update *******************
	intersection.intFeatureGeo.centerPanelDiameter = centerPanelDiameter;
};


export default modelCenterPanelDiameter;
