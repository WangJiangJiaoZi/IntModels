


const setupSceneMouse = ({envSetters, container, THREE, domHeight, domWidth}) => {

	const containerRect = container.getBoundingClientRect();
	const sceneWidth = domWidth;
	const sceneHeight = domHeight;
	const left = containerRect.left;
	const top = containerRect.top;

	const sceneMouse = new THREE.Vector2();
	const eventName = "mousemove";
	const callback = (event) => {
						event.preventDefault();
						sceneMouse.x = (event.clientX - sceneWidth / 2 - left) / (sceneWidth / 2);
						sceneMouse.y = (top + sceneHeight / 2 - event.clientY) / (sceneHeight / 2);
					};

	envSetters.addRendererEventListener(eventName, callback);

	return sceneMouse;
};


export default setupSceneMouse;
