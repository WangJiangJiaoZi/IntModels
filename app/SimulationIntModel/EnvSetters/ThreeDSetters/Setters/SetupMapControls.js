

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const setupMapControls = ({ camera, renderer}) => {

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.minDistance = 10;
	controls.maxDistance = 3000;
	controls.maxPolarAngle = Math.PI * 0.495;

	return controls;
};

export default setupMapControls;