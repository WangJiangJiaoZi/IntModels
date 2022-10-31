


class SimuationBound {
	constructor(laneGG, bound) {
		this.laneGG = laneGG;
		this.bound = bound; // "IB" / "OB"

		this.origin = [0, 0];
		this.angle = 0;
	}

	/********************************************************************
		Would calculate the coordinate of the simulationBound.
		Would update:
			.origin = [x, y];
			.angle = xxx;
	*********************************************************************/
	initialize() {
		let origin;
		const angle = Math.PI - this.laneGG.approach.appAngle * Math.PI / 180;
		if (this.bound === "IB") {
			origin = this.laneGG.laneGGGeo.stopOuterEp;
		}
		else {
			const centerDivider = this.laneGG.approach.dividerGroup.dividers.find(oneDiv => oneDiv.dividerType === 3);
			origin = (centerDivider.divGeo.centerObEp) ? centerDivider.divGeo.centerObEp : centerDivider.divGeo.centerMidEp;
		}

		this.angle = angle;
		this.origin = origin;
	}

	translate([x, y]) {

	}
}


export default SimuationBound;
