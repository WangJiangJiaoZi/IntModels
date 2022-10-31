

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
const setupControls = ({ camera, renderer}) => {
	/*
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	//controls.addEventListener("change", render); // remove when using animation loop
	// enable animation loop when using damping or autorotation
	//controls.enableDamping = true;
	//controls.dampingFactor = 0.25;
	controls.enableRotate = false;
	controls.enableZoom = true;
	controls.minZoom = 1;
	controls.maxZoom = 3000;
	controls.maxPolarAngle = 0;//Math.PI * 0.495;
	*/

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.maxPolarAngle = 0;

	return controls;
};

export default setupControls;