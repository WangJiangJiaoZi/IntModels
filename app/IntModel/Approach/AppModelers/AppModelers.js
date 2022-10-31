import AppGeoModeler from "./AppGeoModeler/AppGeoModeler";
import AppFeatureModeler from "./AppFeatureModeler/AppFeatureModeler";


class AppModelers {
	constructor(approach) {
		this.approach = approach;
		this.appGeoModeler = new AppGeoModeler(approach);
		this.appFeatureModeler = new AppFeatureModeler(approach);
	}
}


export default AppModelers;


