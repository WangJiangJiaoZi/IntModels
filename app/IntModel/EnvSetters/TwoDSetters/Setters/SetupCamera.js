


const setupCamera = ({THREE, domHeight, domWidth, cameraSettings}) => {
	const left = domWidth / -2;
	const right = domWidth / 2;
	const top = domHeight / 2;
	const bottom = domHeight / -2;

	const near = cameraSettings.near;
	const far = cameraSettings.far;
	//OrthographicCamera(left, right, top, bottom , near, far)
	const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);

	camera.position.x = cameraSettings.position.x;
	camera.position.y = cameraSettings.position.y;
	camera.position.z = cameraSettings.position.z;

	return camera;
};

export default setupCamera;
