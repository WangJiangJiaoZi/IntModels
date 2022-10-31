import DivGroupControllers from "./DivGroupControllers/DivGroupControllers";
import DivGroupDrawers from "./DivGroupDrawers/DivGroupDrawers";
import DivGroupModelers from "./DivGroupModelers/DivGroupModelers";


class DividerGroup {
	constructor(approach, THREE) {
		this.approach = approach;
		this.THREE = THREE;

		this.dividers = [];

		this.divGroupControllers = new DivGroupControllers(this);
		this.divGroupDrawers = new DivGroupDrawers(this);
		this.divGroupModelers = new DivGroupModelers(this);


		this.divGroupGeo = {};
		/*
			divGroupGeo contents:
			{
				divGroupWidth: xx,    //divider group width in meters. For center divider, it's start width
				ibDivWidth: xx,  //in pixel
				obDivWidth: xx,  //in pixel
				centerDivStartWidth: xx,  //in pixel
				centerDivEndWidth: xx,    //in pixel
			}
		*/

	}


}

export default DividerGroup;
