


import IntGeoController from "./GeoController/IntGeoController";
import IntFeatureController from "./FeatureController/IntFeatureController";


class IntControllers {
	constructor(intersection) {
		this.intersection = intersection;
		this.geoController = new IntGeoController(intersection);
		this.intFeatureController = new IntFeatureController(intersection);
	}
}


export default IntControllers;
