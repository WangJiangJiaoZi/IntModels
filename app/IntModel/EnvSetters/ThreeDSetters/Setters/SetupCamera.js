


const setupCamera = ({THREE, cameraSettings, canvasSize}) => {
	const fov = cameraSettings.fov;
	const aspect = cameraSettings.aspect;
	const near = cameraSettings.near;
	const far = cameraSettings.far;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	const scaleX = cameraSettings.position.x / 700;
	const scaleY = cameraSettings.position.y / 700;
	const scaleZ = cameraSettings.position.z / 700;

	camera.position.x = scaleX * canvasSize;
	camera.position.y = scaleY * canvasSize;
	camera.position.z = scaleZ * canvasSize;

	return camera;
};

export default setupCamera;
