

class UpdateCornerLevelGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;

		this.modelIntGeo = modelGeo.modelIntGeo;
		this.redrawIntGeo = drawGeo.redrawIntGeo;

		this.getGeo = getGeo;
	}

	getCurCorner(curAppIndex, language = 1) {
		//const approaches = this.intModel.intersection.approaches;
		//const curCorner = approaches[curAppIndex].corner;
		const curCorner = this.getGeo.getCornerLevelGeo.getCornerByAppIndex(curAppIndex, language);
		return curCorner;
	}

	//if update from type 1 or 2 to type 3, default change is to first also
	//update channel width, entry and exit width to 3.
	//Similarly, if update from type 3 to type 1 or 2, default change is to first
	//update channel entry and exit width to 3.
	updateCornerType(curAppIndex, nextCornerType, ifReDraw, language = 1) {
		const curCorner = this.getCurCorner(curAppIndex);
		const curCornerType = curCorner.cornerType;

		if (nextCornerType === 3) {
			curCorner.cornerControllers.updateCornerGeo.updateCornerChannelWidth(
				curCorner, 3
			);
			curCorner.cornerControllers.updateCornerGeo.updateCornerIbWidth(
				curCorner, 3
			);
			curCorner.cornerControllers.updateCornerGeo.updateCornerObWidth(
				curCorner, 3
			);
		}
		else if (curCornerType === 3) {
			curCorner.cornerControllers.updateCornerGeo.updateCornerIbWidth(
				curCorner, 0
			);
			curCorner.cornerControllers.updateCornerGeo.updateCornerObWidth(
				curCorner, 0
			);
		}

		curCorner.cornerControllers.updateCornerGeo.updateCornerType(
			curCorner, nextCornerType
		);

		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateCornerRadius(curAppIndex, nextCornerRadius, ifReDraw, language = 1) {
		const curCorner = this.getCurCorner(curAppIndex);
		curCorner.cornerControllers.updateCornerGeo.updateCornerRadius(
			curCorner, nextCornerRadius
		);

		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateCornerIbWidth(curAppIndex, nextCornerIbWidth, ifReDraw, language = 1) {
		const curCorner = this.getCurCorner(curAppIndex);
		curCorner.cornerControllers.updateCornerGeo.updateCornerIbWidth(
			curCorner, nextCornerIbWidth
		);

		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateCornerObWidth(curAppIndex, nextCornerObWidth, ifReDraw, language = 1) {
		const curCorner = this.getCurCorner(curAppIndex);
		curCorner.cornerControllers.updateCornerGeo.updateCornerObWidth(
			curCorner, nextCornerObWidth
		);

		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}


	updateCornerChannelWidth(curAppIndex, nextCornerChannelWidth, ifReDraw, language = 1) {
		const curCorner = this.getCurCorner(curAppIndex);
		curCorner.cornerControllers.updateCornerGeo.updateCornerChannelWidth(
			curCorner, nextCornerChannelWidth
		);

		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

}


export default UpdateCornerLevelGeo;
