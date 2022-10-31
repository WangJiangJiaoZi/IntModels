

const setupSceneMouse = ({intModel, container, domWidth, canvasSize}) => {
	const sceneMouse = {};
	const mouse = new THREE.Vector2();
	const handler = ({intModel, event, sceneWidth, sceneHeight, left, top}) => {
		intModel.sceneMouse.mouse.x = (event.clientX - sceneWidth / 2 - left) / (sceneWidth / 2);
		intModel.sceneMouse.mouse.y = (top + sceneHeight / 2 - event.clientY) / (sceneHeight / 2);
	};

	sceneMouse.mouse = mouse;
	sceneMouse.handler = handler;

	const threeDContainerRect = container.getBoundingClientRect();
	const sceneWidth = domWidth;
	const sceneHeight = canvasSize;
	const left = threeDContainerRect.left;
	const top = threeDContainerRect.top;
	container.addEventListener("mousedown",
		(event) => {
			handler({
				intModel: intModel,
				event: event,
				sceneWidth: sceneWidth,
				sceneHeight: sceneHeight,
				left: left,
				top: top
			});
		},
		false
	);

	return sceneMouse;
};

export default setupSceneMouse;