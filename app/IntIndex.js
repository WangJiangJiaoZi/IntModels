
import IntModel from "./IntModel/IntModel";
import Vue from "vue";


// import localGeoData from "./IntModel/LocalStorage/LocalGeoData/LocalGeoData_1";
//import localGeoData from "./IntModel/LocalStorage/LocalGeoData/temp";

import localGeoData from "./IntModel/LocalStorage/LocalGeoData/LocalDemoGeoData_1";
//import localGeoData from "./IntModel/LocalStorage/LocalGeoData/LocalDemoGeoData_2";
// import localGeoData from "./IntModel/LocalStorage/LocalGeoData/LocalDemoGeoData_3";

//import testIntJson1 from "./IntModel/LocalStorage/LocalGeoData/ForTests/TestGeoJson.json";

import localMovSetting from "./IntModel/LocalStorage/LocalFeatureData/LocalMovSetting_1.js";
import localFeatureData from "./IntModel/LocalStorage/LocalFeatureData/LocalFeatureData_1.js";


import * as THREE from 'three';

const runIntIndex = () => {


	/***************************************************************************
		Import libraries when testing production
	****************************************************************************/
	//import * as IntVisualLib from "./IntVisualLib";
	//import * as IntFormsComponent from "./IntFormComponent";


	/***************************************************************************
		Import local geometry data when testing import from JSON
	****************************************************************************/




	const localGeoJSON = JSON.stringify(localGeoData);
	//const localGeoJSON = JSON.stringify(testIntJson1);

	/***************************************************************************
		Instantiate intModel, setup env, download data, model, and draw
	****************************************************************************/
	/**/
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

	//***************** import geo, model int, and draw ****************

	/*
	intModelGeoController.importExportGeo.importGeoFromDB(0, "http://t-pod.didichuxing.com/junction/geominfo/1234").then(() => {
		intModelGeoController.modelGeo.modelIntGeo(canvasSize);
		intModelGeoController.drawGeo.drawIntGeo(dimension, "container");
	});
	*/
	intModelGeoController.importExportGeo.importGeoFromJSON(localGeoJSON);
	intModelGeoController.modelGeo.modelIntGeo(canvasSize);
	intModelGeoController.drawGeo.drawIntGeo(dimension, "container");

	console.log(intModelGeoController.getGeo.getAppLevelGeo.getAllAppAngles());

	/***************************************************************************
								Int form test
	****************************************************************************/

	//import intForms from "./IntForms";
	//***************** set intForm size ****************
	document.getElementById("right-col").style.width = window.innerWidth - width + "px";
	const sideModeContainerWidth = window.innerWidth - width;//parseFloat(intFormsStyle.getPropertyValue("width"), 10);
	const fullModeContainerWidth = window.innerWidth;
	const desiredHeight = height;

	/*
	const intFormContainerId = "forms";
	const mode = 1;  //1 for side mode, 2 for full mode

	//intForm would be an vue component
	const intForm = intForms(
		Vue, intModel, intFormContainerId, mode, sideModeContainerWidth, fullModeContainerWidth, desiredHeight, language
	);
	*/

	/***************************************************************************
								Sig Int test
	****************************************************************************/
	/*
	import uuidv4 from "uuid/v4";
	import enErrorHints from "./SigIntModel/EnglishErrorHints.json";
	import chErrorHints from "./SigIntModel/ChineseErrorHints.json";

	const errorHints = (language === 1) ? enErrorHints : chErrorHints;

	const PIXI = require("./Vendors/pixi/pixi.min.js");

	import SigIntModel from "./SigIntModel/SigIntModel";
	const sigIntModel = new SigIntModel(intModel, THREE, PIXI, uuidv4, errorHints);



	import localSigGroupData from "./SigIntModel/SigLocalStorage/localSigGroupData_1";
	import localPhaseData from "./SigIntModel/SigLocalStorage/LocalPhaseData_1";
	import localPedPhaseData from "./SigIntModel/SigLocalStorage/LocalPedPhaseData_1";
	import localPhaseSequenceData from "./SigIntModel/SigLocalStorage/LocalPhaseSequenceData_1";

	import localBaseSigDesignData from "./SigIntModel/SigLocalStorage/LocalBaseSigDesignData_1";
	//import localPatternData from "./SigIntModel/SigLocalStorage/LocalPatternData_1";



	sigIntModel.sigIntModelController.importExportSig.importBsdFromLocal(localBaseSigDesignData);
	//sigIntModel.sigIntModelController.importExportSig.importPatternsFromLocal(localPatternData);
	*/


	/***************************************************************************
								Signal Form test
	****************************************************************************/
	/*
	import signalForms from "./SignalForms";
	import englishStrings from "./SignalForms/English_Strings.json";
	import chineseStrings from "./SignalForms/Chinese_Strings.json";


	const sigFormContainerId = "forms";
	const mode = 1;  //1 for side mode, 2 for full mode
	const titleStrings = (language === 1) ? englishStrings : chineseStrings;

	//would get a Vue component named signalForms
	const signalForm = signalForms(
		Vue, sigIntModel, sigFormContainerId, mode,
		sideModeContainerWidth, fullModeContainerWidth, window.innerHeight - 40,
		titleStrings
	);
	*/

	/***************************************************************************
								Buttons test
	****************************************************************************/

	/*
	const featureTestButton1 = document.getElementById("test-button-1");
	featureTestButton1.addEventListener("click", () => {
		const layerId = 1;
		const materialValuesObj = {transparent: true, opacity: 0.5};
		intModelGeoController.updateGeo.updateIntLevelGeo.updateIntLayerMaterialValues(
			layerId, materialValuesObj, language
		);

		const fromAppIndex = 4;
		const signalGroupId = 0;
		const toAppIndex = 0;
		const arrowColor = "#E1A00A";
		sigIntModel.sigIntModelController.drawSig.toggleIntSignalArrow(
			fromAppIndex, signalGroupId, toAppIndex, arrowColor, language
		);
	});
	*/

	/*
	const featureTestButton2 = document.getElementById("test-button-2");
	featureTestButton2.addEventListener("click", () => {

		sigIntModel.sigIntModelController.modelSig.modelIntSig();

		const fromAppIndex = 4;
		const signalGroupIndex = 0;
		const toAppIndex = 0;
		const arrowColor = "#E1A00A";

		sigIntModel.sigIntModelController.drawSig.toggleIntSignalArrow(
			fromAppIndex, signalGroupIndex, toAppIndex, arrowColor, language
		);
	});
	*/


	/***************************************************************************
								Export test
	****************************************************************************/
	/*
	import addGLTFExporterToThree from "./Vendors/three/js/exporters/MyGLTFExporter";

	addGLTFExporterToThree(THREE);
	const featureTestButton1 = document.getElementById("test-button-3");
	featureTestButton1.addEventListener("click", () => {
		exportGLTF(intModel.intersection.intGroup);

	});


	function exportGLTF(input) {
		var gltfExporter = new THREE.GLTFExporter();
		var options = {
			trs: false,
			onlyVisible: true,
			truncateDrawRange: true,
			binary: false,
			forceIndices: false,
			forcePowerOfTwoTextures: false
		};


		gltfExporter.parse(input, function(result) {
			if ( result instanceof ArrayBuffer ) {
				saveArrayBuffer( result, "scene.glb" );
			} else {
				var output = JSON.stringify( result, null, 2 );
				saveString( output, "scene.gltf" );
			}
		}, options);
	}

	function saveString( text, filename ) {
		save( new Blob( [ text ], { type: "text/plain" } ), filename );
	}
	function saveArrayBuffer( buffer, filename ) {
		save( new Blob( [ buffer ], { type: "application/octet-stream" } ), filename );
	}


	var link = document.createElement( "a" );
	link.style.display = "none";
	document.body.appendChild( link ); // Firefox workaround, see #6594
	function save( blob, filename ) {
		link.href = URL.createObjectURL( blob );
		link.download = filename;
		link.click();
		// URL.revokeObjectURL( url ); breaks Firefox...
	}
	*/

	/*
	const myTestInterval = setInterval(() => {
		intModel.intModelControllers.intModelGeoController.drawGeo.redrawIntGeo();
		console.log("did");
	}, 4000);
	*/
	const featureTestButton4 = document.getElementById("test-button-4");
	let curColor = 0xe60800;
	featureTestButton4.addEventListener("click", () => {
		curColor = (curColor === 0xe60800) ? 0x00e61f : 0xe60800;
		intModel.intModelControllers.intModelGeoController.drawGeo.drawLaneArrowColor(0, 1, curColor);
	});
	const featureTestButton2 = document.getElementById("test-button-2");
	featureTestButton2.addEventListener("click", () => {
		intModelGeoController.modelGeo.modelIntGeo(canvasSize);
		intModel.intModelControllers.intModelGeoController.drawGeo.redrawIntGeo();
		//intModel.intModelControllers.intModelGeoController.updateGeo.updateModelLevelGeo.disposeIntModel();
	});
	const featureTestButton3 = document.getElementById("test-button-3");
	featureTestButton3.addEventListener("click", () => {
		//intModel.intModelControllers.intModelGeoController.drawGeo.drawToggledDimensionIntGeo();
		intModel.intModelControllers.intModelGeoController.updateGeo.updateModelLevelGeo.disposeIntModel();
	});
	/*
	const featureTestButton3 = document.getElementById("test-button-3");
	featureTestButton3.addEventListener("click", () => {
		const sigDesignInfo = sigIntModel.sigIntModelController.importExportSig.exportBsdForDB();
		const patternsInfo = sigIntModel.sigIntModelController.importExportSig.exportPatternsForDB();
		console.log(sigDesignInfo);
		//console.log(JSON.stringify(patternsInfo));
	});
	*/


	/*
	const toggleDimensionButton = document.getElementById("toggle-dimension-button");
	toggleDimensionButton.addEventListener("click", () => {
		intModelGeoController.drawGeo.drawToggledDimensionIntGeo();
	});


	const exportGeoButton = document.getElementById("export-button");
	exportGeoButton.addEventListener("click", () => {
		const geoDataToExport = intModelGeoController.importExportGeo.exportGeoToObj();

		const geoDataJSON = JSON.stringify(geoDataToExport);
		console.log(geoDataToExport)
		console.log(geoDataJSON)
	});
	*/







	/***************************************************************************
								Info Box Test
	****************************************************************************/
	/*
	const toggleInfoBox = (infoMessage) => {
		const infoBoxContainer = document.getElementById("info-box-container");
		infoBoxContainer.style.display = (infoBoxContainer.style.display === "block") ? "none" : "block";

		const infoBoxMessage = document.getElementById("info-box-message");
		infoBoxMessage.innerHTML = infoMessage;
	};

	const closeInfoBoxButton = document.getElementById("close-info-box");
	closeInfoBoxButton.addEventListener("click", () => {
		const infoBoxContainer = document.getElementById("info-box-container");
		infoBoxContainer.style.display = (infoBoxContainer.style.display === "block") ? "none" : "block";
	});
	*/

	/***************************************************************************
								Models Form
	****************************************************************************/
	/*
	import geometryModelFormConnector from "./ToolsForms/GeometryModelForm/GeometryModelFormConnector";

	const toolFormContainerId = "tool-form-container";
	const canvasContainerId = "container";

	geometryModelFormConnector({
		Vue: Vue,
		intModel: intModel,
		intForm: intForm,
		toolFormContainerId: toolFormContainerId,
		canvasContainerId: canvasContainerId,
		canvasSize: canvasSize,
		toggleInfoBox: toggleInfoBox,
		language: language
	});
	*/












};

export default runIntIndex;
