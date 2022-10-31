

const setupGround = ({intModel, groundInitialSettings, THREE}) => {
	const parameters = {
		width: 2000,
		height: 2000,
		widthSegments: 250,
		heightSegments: 250,
		depth: 1500,
		param: 4,
		filterparam: 1
	};
	const groundMat = new THREE.MeshLambertMaterial({
		color: groundInitialSettings.groundColor,
		side: THREE.DoubleSide
	});
	const ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(parameters.width * 500, parameters.height * 500),
		groundMat
	);
	ground.name = "ground";
	ground.position.set(0, 0, 100);
	intModel.scene.add(ground);
};

export default setupGround;