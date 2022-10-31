

import modelMovsStartLine from "./Modelers/ModelMovsStartLine";
import modelMovsOrderAndArrowTypes from "./Modelers/ModelMovsOrderAndArrowTypes";
import modelMovsTextMaxLen from "./Modelers/ModelMovsTextMaxLen";

class LaneGGFeatureModeler {
	constructor(laneGG) {
		this.laneGG = laneGG;
		this.modelMovsStartLine = modelMovsStartLine;
		this.modelMovsOrderAndArrowTypes = modelMovsOrderAndArrowTypes;
	}

	modelLaneGGFeature(intSize, meterToPixel, accuracy) {
		//ask laneGroups to model their features:
		//TBD...


		//model movements' features:
		if (this.laneGG.movements.length > 0) {
			//model movements' shared start line
			modelMovsStartLine(this.laneGG, intSize, meterToPixel, accuracy);
			//model movements' order and their arrow types
			modelMovsOrderAndArrowTypes(this.laneGG, accuracy);
			//model movements' text max length
			modelMovsTextMaxLen(this.laneGG);

			//ask each movement to model themselves
			const movements = this.laneGG.movements;
			movements.forEach((oneMov) => {
				oneMov.movModelers.modelMovFeature(intSize, meterToPixel, accuracy);
			});
		}

	}
}


export default LaneGGFeatureModeler;
