import IntModel from "./IntModel/IntModel";
import localGeoData2 from "./IntModel/LocalStorage/LocalGeoData/SWGeoData";
import localGeoData1 from "./IntModel/LocalStorage/LocalGeoData/NEGeoData";
import * as THREE from 'three';


const runIntIndex = () => {
  /***************************************************************************
   Import libraries when testing production
   ****************************************************************************/
    //import * as IntVisualLib from "./IntVisualLib";
    //import * as IntFormsComponent from "./IntFormComponent";



  console.log(THREE.REVISION)




  /***************************************************************************
   Import local geometry data when testing import from JSON
   ****************************************************************************/




  const localGeoJSON1 = JSON.stringify(localGeoData1);
  const localGeoJSON2 = JSON.stringify(localGeoData2);

  /***************************************************************************
   Instantiate intModel, setup env, download data, model, and draw
   ****************************************************************************/
  /**/
  const language = 1;  //1 for english, 2 for chinese
  const intModel1 = new IntModel(THREE, language);
  const intModel2 = new IntModel(THREE, language);



  //**************** set canvas size ****************
  const leftColElement = document.getElementById("left-col");
  const width = window.innerWidth ;
  const height = window.innerHeight ;

  const containerId = "container";

  const size = (width < height) ? height : width;
  const containerElement = document.createElement("div");
  containerElement.style.width = size;
  const margin = (width < height) ? 0 : ((width - size) / 2);
  containerElement.style.marginLeft = margin + "px";
  containerElement.id = containerId;
  leftColElement.appendChild(containerElement);

  const canvasSize = size*1.2;
  const dimension = 3;
  const intModelGeoController1 = intModel1.intModelControllers.intModelGeoController;
  const intModelGeoController2 = intModel2.intModelControllers.intModelGeoController;

  //***************** import geo, model int, and draw ****************
  intModelGeoController1.importExportGeo.importGeoFromJSON(localGeoJSON1);
  intModelGeoController1.modelGeo.modelIntGeo(canvasSize);
  intModelGeoController2.importExportGeo.importGeoFromJSON(localGeoJSON2);
  intModelGeoController2.modelGeo.modelIntGeo(canvasSize);


  intModelGeoController1.drawGeo.drawIntGeo(
      dimension, containerId, true, {
        translateY: -250
      }
  );
  intModelGeoController2.drawGeo.drawIntGeo(
      dimension, containerId, true
  );

  const intGroup1 = intModel1.intersection.intGroup.clone();
  intGroup1.translateX(144.3 * intModel1.meterToPixel)
  intGroup1.translateY(500 * intModel1.meterToPixel)
  intModel2.scene.add(intGroup1)


};


export default runIntIndex;