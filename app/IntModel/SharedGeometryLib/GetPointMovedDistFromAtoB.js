
/************************************************************************
	Get a point which moved certain distance along a line from point A to B,
	where A and B are given in the form of (x1, y1), (x2, y2)

	-Input: x1, y1, x2, y2, dist
	-Output: [x, y]

	Note: None
************************************************************************/
const getPointMovedDistFromAtoB = (THREE, x1, y1, x2, y2, dist) => {

	const movedPointVec = new THREE.Vector2(
						x2 - x1,
						y2 - y1
					);
	movedPointVec.setLength(dist);

	const pointAVec = new THREE.Vector2(x1, y1);

	movedPointVec.add(pointAVec);

	const movedPoint = [movedPointVec.x, movedPointVec.y];


	return movedPoint;



	/*
	const a = {x: x1, y: y1};
	const b = {x: x2, y: y2};

	const xdiff1 = 1;//自定义一条与x轴正向的参考方向，用于求ab直线与x轴所成夹角
	const ydiff1 = 0;
	const xdiff2 = b.x - a.x;
	const ydiff2 = b.y - a.y;
	let dxy;//所求点，为一个对象

	if (dist === 0) {
		return [x1, y1];
	}

	if (xdiff2 === 0 && ydiff2 > 0) {//ab所成直线与y轴平行，且为y轴正方向
		dxy = {x: a.x, y: a.y + dist};
	}
	else if (xdiff2 === 0 && ydiff2 < 0){//ab所成直线与y轴平行，且为y轴负方向
		dxy = {x: a.x, y: a.y - dist};
	}
	else if (ydiff2 === 0 && xdiff2 > 0){//ab所成直线与x轴平行，且为x轴正方向
		dxy = {x: a.x + dist, y: a.y};
	}
	else if (ydiff2 === 0 && xdiff2 < 0){//ab所成直线与x轴平行，且为x轴负方向
		dxy = {x: a.x - dist, y: a.y};
	}
	else {
		if (ydiff2 > 0){
			const dotMul = xdiff1 * xdiff2 + ydiff1 * ydiff2;//计算点乘的值
			const getMod1 = Math.sqrt(xdiff1 * xdiff1 + ydiff1 * ydiff1);//计算参考直线的模
			const getMod2 = Math.sqrt(xdiff2 * xdiff2 + ydiff2 * ydiff2);//计算ab直线的模
			//var angle=(Math.acos(dotMul/(getMod1*getMod2))* 180/Math.PI)/(360);
			const angle = Math.acos(dotMul / (getMod1 * getMod2));
			dxy = {x: a.x + dist * Math.cos(angle), y:a.y + dist * Math.sin(angle)};
		}
		else {
			const dotMul = xdiff1 * xdiff2 + ydiff1 * ydiff2;//计算点乘的值
			const getMod1 = Math.sqrt(xdiff1 * xdiff1 + ydiff1 * ydiff1);//计算参考直线的模
			const getMod2 = Math.sqrt(xdiff2 * xdiff2 + ydiff2 * ydiff2);//计算ab直线的模
			//var angle=(Math.acos(dotMul/(getMod1*getMod2))* 180/Math.PI)/(360);
			const angle = Math.acos(dotMul / (getMod1 * getMod2));
			dxy = {x: a.x + dist * Math.cos(angle),y:(a.y - dist * Math.sin(angle))};
		}

	}

	return [dxy.x, dxy.y];
	*/
};


export default getPointMovedDistFromAtoB;
