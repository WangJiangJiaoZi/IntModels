

class AppFeatureModeler {
	constructor(approach) {
		this.approach = approach;
	}

	modelAppFeature(intSize, meterToPixel, accuracy) {

		//ask laneGG to model its features:
		const laneGG = this.approach.laneGG;
		laneGG.laneGGModelers.laneGGFeatureModeler.modelLaneGGFeature(intSize, meterToPixel, accuracy);
	}
}


export default AppFeatureModeler;
