

import AppGeoDrawers from "./AppGeoDrawers/AppGeoDrawers";
import AppFeatureDrawers from "./AppFeatureDrawers/AppFeatureDrawers";


class AppDrawers {
	constructor(approach) {
		this.approach = approach;

		//geometry drawers:
		const appGeoDrawers = new AppGeoDrawers(approach);
		this.drawAppGeo = appGeoDrawers.drawAppGeo;
		this.drawAppRoadName = appGeoDrawers.drawAppRoadName;
		this.undrawAppRoadName = appGeoDrawers.undrawAppRoadName;
		this.drawAppStartConnectP = appGeoDrawers.drawAppStartConnectP;
		this.undrawAppStartConnectP = appGeoDrawers.undrawAppStartConnectP;
		this.drawAppEndConnectP = appGeoDrawers.drawAppEndConnectP;
		this.undrawAppEndConnectP = appGeoDrawers.undrawAppEndConnectP;
		this.drawLaneArrowColor = appGeoDrawers.drawLaneArrowColor;

		//feature drawers:
		const appFeatureDrawers = new AppFeatureDrawers(approach);
		this.drawMovementArrow = appFeatureDrawers.drawMovementArrow;
		this.drawMovementFeature = appFeatureDrawers.drawMovementFeature;
		this.undrawMovementArrow = appFeatureDrawers.undrawMovementArrow;
		this.undrawMovementFeature = appFeatureDrawers.undrawMovementFeature;
	}


}



export default AppDrawers;
