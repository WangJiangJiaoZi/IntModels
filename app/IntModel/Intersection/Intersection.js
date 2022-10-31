
import IntModelBaseClass from "../IntModelBaseClass";


import IntModelers from "./Modelers/IntModelers";
import IntControllers from "./Controllers/IntControllers";
import IntDrawers from "./Drawers/IntDrawers";


class Intersection extends IntModelBaseClass {
	constructor(intModel, THREE, errorHints) {
		super("Intersection", errorHints.int);
		this.intModel = intModel;
		this.THREE = THREE;
		this.errorHints = errorHints;

		this.modelers = new IntModelers(this);
		this.controllers = new IntControllers(this);
		this.drawers = new IntDrawers(this);
		this.layerId = 0;  //layer id of the object

		this.geoVersionId = null;

		//geomety centered features:
		this.intId = null;
		this.timestamp = null;
		this.location = null;
		this.transformedLocation = [0, 0, 0]; //meters, initial transformed location
		this.intDiameter = 250;  //initial diameter in meters
		this.class = null;
		this.roadColor = null;
		this.cornerIslandColor = null;
		this.crossWalkColor = null;
		this.textColor = null;
		this.backgroundColor = null;


		//intersection level opteration features:
		this.LOS = null;
		this.delay = null;
		this.controlType = null;

		this.centerPolygon = null;
		this.approaches = [];
		this.northArrow = null;

		this.intGroup = null;  //would be an instance of THREE.Group, which will contain meshes of the intersection geometry
		this.intFeatureGroup = null; //would be an instance of THREE.Group, which will contian meshes of the intersection features geometry
		this.sigObjGroup = null;  //would be an instance of THREE.Group, which will contain meshes of the intersection signal geometry
		this.centerPanelMesh = null; //would be an instance of THREE.Mesh

		this.intGeo = {};  //would be an obeject containing calculated points and lines
		/*intGeo contents:
			{
				initCenterPoly: [[x, y], [], []],  //initial center ploygon vertex with no
													//curves points in specail cases
				svgScale: x, a positive number for svgs scale (such as arrow)

				height: x,   //in meters
			}
		*/

		this.intShape = {}; //would be an object containing shapes for mesh
		/*intShape contents:
			{
				centerPoly: an instance of Three.shape
			}
		*/


		this.intFeatureGeo = {};
		/*
			intFeatureGeo contents:
			{
				centerPanelDiameter: xx,  //length in meters of intersection center info panel diameter
				movTextLeftGap: xxx, //gap in pixel between text and panel left side
				movTextTopGap: xxx,  //gap in pixel between text and panel top side
				movTextPanelHeight: xxx, //text panel height in pixel
			}
		*/

		this.intFeatureShape = {};
		/*
			{
			}
		*/

	}
}



export default Intersection;
