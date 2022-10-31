
import modelIntLaneIfConnectPoint from "./Modelers/ModelIntLaneIfConnectPoint";


/**************************************************************************
	Would model:
		1. lane ifConnectPoint

	Note:
		Got to model lane's connect point at approach level since telling if a connect point
		exists would require divider's geometry points
**************************************************************************/


const modelLaneIfConnectPointGeo = (lane, meterToPixel) => {
	modelIntLaneIfConnectPoint(lane, meterToPixel);
};


export default modelLaneIfConnectPointGeo;
