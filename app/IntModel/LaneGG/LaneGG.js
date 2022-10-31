
import IntModelBaseClass from "../IntModelBaseClass";

import LaneGGControllers from "./LaneGGControllers/LaneGGControllers";
import LaneGGDrawers from "./LaneGGDrawers/LaneGGDrawers";
import LaneGGModelers from "./LaneGGModelers/LaneGGModelers";


class LaneGG extends IntModelBaseClass{
	constructor(approach, THREE, errorHints) {
		super("LaneGG", errorHints.laneGG);
		this.approach = approach;
		this.THREE = THREE;
		this.errorHints = errorHints;

		this.laneGGControllers = new LaneGGControllers(this);
		this.laneGGDrawers = new LaneGGDrawers(this);
		this.laneGGModelers = new LaneGGModelers(this);

		this.layerId = 1;

		this.laneGroups = [];
		this.movements = [];

		this.laneGGShape = {};
		/*laneGGShape contents:
			{
				stopBarCurves: an instance of THREE.Shape,
			}
		*/

		this.laneGGGeo = {};
		/*
			laneGGGeo contents:
			{
				laneGGWidth: xx,  //laneGG width in meters
				ibMainLgWidth: xxx,  //inbound main lane groups width in pixel
				ibSideLgWidth: xxx,  //inbound side lane group width in pixel
				obMainLgWidth: xxx,  //outbound main lane group width in pixel
				obSideLgWidth: xxx,  //outbound side lane group width in pixel

				stopInnerSp = [x, y],  //stop bar inner start point
					(the one close to the center polygon and approach side)
				stopInnerEp = [x, y],  //stop bar inner end point
					(the one close to center polygon and road center line)
				stopOuterSp = [x, y],  //stop bar outer start point
					(the one less closer to center polygon but close to approach side)
				stopOuterEp = [x, y],  //stop bar outer end point
					(the one less closer to center polygon but close to road center line)

				innerFinalP = [x, y],  //stop bar inner final point
				outerFinalP = [x, y],  //stop bar outer final point

				stopAngleToEnd = alpha,  //the angle between the stop bar and the approach end

				mainIbLaneGroups: [xxx],  //inbound main lane groups' index array
				sideIbLaneGroups: [xxx],  //inbound side lane groups' index array
				mainObLaneGroups: [xxx],  //outbound main lane groups' index array
				sideObLaneGroups: [xxx],  //outbound side lane groups' index array
			}
		*/


		this.laneGGFeatureGeo = {};
		/*
			laneGGFeatureGeo contents:
			{
				movsStartLineSp: [x, y],  //start point of the movements' start line (on appraoch's right side)
				movsStartLineEp: [x, y],  //end point of the movements' end line (on counter clockwise neight app's left side)

				movsTextMaxLen: {
					volume: xxx, //max volume length in current laneGG
					delay: xxx,  //max delay length in current laneGG
					stop: xxx,   //max stop length in current laneGG
					queue: xxx,  //max queue length in current laneGG
					overflow: xxx,  //max overflow length in current laneGG
				}
			}
		*/
	}
}

export default LaneGG;
