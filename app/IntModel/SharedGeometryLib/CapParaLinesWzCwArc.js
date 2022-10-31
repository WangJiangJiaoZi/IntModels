

import getDistBtwTwoPoints from "./GetDistBtwTwoPoints";
/************************************************************************
	Generate a cap from line1 to line2. The cap is either a clockwise
	arc or two clockwise arcs and a line connecting them.

	 - Input:
	 	1. line1 start point: [x, y]
	 	2. line2 start point: [x, y]
	 	3. cap radius: r

	 - Output: connectionCurve which is an intance of Three.shape

	Note:
		A line of line1 start point and line2 start point should be parallel
		to the two lines.
************************************************************************/


const capParaLinesWzCwArc = (THREE, l1Sp, l2Sp, r) => {

	let capCurves = new THREE.Shape();

	//if the r is 0 (or minus), the connectionCurve would be a line:
	if (r <= 0) {
		capCurves.moveTo(l1Sp[0], l1Sp[1]);
		capCurves.lineTo(l2Sp[0], l2Sp[1]);
	}
	//else:
	else {
		//distance between two start points
		const spDist = getDistBtwTwoPoints(l1Sp[0], l1Sp[1], l2Sp[0], l2Sp[1]);
		//decide if one arc is enough to connect
		const ifOneArc = (spDist > 2 * r) ? false : true;
		//cap with one arc
		if (ifOneArc) {
			r = spDist / 2;
			const centerX = (l1Sp[0] + l2Sp[0]) / 2;
			const centerY = (l1Sp[1] + l2Sp[1]) / 2;

			const startVec = new THREE.Vector2(l1Sp[0] - centerX, l1Sp[1] - centerY);
			const endVec = new THREE.Vector2(l2Sp[0] - centerX, l2Sp[1] - centerY);

			const startAngle = startVec.angle();
			const endAngle = endVec.angle();


			capCurves.moveTo(l1Sp[0], l1Sp[1]);
			capCurves.absarc(centerX, centerY, r, startAngle, endAngle, true);

		}
		//distance too long, got to cap with two arcs and one line
		else {
			//decide two center points:
			const l1SpTol2SpVec = new THREE.Vector2(l2Sp[0] - l1Sp[0], l2Sp[1] - l1Sp[1]);
			const l2SpTol1SpVec = new THREE.Vector2(l1Sp[0] - l2Sp[0], l1Sp[1] - l2Sp[1]);

			l1SpTol2SpVec.setLength(r);
			l2SpTol1SpVec.setLength(r);

			const center1Vec = new THREE.Vector2(l1Sp[0], l1Sp[1]);
			center1Vec.add(l1SpTol2SpVec);
			const center1 = [center1Vec.x, center1Vec.y];

			const center2Vec = new THREE.Vector2(l2Sp[0], l2Sp[1]);
			center2Vec.add(l2SpTol1SpVec);
			const center2 = [center2Vec.x, center2Vec.y];

			const arc2SpVec = center2Vec.clone();


			const initVec = new THREE.Vector2(0, 0);

			//decide start angles and end angles:
			//arc1 start angle:
			const startAngle1 = l2SpTol1SpVec.angle();

			//arc1 end angle:
			const endVec1 = new THREE.Vector2(l1Sp[0] - center1[0], l1Sp[1] - center1[1]);
			endVec1.rotateAround(initVec, -1 * Math.PI / 2);
			const endAngle1 = endVec1.angle();


			//arc2 start angle:
			const startVec2 = new THREE.Vector2(l2Sp[0] - center2[0], l2Sp[1] - center2[1]);
			startVec2.rotateAround(initVec, Math.PI / 2);
			const startAngle2 = startVec2.angle();

			//arc2 start point:
			startVec2.setLength(r);
			arc2SpVec.add(startVec2);
			const arc2Sp = [arc2SpVec.x, arc2SpVec.y];

			//arc2 end angle:
			const endAngle2 = l1SpTol2SpVec.angle();


			//build arc1 and arc2
			const arc1 = new THREE.Shape();
			arc1.moveTo(l1Sp[0], l1Sp[1]);
			arc1.absarc(center1[0], center1[1], r, startAngle1, endAngle1, true);

			const arc2 = new THREE.Shape();
			arc2.moveTo(arc2Sp[0], arc2Sp[1]);
			arc2.absarc(center2[0], center2[1], r, startAngle2, endAngle2, true);

			const arc1EpVec = arc1.currentPoint;

			//build the cap curves:
			capCurves.moveTo(l1Sp[0], l1Sp[1]);
			capCurves.add(arc1.curves[0]);
			capCurves.moveTo(arc1EpVec.x, arc1EpVec.y);
			capCurves.lineTo(arc2Sp[0], arc2Sp[1]);
			capCurves.add(arc2.curves[0]);

		}
	}



	return capCurves;
};


export default capParaLinesWzCwArc;
