import modelDividerWidth from "./Modelers/ModelDividerWidth";

import modelIntIbDivPoints from "./Modelers/ModelIntIbDivPoints";
import modelIntIbDiv from "./Modelers/ModelIntIbDiv";
import modelIntObDivPoints from "./Modelers/ModelIntObDivPoints";
import modelIntObDiv from "./Modelers/ModelIntObDiv";

import modelIntCenterPhyDivPoints from "./Modelers/ModelIntCenterPhyDivPoints";
import modelIntCenterPhyDiv from "./Modelers/ModelIntCenterPhyDiv";
import modelIntCenterLineDivPoints from "./Modelers/ModelIntCenterLineDivPoints";
import modelIntCenterLineDiv from "./Modelers/ModelIntCenterLineDiv";

import modelIntDivConnectorPoints from "./Modelers/ModelIntDivConnectorPoints";



class DividerModelers {
	constructor(divider) {
		this.divider = divider;
	}

	//return divider witdth (in meters)
	modelDividerGeoForApp(divider) {
		modelDividerWidth(divider);
	}


	/*************************************************************************
		Would model:
			one divider geometry.

			For inbound and outbound dividers, would model side points and curves.
			For center dividers, would: TBD!!!!

		Note:
			1. "type" refers to the intersection type ("int" or "roundabout").
			2. divider.type indicating the line "type"
				of the divider (dash line / solid line / two solid line...)
			3. divider.dividerType indicating if the divider is
				center divider / inbound divider / outbound divider.
				(1 for "inbound" / 2 for "outbound" / 3 for "center")
	**************************************************************************/
	modelDividerGeo(divider, intSize, type, meterToPixel, accuracy) {

		//if intersection's approach divider
		if (type === "int") {
			//check dividerType (center / inbound / outbound)
			//1 for "inbound" / 2 for "outbound" / 3 for "center"
			const divType = divider.dividerType;

			//inbound divider:
			if (divType === 1) {
				//model and update inbound divider outer and inner sides' points
				modelIntIbDivPoints(divider, intSize, meterToPixel, accuracy);

				//model and update inbound divider curves and shape
				modelIntIbDiv(divider, intSize, meterToPixel);
			}
			//outbound divider:
			else if (divType === 2) {
				//model and update outbound outer and inner sides' points
				modelIntObDivPoints(divider, intSize, meterToPixel, accuracy);

				//model and update outbound divider curves and shape
				modelIntObDiv(divider, intSize, meterToPixel);
			}
			//center divider:
			else {
				//divLineType:
				//null: none
				//1: dash line
				//2: single line
				//3: double line
				//4: left line and right dash line ---------------------- (TBD...)
				//5: left dash line and right line ---------------------- (TBD...)
				//6: wall (usually for median or hov)---------------------- (TBD...)
				//7: sticks ---------------------- (TBD...)
				//8: grass (non-linear type)
				//9: shadow (non-linear type)
				const divLineType = divider.type;

				//if type is grass or shadow (nonlinear divider):
				if (divLineType === 8 || divLineType === 9) {
					//model and update center non-linear divider points:
					modelIntCenterPhyDivPoints(divider, intSize, meterToPixel, accuracy);

					//model and update center non-linear divider curves and shape:
					modelIntCenterPhyDiv(divider, intSize, meterToPixel);

				}
				//else, linear divider:
				else {
					//model and update center linear divider points:
					modelIntCenterLineDivPoints(divider, intSize, meterToPixel, accuracy);

					//model and update center linear divider curves and shape:
					modelIntCenterLineDiv(divider, intSize, meterToPixel);
				}
			}


			//model divider points for connector calculation:
			modelIntDivConnectorPoints(divider, meterToPixel, accuracy);

		}
		//Roundabout divider.
		else {
			//TBD
		}
	}
}



export default DividerModelers;
