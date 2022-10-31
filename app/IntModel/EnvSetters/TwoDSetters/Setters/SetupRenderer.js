

const setupRenderer = ({THREE, width, height, container, backgroundColor}) => {
	const renderer = new THREE.WebGLRenderer({
		precision: "highp",
		antialias: true
	});


	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);

	renderer.setClearColor(backgroundColor, 1);
	//renderer.setClearColor ("#F8F8F8", 1);
	container.appendChild(renderer.domElement);

	return renderer;
};

export default setupRenderer;
