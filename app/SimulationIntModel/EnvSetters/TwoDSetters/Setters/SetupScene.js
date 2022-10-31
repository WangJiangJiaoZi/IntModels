

const setupScene = (THREE) => {
	const scene = new THREE.Scene();
	scene.rotateX(-0.5 * Math.PI);  //rotate threeD scene
	//scene.fog = new THREE.FogExp2("#ffffff", 0.0001);
	return scene;
};

export default setupScene;