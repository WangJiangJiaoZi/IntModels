
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const setupControls = ({ camera, renderer }) => {


	const controls = new OrbitControls(camera, renderer.domElement);
	controls.maxPolarAngle = 0;

	return controls;
};

export default setupControls;