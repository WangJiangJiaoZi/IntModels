
import modelMovMidLine from "./Modelers/ModelMovMidLine";
import modelMovArrowCenterP from "./Modelers/ModelMovArrowCenterP";
import modelMovTextPanel from "./Modelers/ModelMovTextPanel";


class MovModelers {
	constructor(movement) {
		this.movement = movement;

		this.modelMovMidLine = modelMovMidLine;
		this.modelMovArrowCenterP = modelMovArrowCenterP;
		this.modelMovTextPanel = modelMovTextPanel;
	}

	modelMovFeature(intSize, meterToPixel, accuracy) {
		this.modelMovMidLine(this.movement, intSize, meterToPixel, accuracy);
		this.modelMovArrowCenterP(this.movement, intSize, meterToPixel, accuracy);
		this.modelMovTextPanel(this.movement, intSize, meterToPixel, accuracy);
	}
}


export default MovModelers;
