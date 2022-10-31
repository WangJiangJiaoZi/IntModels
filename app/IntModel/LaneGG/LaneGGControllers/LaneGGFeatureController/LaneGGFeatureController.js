
import Movement from "../../Movement/Movement";


class LaneGGFeatureController {
	constructor(laneGG) {
		this.laneGG = laneGG;
	}

	setupMovement(laneGGMovSetting) {
		//clear existing movements if any:
		this.laneGG.movements = [];

		//traverse values to set up movements in current laneGG:
		const movements = [];
		laneGGMovSetting.forEach((oneSetting, toLaneGGIndex) => {
			//if oneSetting is true, set up a movement
			if (oneSetting) {
				const toLaneGG = this.laneGG.approach.intersection.approaches[toLaneGGIndex].laneGG;
				const THREE = this.laneGG.THREE;
				const oneMovement = new Movement(this.laneGG, toLaneGG, THREE, this.laneGG.errorHints);
				movements.push(oneMovement);
			}
		});
		this.laneGG.movements = movements;
	}


	injectLaneGGFeature(oneFeatureLaneGGValues, featureLevel, featureType, featureUnit) {
		if (featureLevel === "movement") {
			const featureValues = oneFeatureLaneGGValues;  //an array of numbers
			//verify featureValues:
			if (featureValues.length !== this.laneGG.approach.intersection.approaches.length) {
				const info = this.laneGG.modelErrorHints.injectFeatureInfo1;
				const reason = this.laneGG.modelErrorHints.injectFeatureReason1;
				this.laneGG.handleInjectError(info, reason);
			}
			//else, inject data to movement
			else {
				featureValues.forEach((oneValue, toLaneGGIndex) => {
					//only inject non null value
					if (oneValue !== null) {
						//find the movement of the toLaneGGIndex:
						const oneMovement = this.laneGG.movements.find((oneMov) => {
							return oneMov.toLaneGG === this.laneGG.approach.intersection.approaches[toLaneGGIndex].laneGG;
						});

						//raise error if not found:
						if (!oneMovement) {
							const info = this.laneGG.modelErrorHints.injectFeatureInfo2;
							const reason = this.laneGG.modelErrorHints.injectFeatureReason2;
							this.laneGG.handleInjectError(info, reason);
						}
						//else, do injection:
						else {
							oneMovement.movControllers.injectMovFeature(oneValue, featureType, featureUnit);
						}
					}
				});
			}
		}
		else {
			//TBD, handle ib lanes, ob lanes, path features...
		}
	}


}


export default LaneGGFeatureController;
