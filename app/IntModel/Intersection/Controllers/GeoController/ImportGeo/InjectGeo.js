import Approach from "../../../../Approach/Approach";
import NorthArrow from "../../../NorthArrow/NorthArrow";

const injectGeo = (intModel, geoData) => {
	//dispose geometry and material to avoid memoery leaks:
	const intersection = intModel.intersection;
	const clickableObjects = intModel.clickableObjects;
	intersection.controllers.geoController.updateGeo.disposeGeoAndMaterial(
		intersection, clickableObjects
	);


	//inject data tree by the new geoData
	intersection.geoVersionId = geoData.geoVersionId;
	intersection.intId = geoData.intId;
	intersection.timestamp = geoData.timestamp;
	intersection.location = geoData.location;
	if (geoData.transformedLocation) {
		//meters, initial transformed location
		intersection.transformedLocation = geoData.transformedLocation;
	}
	intersection.intDiameter = (geoData.intDiameter) ? geoData.intDiameter : intModel.envSetters.intDiameter;

	intersection.class = geoData.class;
	intersection.controlType = geoData.controlType;
	intersection.roadColor = geoData.roadColor;
	intersection.cornerIslandColor = geoData.cornerIslandColor;
	intersection.crossWalkColor = geoData.crossWalkColor;
	intersection.textColor = geoData.textColor;
	intersection.backgroundColor = geoData.backgroundColor;

	intersection.intGeo = {};  //would be an obeject containing calculated points & lines
	intersection.intShape = {};  //would be an object containing shapes for mesh
	intersection.intFeatureGeo = {};
	intersection.intFeatureShape = {};


	intersection.centerPolygon = null;
	intersection.approaches = null;
	intersection.northArrow = null;

	intersection.intGroup = null;
	intersection.sigObjGroup = null;
	intersection.centerPanelMesh =  null;


	intersection.approaches = [];
	geoData.approaches.forEach((oneAppGeoData, index) => {
		const oneApp = new Approach(intersection, index, intersection.THREE, intersection.errorHints);
		intersection.approaches.push(oneApp);
		oneApp.appControllers.appGeoController.injectAppGeo(oneApp, oneAppGeoData);
	});

	intersection.northArrow = new NorthArrow(intersection, intersection.THREE);
	const northArrow = intersection.northArrow;
	northArrow.northArrowController.northArrowGeoController(northArrow);
};

export default injectGeo;
