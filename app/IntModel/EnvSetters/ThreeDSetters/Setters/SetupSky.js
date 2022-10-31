import "../../../../Vendors/three/js/SkyShader";
import dat from "../../../../Vendors/three/js/libs/dat.gui.min";
import skyImageUrl from "../../../../Images/ThreeDTextures/skyboxsun25degtest.png";

/*
const setupSky = ({threeDModel}) => {
	// skybox
	var cubeMap = new THREE.CubeTexture([]);
	cubeMap.format = THREE.RGBFormat;
	var loader = new THREE.ImageLoader();
	loader.load(skyImageUrl, function(image) {
		var getSide = function(x, y) {
			var size = 1024;
			var canvas = document.createElement("canvas");
			canvas.width = size;
			canvas.height = size;
			var context = canvas.getContext("2d");
			context.drawImage(image, -x * size, -y * size);
			return canvas;
		};
		cubeMap.images[0] = getSide(2, 1); // px
		cubeMap.images[1] = getSide(0, 1); // nx
		cubeMap.images[2] = getSide(1, 0); // py
		cubeMap.images[3] = getSide(1, 2); // ny
		cubeMap.images[4] = getSide(1, 1); // pz
		cubeMap.images[5] = getSide(3, 1); // nz
		cubeMap.needsUpdate = true;
	});
	var cubeShader = THREE.ShaderLib["cube"];
	cubeShader.uniforms["tCube"].value = cubeMap;
	var skyBoxMaterial = new THREE.ShaderMaterial({
		fragmentShader: cubeShader.fragmentShader,
		vertexShader: cubeShader.vertexShader,
		uniforms: cubeShader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});
	var skyBox = new THREE.Mesh(
		new THREE.BoxGeometry(1000000, 1000000, 1000000),
		skyBoxMaterial
	);
	skyBox.name = "sky";
	console.log(threeDModel.scene);
	threeDModel.scene.add(skyBox);
};
*/


const setupSky = ({threeDModel}) => {
	// Add Sky Mesh
	const sky = new THREE.Sky();
	sky.mesh.name = "sky";
	threeDModel.scene.add(sky.mesh);
	// Add Sun Helper
	const sunSphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry(20000, 16, 8),
		new THREE.MeshBasicMaterial({
			color: 0xffffff
		})
	);
	sunSphere.position.y = -700000;
	sunSphere.visible = false;
	sunSphere.name = "sky";
	threeDModel.scene.add(sunSphere);
	/// GUI
	var effectController = {
		turbidity: 10,
		rayleigh: 2,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.8,
		luminance: 1,
		inclination: 0.2256, // elevation / inclination
		azimuth: 0.25, // Facing front,
		sun: !true
	};
	var distance = 400000;


	
	//the contorl panel:

	function guiChanged() {
		var uniforms = sky.uniforms;
		uniforms.turbidity.value = effectController.turbidity;
		uniforms.rayleigh.value = effectController.rayleigh;
		uniforms.luminance.value = effectController.luminance;
		uniforms.mieCoefficient.value = effectController.mieCoefficient;
		uniforms.mieDirectionalG.value = effectController.mieDirectionalG;
		var theta = Math.PI * (effectController.inclination - 0.5);
		var phi = 2 * Math.PI * (effectController.azimuth - 0.5);
		sunSphere.position.x = distance * Math.cos(phi);
		sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
		sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);
		sunSphere.visible = effectController.sun;
		sky.uniforms.sunPosition.value.copy(sunSphere.position);
		threeDModel.renderer.render(threeDModel.scene, threeDModel.camera);
	}

	var gui = new dat.GUI();
	/*
	gui.add(effectController, "turbidity", 1.0, 20.0, 0.1).onChange(guiChanged);
	gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
	gui.add(effectController, "mieCoefficient", 0.0, 0.1, 0.001).onChange(guiChanged);
	gui.add(effectController, "mieDirectionalG", 0.0, 1, 0.001).onChange(guiChanged);
	gui.add(effectController, "luminance", 0.0, 2).onChange(guiChanged);
	gui.add(effectController, "inclination", 0, 1, 0.0001).onChange(guiChanged);
	gui.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);
	gui.add(effectController, "sun").onChange(guiChanged);
	*/
	guiChanged();
};

export default setupSky;