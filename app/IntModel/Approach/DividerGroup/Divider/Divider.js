
import DividerControllers from "./DividerControllers/DividerControllers";
import DividerModelers from "./DividerModelers/DividerModelers";
import DividerDrawers from "./DividerDrawers/DividerDrawers";

class Divider {
	constructor(divGroup, THREE) {

		this.divGroup =  divGroup;
		this.THREE = THREE;

		this.dividerType = null; //1 for "inbound" / 2 for "outbound" / 3 for "center"
		this.type = 2; //1 for white dash, 2 for white solid, 3.......
		this.dividerId = null;   //unique id from DB
		this.color = "#FFFFFF";
		this.offset = 0; //meters
		this.storageLength = 0; //meters
		this.storageSlipLength = 0; //meters
		this.storageWidth = 0; //meters, only for center divider
		this.startWidth = null; //meters
		this.capRadius = 2; //meters


		this.dividerControllers = new DividerControllers(this);
		this.dividerDrawers = new DividerDrawers(this);
		this.dividerModelers = new DividerModelers(this);

		this.layerId = 1;

		this.divConnectP = null;  //would be a THREE.Mesh


		this.divShape = null;  //would be an object
		/*divShape contents:
			{
				divCurves: [an intance of THREE.Shape]  //an array of Shape
			}
		*/



		this.divGeo = null;  //would be an object
		/*divGeo contents:
		{
			dividerWidth: xxx,   //divider width in meters
			//*****************************************************************
					//shared divider points for connector calculation:
			//*****************************************************************
			midLineEp: [x, y],   //center end point
			midLineCp: [x, y],   //center control point that is 10 meters away from center end point
			rsEp: [x, y],	//relative to inbound direction left side end point
			lsEp: [x, y],  //relative to inbound direction left side end point
			height: x,   //height in pixel

			//*****************************************************************
							//inbound divider points:
			//*****************************************************************
			ibInnerSp: [x, y],  //inbound inner side start point
			ibInnerEp: [x, y],  //inbound inner side end point
			ibInnerCp1: [x, y],  //inbound inner side bezier curve control point 1
			ibInnerCp2: [x, y],  //inbound inner sidebezier curve control point 2
			ibOuterSp: [x, y],
				//Inbound divider outer start point.
			ibOuterEp: [x, y],
				//Inbound divider outer end point.
			ibOuterCp1: [x, y],
				//Inbound divider outer bezier curve control point 1
			ibOuterCp2: [x, y],
				//Outbound divider outer bezier curve control point 2

			//*****************************************************************
							//outbound divider points:
			//*****************************************************************
			obOuterSp: [x, y],  //outbound outer side start point
			obOuterEp: [x, y],  //outbound outer side end point
			obOuterCp1: [x, y],  //outbound outer side bezier curve start point 1
			obOuterCp2: [x, y],  //outbound outer side bezier curve end point 2

			obInnerSp: [x, y],  //outbound inner side start point
			obInnerEp: [x, y],  //outbound inner side end point
			obInnerCp1: [x, y],  //outbound inner side bezier curve start point 1
			obInnerCp2: [x, y],  //outbound inner side bezier curve end point 2

			//*****************************************************************
							//non-linear center divider points:
			//*****************************************************************
			centerIbSp: [x, y],  //center divider inbound side start point
			centerIbEp: [x, y],  //center divider inbound side end point
			centerIbCp1: [x, y],  //center divider inbound side bezier curve start point 1
			centerIbCp2: [x, y],  //center divider inbound side bezier curve end point 2

			centerObSp: [x, y],  //center divider outbound side start point
			centerObEp: [x, y],  //center divider outbound side end point

			//******* probably in the future....: ********
			centerObCp1: [x, y],  //center divider outbound side bezier curve start point 1
			centerObCp2: [x, y],  //center divider outbound side bezier curve end point 2

			//*****************************************************************
							//linear center divider points:
			//*****************************************************************
			centerMidSp: [x, y],  //center divider middle start point
			centerMidEp: [x, y],  //center divider middle end point
			centerMidCp1: [x, y],  //center divider middle bezier curve start point 1
			centerMidCp2: [x, y],  //center divider middle bezier curve end point 2
		}
		*/
	}
}

export default Divider;
