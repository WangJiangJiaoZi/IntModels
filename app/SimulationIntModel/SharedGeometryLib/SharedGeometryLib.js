

import connectIntersectedLinesWzArc from "./Methods/ConnectIntersectedLinesWzArc";

class SharedGeometryLib {
	constructor(THREE) {
		this.THREE = THREE;

		this.connectIntersectedLinesWzArc = connectIntersectedLinesWzArc;

	}
}

export default SharedGeometryLib;
