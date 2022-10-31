

import addDRACOLoaderToThree from "../Vendors/three/js/loaders/MyDRACOLoader";
import addGLTFLoaderToTHREE from "../Vendors/three/js/loaders/MyGLTFLoader";

import addCarToTHREE from "../Vendors/three/js/MyCar";

import ferrariGlbUrl from "../Vendors/three/models/gltf/ferrari.glb";
import ferrariAoUrl from "../Vendors/three/models/gltf/ferrari_ao.png";

const initCar = (THREE, modelScene) => {
	addDRACOLoaderToThree(THREE);
	THREE.DRACOLoader.setDecoderPath("./draco/gltf/");

	addGLTFLoaderToTHREE(THREE);
	var loader = new THREE.GLTFLoader();
	loader.setDRACOLoader( new THREE.DRACOLoader() );
	loader.load(ferrariGlbUrl, function( gltf ) {
		const carModel = gltf.scene.children[ 0 ];
		// add lightHolder to car so that the shadow will track the car as it moves
		//carModel.add( lightHolder );

		addCarToTHREE(THREE);
		const car = new THREE.Car();
		car.setModel( carModel );


		const envMap = new THREE.CubeTextureLoader()
			.setPath( "../app/Images/ThreeDTextures/skyboxsun25deg/")
			.load( [ "px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg" ] );


		carModel.traverse( function ( child ) {
			if ( child.isMesh  ) {
				child.castShadow = true;
				child.receiveShadow = true;
				child.material.envMap = envMap;
			}
		} );
		// shadow
		var texture = new THREE.TextureLoader().load(ferrariAoUrl);
		var shadow = new THREE.Mesh(
			new THREE.PlaneBufferGeometry( 0.655 * 4, 1.3 * 4 ).rotateX( - Math.PI / 2 ),
			new THREE.MeshBasicMaterial( { map: texture, opacity: 0.8, transparent: true } )
		);
		shadow.renderOrder = 2;
		carModel.add( shadow );

		carModel.translateZ(5.5);
		carModel.translateY(6);
		carModel.translateX(15);
		carModel.rotateZ(0.5 * Math.PI);  //rotate threeD scene
		carModel.rotateX(0.5 * Math.PI);  //rotate threeD scene

		modelScene.add( carModel );

		// car parts for material selection
		const carParts = {
			body: [],
			rims:[],
			glass: [],
		};
		carParts.body.push( carModel.getObjectByName( "body" ) );
		carParts.rims.push(
			carModel.getObjectByName( "rim_fl" ),
			carModel.getObjectByName( "rim_fr" ),
			carModel.getObjectByName( "rim_rr" ),
			carModel.getObjectByName( "rim_rl" ),
			carModel.getObjectByName( "trim" ),
		);
		carParts.glass.push(
			carModel.getObjectByName( "glass" ),
		);



		var bodyMat = new THREE.MeshStandardMaterial( { color: 0xff4400, envMap: envMap, metalness: 0.9, roughness: 0.2, name: "orange" } );
		var rimMat = bodyMat;
		var glassMat = new THREE.MeshStandardMaterial( { color: 0xffffff, envMap: envMap, metalness: 0.9, roughness: 0.1, opacity: 0.15, transparent: true, premultipliedAlpha: true, name: "clear" } );
		carParts.body.forEach( function ( part ) { part.material = bodyMat; } );
		carParts.rims.forEach( function ( part ) { part.material = rimMat; } );
		carParts.glass.forEach( function ( part ) { part.material = glassMat; } );


	});

};


export default initCar;
