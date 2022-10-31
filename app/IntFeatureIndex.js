

import IntModel from "./IntModel/IntModel";
import Vue from "vue";

import * as THREE from 'three';


import localGeoData from "./IntModel/LocalStorage/LocalGeoData/LocalGeoData_1";
import localMovSetting from "./IntModel/LocalStorage/LocalFeatureData/LocalMovSetting_1.js";
import localFeatureData from "./IntModel/LocalStorage/LocalFeatureData/LocalFeatureData_1.js";

const runIntFeatureIndex = () => {
	const localGeoJSON = JSON.stringify(localGeoData);

	const language = 1;  //1 for english, 2 for chinese
	const intModel = new IntModel(THREE, language);



	//**************** set canvas size ****************
	const leftColElement = document.getElementById("left-col");
	const width = window.innerWidth * 0.5;//leftColElement.offsetWidth;
	const height = window.innerHeight - 60;

	const size = (width > height) ? (height - 24) : width;
	const containerElement = document.createElement("div");
	containerElement.style.width = size;
	const margin = (width < height) ? 0 : ((width - size) / 2);
	containerElement.style.marginLeft = margin + "px";
	containerElement.id = "container";
	leftColElement.appendChild(containerElement);

	const canvasSize = size;
	const dimension = 2;
	const intModelGeoController = intModel.intModelControllers.intModelGeoController;


	/***************************************************************************
								Geometry
	****************************************************************************/
	intModelGeoController.importExportGeo.importGeoFromJSON(localGeoJSON);
	intModelGeoController.modelGeo.modelIntGeo(canvasSize);
	intModelGeoController.drawGeo.drawIntGeo(dimension, "container");


	/***************************************************************************
								Features
	****************************************************************************/
	/*	*/
	const intModelFeatureController = intModel.intModelControllers.intModelFeatureController;
	intModelFeatureController.impExportFeature.setupMovementFrJSON(JSON.stringify(localMovSetting));
	intModelFeatureController.impExportFeature.importFeatureFrJSON(JSON.stringify(localFeatureData));
	intModelFeatureController.modelFeature.modelIntFeature();
	intModelFeatureController.drawFeature.drawIntersectionFeature("LOS");
	intModelFeatureController.drawFeature.drawMovementFeature("volume");

	/***************************************************************************
							Buttons' test
	****************************************************************************/
	/*	*/
	const featureTestButton2 = document.getElementById("test-button-2");
	featureTestButton2.addEventListener("click", () => {
		intModelFeatureController.drawFeature.undrawIntersectionFeature();
		intModelFeatureController.drawFeature.undrawMovementFeature();
	});


	const featureTestButton3 = document.getElementById("test-button-3");
	featureTestButton3.addEventListener("click", () => {
		intModelFeatureController.drawFeature.drawIntersectionFeature("controlType");
		//intModel.intModelControllers.intModelGeoController.updateGeo.updateModelLevelGeo.disposeIntModel();
	});


	/***************************************************************************
							Feature Form test
	****************************************************************************/
	//***************** set intForm size ****************
	/*
	document.getElementById("right-col").style.width = window.innerWidth - width + "px";
	const sideModeContainerWidth = window.innerWidth - width;//parseFloat(intFormsStyle.getPropertyValue("width"), 10);
	const fullModeContainerWidth = window.innerWidth;
	const desiredHeight = height;

	const intFormContainerId = "forms";
	const mode = 1;  //1 for side mode, 2 for full mode

	import signalForms from "./SignalForms";
	import englishStrings from "./SignalForms/English_Strings.json";
	import chineseStrings from "./SignalForms/Chinese_Strings.json";


	const featureFormContainerId = "forms";
	const mode = 1;  //1 for side mode, 2 for full mode
	const titleStrings = (language === 1) ? englishStrings : chineseStrings;

	//would get a Vue component named signalForms
	const featureForm = featureForms(
		Vue, sigIntModel, sigFormContainerId, mode,
		sideModeContainerWidth, fullModeContainerWidth, window.innerHeight - 40,
		titleStrings
	);
	*/

};


export default runIntFeatureIndex;

