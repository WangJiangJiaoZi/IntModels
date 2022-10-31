
import sharedErrors from "../../SharedErrors/SharedErrors";
import drawIntGeo from "./Drawers/DrawIntGeo";
//import drawVehicles from "./Drawers/DrawVehicles";
import Stats from 'stats.js'


class DrawSimu {
	constructor(simulationIntModel, errorHints) {
		this.simulationIntModel = simulationIntModel;
		this.errorHints = errorHints;
		this.sharedErrors = sharedErrors;

		this.drawIntGeo = drawIntGeo.bind(null, this);
		//this.drawVehicles = drawVehicles.bind(null, this);
	}

	drawStats() {
		//show the running resource comsuption
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
	}


	/********************************************************************
		Would:
			1.Animate networkModel.scene.
			2.render using networkModel.renderer

		Would update:
			networkModel.anmimationFrameId
	********************************************************************/
	animateNetworkModel() {
		const simulationIntModel = this.simulationIntModel;
		simulationIntModel.anmimationFrameId = requestAnimationFrame(() => {
			//animate(networkModel, sigClickHandler, stats);
			this.animateNetworkModel(simulationIntModel);
		});
		simulationIntModel.controls.update();


		//this.drawerHandlers.handleMouseInteraction();


		this.stats.begin();	//status
		simulationIntModel.renderer.render(
			simulationIntModel.scene,
			simulationIntModel.camera
		);
		this.stats.end();  	//status
	}

}


export default DrawSimu;
