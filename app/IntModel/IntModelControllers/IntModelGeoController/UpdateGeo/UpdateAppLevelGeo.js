

/***************************************************************************
	Would:
		1. Update each attribute and remodel.
		2. Redraw if necessary.
****************************************************************************/
class UpdateAppLevelGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;

		this.modelIntGeo = modelGeo.modelIntGeo;
		this.redrawIntGeo = drawGeo.redrawIntGeo;

		this.getGeo = getGeo;
	}

	getCurApp(curAppIndex, language) {

		const curApp = this.getGeo.getAppLevelGeo.getApproachByAppIndex(curAppIndex, language);
		return curApp;
	}

	updateAppAngle(curAppIndex, nextAngle, ifReDraw, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		const canvasSize = this.intModel.canvasSize;
		curApp.appControllers.appGeoController.updateAppGeo.updateAppAngle(curApp, nextAngle);
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateAppIbStLen(curAppIndex, nextIbStLen, ifReDraw, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		const canvasSize = this.intModel.canvasSize;
		curApp.appControllers.appGeoController.updateAppGeo.updateAppIbStLen(curApp, nextIbStLen);
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateAppIbSlipLen(curAppIndex, nextIbSlipLen, ifReDraw, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		const canvasSize = this.intModel.canvasSize;
		curApp.appControllers.appGeoController.updateAppGeo.updateAppIbSlipLen(curApp, nextIbSlipLen);
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateAppIbStWidth(curAppIndex, nextIbStWidth, ifReDraw, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		const canvasSize = this.intModel.canvasSize;
		curApp.appControllers.appGeoController.updateAppGeo.updateAppIbStWidth(curApp, nextIbStWidth);
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateAppObStLen(curAppIndex, nextObStLen, ifReDraw, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		const canvasSize = this.intModel.canvasSize;
		curApp.appControllers.appGeoController.updateAppGeo.updateAppObStLen(curApp, nextObStLen);
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateAppObSlipLen(curAppIndex, nextObSlipLen, ifReDraw, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		const canvasSize = this.intModel.canvasSize;
		curApp.appControllers.appGeoController.updateAppGeo.updateAppObSlipLen(curApp, nextObSlipLen);
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateAppObStWidth(curAppIndex, nextObStWidth, ifReDraw, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		const canvasSize = this.intModel.canvasSize;
		curApp.appControllers.appGeoController.updateAppGeo.updateAppObStWidth(curApp, nextObStWidth);
		this.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateAppSpeedLimit(curAppIndex, nextSpeedLimit, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		curApp.appControllers.appGeoController.updateAppGeo.updateAppSpeedLimit(curApp, nextSpeedLimit);
		//this.modelIntGeo(canvasSize);
	}

	updateAppRoadClass(curAppIndex, nextRoadClass, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		curApp.appControllers.appGeoController.updateAppGeo.updateAppRoadClass(curApp, nextRoadClass);
		//this.modelIntGeo(canvasSize);
	}

	updateAppSlope(curAppIndex, nextSlope, language = 1) {
		const curApp = this.getCurApp(curAppIndex, language);
		curApp.appControllers.appGeoController.updateAppGeo.updateAppSlope(curApp, nextSlope);
	}

}

export default UpdateAppLevelGeo;
