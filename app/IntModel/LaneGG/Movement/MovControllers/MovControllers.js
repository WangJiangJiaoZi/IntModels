

class MovControllers {
	constructor(movement) {
		this.movement = movement;
	}

	injectMovFeature(movFeatureValue, featureType, featureUnit) {
		let ifError = false;
		switch (featureType) {
			case "volume":
				this.movement.volume = movFeatureValue;
				this.movement.volumeUnit = featureUnit;
				break;
			case "delay":
				this.movement.delay = movFeatureValue;
				this.movement.delayUnit = featureUnit;
				break;
			case "stop":
				this.movement.stop = movFeatureValue;
				this.movement.stopUnit = featureUnit;
				break;
			case "queue":
				this.movement.queue = movFeatureValue;
				this.movement.queueUnit = featureUnit;
				break;
			case "overflow":
				this.movement.overflow = movFeatureValue;
				this.movement.overflowUnit = featureUnit;
				break;
			default:
				ifError = true;
		}

		if (ifError) {
				const info = this.movement.modelErrorHints.injectFeatureInfo;
				const reason = this.movement.modelErrorHints.injectFeatureReason;
				this.movement.handleInjectError(info, reason);
		}
	}
}


export default MovControllers;
