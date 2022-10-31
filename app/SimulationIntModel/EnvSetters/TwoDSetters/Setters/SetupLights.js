

const setupLights = ({THREE, scene}) => {
	const lights = [];
	let light = new THREE.DirectionalLight(0xffffff);
	light.position.set(1, 1, 1);
	scene.add(light);
	lights.push(light);

	light = new THREE.DirectionalLight(0x002288);
	light.position.set(-1, -1, 1);
	scene.add(light);
	lights.push(light);

	light = new THREE.AmbientLight("#DADADA");
	scene.add(light);
	lights.push(light);

	return lights;
};

export default setupLights;