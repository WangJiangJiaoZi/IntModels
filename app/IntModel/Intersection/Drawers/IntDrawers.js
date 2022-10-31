
import IntGeoDrawers from "./GeoDrawers/IntGeoDrawers";
import IntFeatureDrawers from "./FeatureDrawers/IntFeatureDrawers";


class IntDrawers {
	constructor(intersection) {
		this.intersection = intersection;

		//geometry drawers:
		const intGeoDrawers = new IntGeoDrawers(intersection);
		this.drawIntGeo = intGeoDrawers.drawIntGeo;
		this.drawIntRoadNames = intGeoDrawers.drawIntRoadNames;
		this.undrawIntRoadNames = intGeoDrawers.undrawIntRoadNames;
		this.drawIntStartConnectP = intGeoDrawers.drawIntStartConnectP;
		this.undrawIntStartConnectP = intGeoDrawers.undrawIntStartConnectP;
		this.drawIntEndConnectP = intGeoDrawers.drawIntEndConnectP;
		this.undrawIntEndConnectP = intGeoDrawers.undrawIntEndConnectP;
		this.drawLaneArrowColor = intGeoDrawers.drawLaneArrowColor;

		//feature drawers:
		const intFeatureDrawers = new IntFeatureDrawers(intersection);
		this._initializeIntFeatureGroup = intFeatureDrawers._initializeIntFeatureGroup;
		this.drawIntFeature = intFeatureDrawers.drawIntFeature;
		this.undrawIntFeature = intFeatureDrawers.undrawIntFeature;
		this.drawMovementArrow = intFeatureDrawers.drawMovementArrow;
		this.drawMovementFeature = intFeatureDrawers.drawMovementFeature;
		this.undrawMovementArrow = intFeatureDrawers.undrawMovementArrow;
		this.undrawMovementFeature = intFeatureDrawers.undrawMovementFeature;

	}


}


export default IntDrawers;
