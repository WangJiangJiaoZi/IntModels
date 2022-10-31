

class UpdateDivGroupLevelGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;
		this.redrawIntGeo = drawGeo.redrawIntGeo;
		this.modelIntGeo = modelGeo.modelIntGeo;

		this.getDivGroupLevelGeo = getGeo.getDivGroupLevelGeo;

		this.addDiv = this.addDiv.bind(this);
		this.removeDiv = this.removeDiv.bind(this);
	}

	addDiv(curAppIndex, nextDivType, nextDivBound, ifReDraw, language = 1) {
		let type, color, offset, startWidth, capRadius;

		//get divGroup:
		const divGroup = this.getDivGroupLevelGeo.getDivGroupByAppIndex(curAppIndex, language);
		const updateDivGroupGeo = divGroup.divGroupControllers.updateDivGroupGeo;

		//if inbound / outbound divider:
		if (nextDivBound === 1 || nextDivBound === 2) {
			//set default features:
			type = nextDivType; //single solid line
			color = (nextDivType === 8) ? "#426300" : "#FFFFFF";  //if 8, green; else, white
			offset = 0; //in meters
			startWidth = (nextDivType === 8) ? 1 : 0.3;  //in meters
			capRadius = (nextDivType === 8) ? 0.2 : 0; //in meters

			if (nextDivBound === 1) {
				updateDivGroupGeo.addIbDiv(
					divGroup, type, color, offset, startWidth, capRadius, language
				);
			}
			else {
				updateDivGroupGeo.addObDiv(
					divGroup, type, color, offset, startWidth, capRadius, language
				);
			}
		}
		//else, center divider:
		else {
			//set default features:
			type = nextDivType; //single solid line
			color = (nextDivType === 8) ? "#426300" : "#C57100";  //if 8, green; else, golden
			offset = 0; //in meters
			startWidth = (nextDivType === 8) ? 1 : 0.3;  //in meters
			capRadius = (nextDivType === 8) ? 0.2 : 0; //in meters

			const storageLength = 0;
			const storageSlipLength = 0;
			const storageWidth = 0;

			updateDivGroupGeo.addCenterDiv(
				divGroup, type, color, offset,
				storageLength, storageSlipLength, storageWidth,
				startWidth, capRadius, language
			);
		}

		//remodel:
		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);

		//redraw if necessary:
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}


	removeDiv(curAppIndex, nextDivBound, ifReDraw, language = 1) {
		//get divGroup:
		const divGroup = this.getDivGroupLevelGeo.getDivGroupByAppIndex(curAppIndex, language);
		const updateDivGroupGeo = divGroup.divGroupControllers.updateDivGroupGeo;

		//remove divider by divBound:
		if (nextDivBound === 1) {
			updateDivGroupGeo.removeIbDiv(divGroup, language);
		}
		else if (nextDivBound === 2) {
			updateDivGroupGeo.removeObDiv(divGroup, language);
		}
		else {
			updateDivGroupGeo.removeCenterDiv(divGroup, language);
		}

		//remodel:
		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);

		//redraw:
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateDivGeo(curAppIndex, nextDivBound, nextFeatureName, nextFeatureValue, ifReDraw, language = 1) {

		console.log(curAppIndex, nextDivBound, nextFeatureName, nextFeatureValue, ifReDraw)

		//get divGroup:
		const divGroup = this.getDivGroupLevelGeo.getDivGroupByAppIndex(curAppIndex, language);
		const updateDivGroupGeo = divGroup.divGroupControllers.updateDivGroupGeo;

		//update:
		updateDivGroupGeo.updateDivGeo(
			divGroup, nextDivBound, nextFeatureName, nextFeatureValue, language
		);

		//remodel:
		const canvasSize = this.intModel.canvasSize;
		this.modelIntGeo(canvasSize);

		//redraw:
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}


}

export default UpdateDivGroupLevelGeo;
