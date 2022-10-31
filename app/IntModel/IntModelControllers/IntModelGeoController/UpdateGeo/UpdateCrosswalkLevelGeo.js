


class UpdateCrosswalkLevelGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;
		this.modelIntGeo = modelGeo.modelIntGeo;
		this.redrawIntGeo = drawGeo.redrawIntGeo;
		this.getGeo = getGeo;
	}

	_getCurCrosswalk(curAppIndex, language) {
		const curCrosswalk = this.getGeo.getCrosswalkLevelGeo.getCrosswalkByAppIndex(curAppIndex, language);
		return curCrosswalk;
	}

	_modelAndRedraw(ifReDraw) {
		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);

		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateIfCrosswalk(curAppIndex, nextIfCrosswalk, ifReDraw, language = 1) {
		const curCrosswalk = this._getCurCrosswalk(curAppIndex, language);

		curCrosswalk.crosswalkControllers.updateCrosswalkGeo.updateIfCrosswalk(
			curCrosswalk, nextIfCrosswalk, language
		);

		this._modelAndRedraw(ifReDraw);
	}

	updateCrosswalkAngle(curAppIndex, nextAngle, ifReDraw, language = 1) {
		const curCrosswalk = this._getCurCrosswalk(curAppIndex, language);

		curCrosswalk.crosswalkControllers.updateCrosswalkGeo.updateCrosswalkAngle(
			curCrosswalk, nextAngle, language
		);

		this._modelAndRedraw(ifReDraw);
	}

	updateCrosswalkWidth(curAppIndex, nextWidth, ifReDraw, language = 1) {
		const curCrosswalk = this._getCurCrosswalk(curAppIndex, language);

		curCrosswalk.crosswalkControllers.updateCrosswalkGeo.updateCrosswalkWidth(
			curCrosswalk, nextWidth, language
		);

		this._modelAndRedraw(ifReDraw);
	}

	updateCrosswalkOffset(curAppIndex, nextOffset, ifReDraw, language = 1) {
		const curCrosswalk = this._getCurCrosswalk(curAppIndex, language);

		curCrosswalk.crosswalkControllers.updateCrosswalkGeo.updateCrosswalkOffset(
			curCrosswalk, nextOffset, language
		);

		this._modelAndRedraw(ifReDraw);
	}

	updateCrosswalkBuffer(curAppIndex, nextBuffer, ifReDraw, language = 1) {
		const curCrosswalk = this._getCurCrosswalk(curAppIndex, language);

		curCrosswalk.crosswalkControllers.updateCrosswalkGeo.updateCrosswalkBuffer(
			curCrosswalk, nextBuffer, language
		);

		this._modelAndRedraw(ifReDraw);
	}

	updateCrosswalkHeight(curAppIndex, nextHeight, ifReDraw, language = 1) {
		const curCrosswalk = this._getCurCrosswalk(curAppIndex, language);

		curCrosswalk.crosswalkControllers.updateCrosswalkGeo.updateCrosswalkHeight(
			curCrosswalk, nextHeight, language
		);

		this._modelAndRedraw(ifReDraw);
	}

	updateCrosswalkGap(curAppIndex, nextGap, ifReDraw, language = 1) {
		const curCrosswalk = this._getCurCrosswalk(curAppIndex, language);

		curCrosswalk.crosswalkControllers.updateCrosswalkGeo.updateCrosswalkGap(
			curCrosswalk, nextGap, language
		);

		this._modelAndRedraw(ifReDraw);
	}
}

export default UpdateCrosswalkLevelGeo;
