
import northArrowController from "./NorthArrowController";
import northArrowModeler from "./NorthArrowModeler";
import northArrowDrawer from "./NorthArrowDrawer";


class NorthArrow {
	constructor (intersection, THREE) {
		this.intersection = intersection;
		this.THREE = THREE;

		this.layerId = 2;

		this.northArrowController = northArrowController;
		this.northArrowModeler = northArrowModeler;
		this.northArrowDrawer = northArrowDrawer;

		this.northArrowGeo = null;
		/*contents:
			{
				centerP: [x, y],  //the center point of the north arrow
			}
		*/
	}
}


export default NorthArrow;
