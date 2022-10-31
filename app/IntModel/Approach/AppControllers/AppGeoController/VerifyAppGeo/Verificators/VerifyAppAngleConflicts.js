
import sharedErrors from "../../../../../SharedErrors/SharedErrors";


const verifyAppAngleConflicts = (allAngles, language = 1) => {
	const CompoundConflictError = sharedErrors.CompoundConflictError;

	for (let i = 1; i < allAngles.length; i++) {
		const curAngle = allAngles[i];
		const preAngle = allAngles[i - 1];
		if (curAngle < preAngle + 30) {
			let message;
			if (language === 1) {
				message = "invalid approaches' angles order," +
					"please order the approaches clockwise" +
					"from 0 to 355 degrees with at least" +
					"30 degrees between the neighbor pairs.";
			}
			else {
				message = "无效的道路角度。请将道路按角度有小到大排序，道路角度间隔至少30度，从0到355。";
			}
			const modelOwners = ["multiple approaches"];
			const oneCompoundConflictError = new CompoundConflictError(modelOwners, message);
			throw oneCompoundConflictError;
		}
	}
};


export default verifyAppAngleConflicts;
