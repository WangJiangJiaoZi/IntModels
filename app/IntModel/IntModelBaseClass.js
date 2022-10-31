
import sharedErrors from "./SharedErrors/SharedErrors";



class IntModelBaseClass {
	constructor(modelOwner, modelErrorHints) {
		this.modelOwner = modelOwner;
		this.modelErrorHints = modelErrorHints;
	}

	//check the type of every element of an array
	checkArrayEleType(arrayToCheck, className) {
		let ifPass = false;
		try {
			ifPass = arrayToCheck.every(oneEle => (oneEle instanceof className));
		}
		catch (e) {
			//do nothing...
		}
		return ifPass;
	}

	//check the value of a property
	checkPropertyValue(propertyToCheck, regex) {
		const ifPass = regex.test(propertyToCheck);

		return ifPass;
	}

	handleGeneralError(info) {
		const message = this.modelErrorHints.handleGeneralError.replace(
						"${modelOwner}", this.modelOwner).replace(
						"${info}", info);
		const generalError = new sharedErrors.SingleValueError(this.modelOwner, message);
		throw generalError;
	}

	handleCheckError(propertyName, correctType) {
		const message = this.modelErrorHints.handleCheckError.replace(
						"${modelOwner}", this.modelOwner).replace(
						"${propertyName}", propertyName).replace(
						"${correctType}", correctType);
		const checkError = new sharedErrors.SingleValueError(this.modelOwner, message);
		throw checkError;
	}

	handleInjectError(info, reason) {
		const message = this.modelErrorHints.handleInjectError.replace(
						"${info}", info).replace(
						"${modelOwner}", this.modelOwner).replace(
						"${reason}", reason);
		const checkError = new sharedErrors.SingleValueError(this.modelOwner, message);
		throw checkError;
	}

}

export default IntModelBaseClass;

