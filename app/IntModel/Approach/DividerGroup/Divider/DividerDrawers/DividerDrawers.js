import drawIntIbDivider from "./DividerGeoDrawers/DrawIntIbDivider";
import drawIntObDivider from "./DividerGeoDrawers/DrawIntObDivider";
import drawIntCenterDivider from "./DividerGeoDrawers/DrawIntCenterDivider";

import drawIntDivConnectPoint from "./DividerGeoDrawers/DrawIntDivConnectPoint";
import undrawIntDivConnectPoint from "./DividerGeoDrawers/UndrawIntDivConnectPoint";

class DividerDrawers {
	constructor(divider) {
		this.divider = divider;
	}


	/***********************************************************************
		Draw Divider Geometry:
			1. Draw divider geometry according to its:
				- type ("int" or "roundabout")
				- dividerType ("inbound" / "outbound" / "center")
				- type (single solid / single dash / double solid / ...)
				- color
	************************************************************************/
	drawDividerGeo(divider, scene, clickableObjs, type, meterToPix, roadDepth, options) {
		const envSetters = divider.divGroup.approach.intersection.intModel.envSetters;

		if (type === "int") {
			const divType = divider.dividerType;

			//inbound divider:
			if (divType === 1) {
				drawIntIbDivider(divider, scene, clickableObjs, meterToPix, envSetters, roadDepth, options);
			}
			//outbound divider:
			else if (divType === 2) {
				drawIntObDivider(divider, scene, clickableObjs, meterToPix, envSetters, roadDepth, options);
			}
			//center divider:
			else {
				drawIntCenterDivider(divider, scene, clickableObjs, meterToPix, envSetters, roadDepth, options);
			}
		}
	}

	/***********************************************************************
		Draw divider connect point. The connect point would be at the end
		of the divider.
	************************************************************************/
	drawDividerConnectPoint(modelScene, clickableObjs, translate, meterToPix, roadThick) {
		drawIntDivConnectPoint(this.divider, modelScene, clickableObjs, translate, meterToPix, roadThick);
	}

	/***********************************************************************
		Undraw divider connect point by removing it from scene
		and clickableObjs
	************************************************************************/
	undrawDividerConnectPoint(modelScene, clickableObjs) {
		undrawIntDivConnectPoint(this.divider, modelScene, clickableObjs);
	}
}


export default DividerDrawers;
