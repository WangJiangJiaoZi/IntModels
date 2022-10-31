import IntModel from "./IntModel/IntModel";
import localGeoData from "./IntModel/LocalStorage/LocalGeoData/LocalDemoGeoData_1";
import TWEEN from "@tweenjs/tween.js";
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader }  from 'three/examples/jsm/loaders/MTLLoader.js';
import { Vector2  } from 'three';


const runSimuIntIndex = () => {
  /***************************************************************************
   Import libraries when testing production
   ****************************************************************************/
    //import * as IntVisualLib from "./IntVisualLib";
    //import * as IntFormsComponent from "./IntFormComponent";



  console.log(THREE.REVISION)




  /***************************************************************************
   Import local geometry data when testing import from JSON
   ****************************************************************************/




  const localGeoJSON = JSON.stringify(localGeoData);

  /***************************************************************************
   Instantiate intModel, setup env, download data, model, and draw
   ****************************************************************************/
  /**/
  const language = 1;  //1 for english, 2 for chinese
  const intModel = new IntModel(THREE, language);



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
  containerElement.id = "container";
  leftColElement.appendChild(containerElement);

  const canvasSize = size*1.2;
  const dimension = 2;
  const intModelGeoController = intModel.intModelControllers.intModelGeoController;

  //***************** import geo, model int, and draw ****************
  intModelGeoController.importExportGeo.importGeoFromJSON(localGeoJSON);
  intModelGeoController.modelGeo.modelIntGeo(canvasSize);


  //***************** deal with vehicles ****************
  const meterToPix = intModel.meterToPixel;
  const scale = 1.2;
  // for inbound:
  //const angle = Math.PI - intModel.intersection.approaches[3].appAngle * Math.PI / 180;
  //const [a,b] = intModel.intersection.approaches[3].laneGG.laneGGGeo.stopOuterEp;
  function getInBoundTransformParams(approach) {
    const angle = approach.appAngle * Math.PI / 180;
    const centerDivider = approach.dividerGroup.dividers.find(oneDiv => oneDiv.dividerType === 3);
    const [tx, ty] = centerDivider.divGeo.centerIbSp || centerDivider.divGeo.centerMidSp;
    return [Math.PI-angle, tx, ty];
  }
  function getOutBoundTransformParams(approach) {
    const angle = approach.appAngle * Math.PI / 180;
    const centerDivider = approach.dividerGroup.dividers.find(oneDiv => oneDiv.dividerType === 3);
    const [tx, ty] = centerDivider.divGeo.centerObSp || centerDivider.divGeo.centerMidSp;
    return [Math.PI*2-angle, tx, ty];
  }

  function vehicleGenerator(THREE, obj, meterToPix, intersection, inAppIdx, inLaneIdx, outAppIdx, outLaneIdx, delay){
    const [angle_in, tx_in, ty_in] = getInBoundTransformParams(intersection.approaches[inAppIdx]);
    const [angle_out, tx_out, ty_out] = getOutBoundTransformParams(intersection.approaches[outAppIdx]);
    const xs_in = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5].map(w => w * (inLaneIdx + 1) - 1.75);
    const ys_in = [-55, -45, -35, -25, -19, -12, -6, 0, 6];
    const routeIn = new Route(THREE, xs_in, ys_in, meterToPix, angle_in, tx_in, ty_in);

    const xs_out = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5].map(w => w * (outLaneIdx + 1) - 1.75);
    const ys_out = [-10, -6, -1, 5, 10, 15, 20, 25,30,35,40,45,50,55,60];
    const routeOut = new Route(THREE, xs_out, ys_out, meterToPix, angle_out, tx_out, ty_out);

    const veh = new Vehicle(THREE, obj.clone());
    veh.injectRoutes('inbound', routeIn);
    veh.injectRoutes('outbound', routeOut);
    veh.genRoute()
    veh.initRoutes();
    veh.runVehicle(vehsTweenGroup, delay);
    return veh;
  }

  const [angle_0, tx_0, ty_0] = getOutBoundTransformParams(intModel.intersection.approaches[0]);
  const [angle_2, tx_2, ty_2] = getInBoundTransformParams(intModel.intersection.approaches[2]);
  const [angle_3, tx_3, ty_3] = getOutBoundTransformParams(intModel.intersection.approaches[3]);
  // debugger
  const vehsTweenGroup = new TWEEN.Group();

  const objLoader = new OBJLoader();
  objLoader.setPath('Resources/');
  const mtlLoader = new MTLLoader();
  mtlLoader.setPath('Resources/');
  mtlLoader.load('car-black.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('car-black.obj', (carBlack) => {
      mtlLoader.load('car-white.mtl', (whiteMtl) => {
        whiteMtl.preload()
        objLoader.setMaterials(whiteMtl);
        objLoader.load('car-white.obj', (carWhite) => {
          carWhite.scale.set(scale,scale,scale);
          carBlack.scale.set(scale,scale,scale);

          mtlLoader.load('bus.mtl', (busMtl) => {
            busMtl.preload()
            objLoader.setMaterials(busMtl);
            objLoader.load('bus.obj', (bus) => {
              bus.scale.set(scale,scale,scale);

              let xs1 = [5.25, 5.25, 3.5, 1.75, 1.75, 1.75, 1.75, 1.75, 1.75, 1.75, 1.75, 1.75];
              let ys1 = [-65, -55, -45, -35, -25, -19, -12, -6, -1, 3, 4.5, 5];
              const routeIn = new Route(THREE, xs1, ys1, meterToPix, angle_2, tx_2, ty_2);

              let xs2 = [6.25,6.25,6.25,6.25,6.25,6.25,6.25,6.25,6.25,6.25,6.25,6.25,6.25,6.25,6.25];
              let ys2 = [-10, -6, -1, 5, 10, 15, 20, 25,30,35,40,45,50,55,60];
              const routeOut = new Route(THREE, xs2, ys2, meterToPix, angle_3, tx_3, ty_3);

              const vehs = [];
              for(let i = 0; i < 100; i++) {
                const o = i%2? carBlack: carWhite;
                const veh = vehicleGenerator(THREE, o, meterToPix, intModel.intersection,
                    i%4, i%3, 3 - i%4, 2-i%3, i*500*(i%2+1))

                // const objAxis = new THREE.AxesHelper(200);
                // o.add(objAxis);
                vehs.push(veh);
              }

              // ***** veh1 ******
              const veh1 = new Vehicle(THREE, bus.clone());
              veh1.injectRoutes('inbound', routeIn);
              veh1.injectRoutes('outbound', routeOut);
              veh1.genRoute()
              veh1.initRoutes();
              veh1.runVehicle(vehsTweenGroup, 3000);

              let xs3 = [5.25, 5.25, 5.25, 5.25, 5.25, 5.25, 5.25, 5.25, 5.25];
              let ys3 = [-55, -45, -35, -25, -19, -12, -6, 0, 6];
              const routeIn_2 = new Route(THREE, xs3, ys3, meterToPix, angle_2, tx_2, ty_2);

              let xs4 = [1.75,1.75,1.75,1.75,1.75,1.75,1.75,1.75,1.75,1.75,1.75,1.75,1.75,1.75,1.75];
              let ys4 = [-10, -6, -1, 5, 10, 15, 20, 25,30,35,40,45,50,55,60];
              const routeOut_2 = new Route(THREE, xs4, ys4, meterToPix, angle_0, tx_0, ty_0);

              // ***** veh1 ******
              const veh2 = new Vehicle(THREE, carWhite.clone());
              veh2.injectRoutes('inbound', routeIn_2);
              veh2.injectRoutes('outbound', routeOut_2);
              veh2.genRoute()
              veh2.initRoutes();
              veh2.runVehicle(vehsTweenGroup, 3000);

              const onUpdate = vehsTweenGroup.update.bind(vehsTweenGroup);

              const sphere_2 = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 8), new THREE.MeshBasicMaterial({color: "red", wireframe: true}));
              sphere_2.position.set(tx_2, ty_2, 0);
              const sphere_3 = sphere_2.clone()
              sphere_3.position.set(tx_3, ty_3, 0);
              const objs = [veh1.car, ...vehs.map(veh => veh.car)];

              intModelGeoController.drawGeo.drawIntGeo(
                  dimension, "container", true, {onUpdate: onUpdate, objs: objs}
              );

              let clickNum = 0;
              const red = 0xFF0000;
              const green = 0x00FF00;
              const laneColorList = [
                [[0, 0, red], [0, 1, green], [0, 2, green], [1, 0, red], [1, 1, red], [1, 2, green], [2, 0, red], [2, 1, green], [2, 2, green], [3, 0, red], [3, 1, red], [3, 2, red], [3, 3, green]],
                [[0, 0, green], [0, 1, red], [0, 2, red], [1, 0, red], [1, 1, red], [1, 2, green], [2, 0, green], [2, 1, red], [2, 2, red], [3, 0, red], [3, 1, red], [3, 2, red], [3, 3, green]],
              ]
              laneColorList[clickNum%2].forEach(colorConf => {
                intModel.intModelControllers.intModelGeoController.drawGeo.drawLaneArrowColor(...colorConf);
              })
              document.getElementById(containerId).addEventListener( 'click', (e) => {
                laneColorList[clickNum%2].forEach(colorConf => {
                  intModel.intModelControllers.intModelGeoController.drawGeo.drawLaneArrowColor(...colorConf);
                })
                clickNum += 1
              }, false );
            })
          })
        })
        });
      });
    });


};

class Route {
  constructor(THREE, xsMeter, ysMeter, pixPerMeter, angle, txPix, tyPix ) {
    this.THREE = THREE;
    this.xs = xsMeter;
    this.ys = ysMeter;
    this.pixPerMeter = pixPerMeter;
    this.angle = angle;
    this.txPix = txPix;
    this.tyPix = tyPix;
    this.routeX = [];
    this.routeY = [];
  }
  transformPixRoute() {
    const tmpRouteX = this.xs.map(x => x*this.pixPerMeter);
    const tmpRouteY = this.ys.map(y => y*this.pixPerMeter);
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);
    this.routeX = tmpRouteX.map((x, index) => x * cos - tmpRouteY[index] * sin + this.txPix);
    this.routeY = tmpRouteY.map((y, index) => tmpRouteX[index] * sin + y * cos + this.tyPix);
  }
}


class Vehicle {
  constructor(THREE, obj) {
    this.THREE = THREE;
    this.car = obj;
    this.xs = [];
    this.ys = [];
    this.transformedXs = [];
    this.transformedYs = [];
    this.curPosition = {};
    this.vehTween = null;
    this.routes = {}

    this.runVehicle = this.runVehicle.bind(this);
    this.update = this.update.bind(this);
  }

  injectRoutes(boundType, route) {
    route.transformPixRoute();
    this.routes[boundType] = route;
  }

  genRoute() {
    if (this.routes['inbound'] !== undefined && this.routes['outbound'] !== undefined) {
      const inboundRouteLen = this.routes['inbound'].routeX.length;
      const curve = new this.THREE.QuadraticBezierCurve(
          new Vector2( this.routes['inbound'].routeX[inboundRouteLen-1], this.routes['inbound'].routeY[inboundRouteLen-1] ),
          new Vector2( 0, 0 ),
          new Vector2( this.routes['outbound'].routeX[0], this.routes['outbound'].routeY[0] )
      )
      const pointsNum = 10;
      const curveRoute = curve.getPoints(pointsNum).slice(1,pointsNum-1);
      this.transformedXs = [...this.routes['inbound'].routeX, ...curveRoute.map(p => p.x), ...this.routes['outbound'].routeX];
      this.transformedYs = [...this.routes['inbound'].routeY, ...curveRoute.map(p => p.y), ...this.routes['outbound'].routeY];
    } else {
      this.transformedXs = (this.routes['inbound'] || this.routes['outbound']).routeX;
      this.transformedYs = (this.routes['inbound'] || this.routes['outbound']).routeY;
    }
  }

  initRoutes() {

    this.curPosition = {x: this.transformedXs[0], y: this.transformedYs[0]};
    this.car.position.x = this.curPosition.x;
    this.car.position.y = this.curPosition.y;
    //console.log(this.curPosition)
  }

  runVehicle(vehsTweenGroup, delay) {
    // remove previous tweens if needed
    //vehsTweenGroup.removeAll();

    const elapsedTime = this.transformedXs.length * 1000;
    this.vehTween = new TWEEN.Tween(this.curPosition, vehsTweenGroup)
      .to({x: this.transformedXs.slice(1), y: this.transformedYs.slice(1)}, elapsedTime)
      .onUpdate(this.update)
      .delay(delay)
      .repeat(Infinity)
      .start();
  }

  update() {
    const direction = new this.THREE.Vector3(
      this.curPosition.x - this.car.position.x, this.curPosition.y - this.car.position.y, 0
    );
    const vectorX = new this.THREE.Vector3(1, 0, 0);
    const curAngle = vectorX.angleTo(direction);
    this.car.position.x = this.curPosition.x;
    this.car.position.y = this.curPosition.y;

    //console.log(this.car.position.x);

    vectorX.cross(direction);
    //if startVector.z > 0, the angle is counter clockwise (which is what we want)
    if (vectorX.z > 0) 	{
      this.car.rotation.z = curAngle;
    }
    //else, it is clockwise (which is not what we what; processing needed)
    else {
      this.car.rotation.z = Math.PI * 2 - curAngle;
    }
  }
}


export default runSimuIntIndex;