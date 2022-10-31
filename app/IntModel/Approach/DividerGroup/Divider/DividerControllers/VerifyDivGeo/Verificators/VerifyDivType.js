
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";


const verifyDivType = (type, appId, language = 1) => {
	//"div" is divider at right hand
	//null: none
	//1: dash line
	//2: single line
	//3: double line
	//4: left line and right dash line
	//5: left dash line and right line
	//6: wall (usually for median or hov)
	//7: sticks
	//8: grass
	//9: shadow
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Divider";
	const reg = /^([1-9])$/;  //can only be one digit from 1 - 9
	if (!reg.test(type)) {
		let message;
		if (language === 1) {
			message = "invalid divider data type in approach " + appId +
				". It can only be 1 - 9.";		
		}
		else {
			message = "道路编号" + appId + "中的隔离带参数'type'无效。" + 
				"该参数应该是1到9的数字。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyDivType;
