


class DirNameModelers {
	constructor(dirName) {
		this.dirName = dirName;
	}

	/************************************************************************************
		Would update:
			dirName.dirNameGeo.textLeftGap = xxx,  //text left gap in pixel
			dirName.dirNameGeo.panelWidth = xxx, //panel width in pixel
			dirName.dirNameGeo.panelHeight = xxx,  //panel height in pixel
			dirName.dirNameGeo.panelCp = [x, y],  //panel center point
	*************************************************************************************/

	modelDirNameGeo(intSize, meterToPixel) {
		//************************** Prepare index to use ********************************
		const dirName = this.dirName;
		const envSetters = dirName.text.approach.intersection.intModel.envSetters;

		const app = dirName.text.approach;
		const appRightIsEp = app.appGeo.innerRightEp;  //[x, y]
		const appLeftIsEp = app.appGeo.innerLeftEp;  //[x, y]
		const appRightOsSp = app.appGeo.outerRightSp;  //[x, y]
		const appRightOsEp = app.appGeo.outerRightEndPoint;  //[x, y]

		const gap = 3.5 * meterToPixel;  //in pixel


		//************************** Decide panel ********************************
		const panelHeight = envSetters.textPanelHeight * meterToPixel;  //in pixel
		const panelWidth = panelHeight * 3 * 0.8;

		const appEndMidP = [
			(appRightIsEp[0] + appLeftIsEp[0]) / 2,
			(appRightIsEp[1] + appLeftIsEp[1]) / 2
		];
		const appEndMidPVec = new dirName.THREE.Vector2(
								appEndMidP[0], appEndMidP[1]
							);

		const panelCpVec = new dirName.THREE.Vector2(
							appRightOsEp[0] - appRightOsSp[0],
							appRightOsEp[1] - appRightOsSp[1]
						);
		panelCpVec.setLength(gap + panelHeight / 2);
		panelCpVec.add(appEndMidPVec);

		const panelCp = [panelCpVec.x, panelCpVec.y];


		//************************** Update dirNameGeo ********************************
		//dirName.appNameGeo.textLeftGap = xxx,  //text left gap in pixel
		dirName.dirNameGeo.panelWidth = panelWidth; //panel width in pixel
		dirName.dirNameGeo.panelHeight = panelHeight;  //panel height in pixel
		dirName.dirNameGeo.panelCp = panelCp;  //panel center point
	}
}


export default DirNameModelers;
