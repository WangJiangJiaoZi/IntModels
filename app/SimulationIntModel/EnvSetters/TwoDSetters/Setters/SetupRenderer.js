

const setupRenderer = ({THREE, backgroundColor, width, height, container}) => {
	const renderer = new THREE.WebGLRenderer({
		precision: "highp",
		antialias: false
	});


	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);
	//Set the background color of the renderer to light grey, with full opacity
	renderer.setClearColor(backgroundColor, 1);
	//renderer.setClearColor ("#F8F8F8", 1);
	container.appendChild(renderer.domElement);

	return renderer;
};

export default setupRenderer;
