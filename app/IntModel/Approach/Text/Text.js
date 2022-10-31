
import TextControllers from "./TextControllers/TextControllers";
import TextDrawers from "./TextDrawers/TextDrawers";
import TextModelers from "./TextModelers/TextModelers";

class Text {
	constructor(approach, THREE) {

		this.approach = approach;
		this.THREE = THREE;

		this.layerId = 2;

		this.appName = null;
		this.dirName = null;

		this.textControllers = new TextControllers(this);
		this.textDrawers = new TextDrawers(this);
		this.textModelers = new TextModelers(this);

	}
}


export default Text;
