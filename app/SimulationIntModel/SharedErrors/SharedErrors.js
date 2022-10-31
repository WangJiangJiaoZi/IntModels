

/***********************************************************************
						Base class for error.
************************************************************************/
class BaseError {
	constructor (modelOwner, message) {
		this.modelOwner = modelOwner;
		this.message = message;
		this.name = "Single Base Error";
	}

	toString() {
		const str = this.name + " in " + this.modelOwner + ": " + this.message;
		return str;
	}
}

/***********************************************************************
		Single value error refers to value error of one value.
************************************************************************/
class SingleValueError extends BaseError {
	constructor (modelOwner, message) {
		super(modelOwner, message);
		this.name = "Single Value Error";
	}
}



/***********************************************************************
		Single conflict error refers to values conflict within
		one model (class).
************************************************************************/
class SingleConflictError extends BaseError {
	constructor (modelOwner, message) {
		super(modelOwner, message);
		this.name = "Single Conflict Error";
	}
}


/***********************************************************************
		Compound conflict error refers to values conflict across
		multiple models (classes).
************************************************************************/
class CompoundConflictError extends BaseError {
	constructor (modelOwners, message) {
		super();
		this.message = message;
		this.modelOwners = modelOwners;  //a list of string
		this.name = "Compound Conflict Error";
	}

	toString() {
		const ownersStr = this.modelOwners.join(", ");
		const str = this.name + " in " + ownersStr + ": " + this.message;
		return str;
	}
}




const sharedErrors = {
	BaseError: BaseError,

	SingleValueError: SingleValueError,

	SingleConflictError: SingleConflictError,

	CompoundConflictError: CompoundConflictError
};


export default sharedErrors;
