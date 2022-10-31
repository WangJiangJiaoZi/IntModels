
import IntGeoModeler from "./GeoModeler/IntGeoModeler";
import IntFeatureModeler from "./FeatureModeler/IntFeatureModeler";


class IntModelers {
	constructor(intersection) {
		this.intersection = intersection;
		this.geoModeler = new IntGeoModeler(intersection);
		this.featureModeler = new IntFeatureModeler(intersection);
	}
}

export default IntModelers;
