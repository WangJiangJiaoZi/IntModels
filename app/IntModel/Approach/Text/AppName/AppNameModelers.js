

//import SharedGeometryLib from "../../../SharedGeometryLib";


class AppNameModelers {
	constructor(appName) {
		this.appName = appName;
	}

	/************************************************************************************
		Would update:
			appName.appNameGeo.textLeftGap = xxx,  //text left gap in pixel
			appName.appNameGeo.textTopGap = xxx,  //text top gap in pixel
			appName.appNameGeo.panelWidth = xxx, //panel width in pixel
			appName.appNameGeo.panelHeight = xxx,  //panel height in pixel
			appName.appNameGeo.panelCp = [x, y],  //panel center point
	*************************************************************************************/
	modelAppNameGeo(intSize, meterToPixel) {
		//************************** Prepare index to use ********************************
		const envSetters = this.appName.text.approach.intersection.intModel.envSetters;

		const app = this.appName.text.approach;
		const appAngle = app.appAngle * Math.PI / 180;  //in radians
		const appRightOsSp = app.appGeo.outerRightSp;  //[x, y]
		const appRightOsEp = app.appGeo.outerRightEndPoint;  //[x, y]
		const appLeftOsEp = app.appGeo.outerLeftEndPoint;  //[x, y]
		const appLeftOsSp = app.appGeo.outerLeftSp;  //[x, y]

		const gapWidth = 3.5 * meterToPixel;  //gap in pixel between approach outerside and name panel
		const panelHeight = envSetters.textPanelHeight * meterToPixel; //in pixel
		const panelWidth = panelHeight * 6;  //in pixel

		const name = this.appName.name;  //name to write (string)


		//************************** Decide gaps ********************************
		const nameLen = name.length;  //number of characters
		let leftGap = (nameLen < 8) ? (panelWidth - panelHeight * nameLen * 0.8) : 0;
		leftGap = (appAngle < Math.PI) ? leftGap : 0;
		const topGap = panelHeight * 0.8 * 10;

		//************************** Decide ceneter point ********************************
		const appName = this.appName;
		const panelWidthVec = new appName.THREE.Vector2(
								appRightOsEp[0] - appRightOsSp[0],
								appRightOsEp[1] - appRightOsSp[1]
							);
		panelWidthVec.setLength(panelWidth);

		const panelHeightVec = new appName.THREE.Vector2(
								appLeftOsEp[0] - appRightOsEp[0],
								appLeftOsEp[1] - appRightOsEp[1]
							);
		panelHeightVec.setLength(panelHeight);

		const panelCpVec = new appName.THREE.Vector2(
							appLeftOsEp[0] - appRightOsEp[0],
							appLeftOsEp[1] - appRightOsEp[1]
						);
		panelCpVec.setLength(gapWidth + panelHeight / 2);
		const appRightOsEpVec = new appName.THREE.Vector2(appLeftOsEp[0], appLeftOsEp[1]);
		panelCpVec.add(appRightOsEpVec);

		const revPanelHeightVec = new appName.THREE.Vector2(
								-appLeftOsEp[0] + appLeftOsSp[0],
								-appLeftOsEp[1] + appLeftOsSp[1]
							);
		revPanelHeightVec.setLength(panelWidth * 0.5);

		panelCpVec.add(revPanelHeightVec);

		const panelCp = [panelCpVec.x, panelCpVec.y];

		//******************* Update appNameGeo and appNameShape *************************
		appName.appNameGeo.textLeftGap = leftGap;  //text left gap in pixel
		appName.appNameGeo.textTopGap = topGap;  //text top gap in pixel
		appName.appNameGeo.panelWidth = panelWidth; //panel width in pixel
		appName.appNameGeo.panelHeight = panelHeight;  //panel height in pixel
		appName.appNameGeo.panelCp = panelCp;  //panel center point
	}
}


export default AppNameModelers;
