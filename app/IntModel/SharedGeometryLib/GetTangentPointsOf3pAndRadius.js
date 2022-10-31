
/************************************************************************
	Get the two tangent points of three points (not parallel) (given in the form of
	[x1, y1], [x2, y2], [x3, y3]) and a radius (r), where tangent point1 should be on
	line of [x1, y1] and [x3, y3] and point2 should be on line of [x2, y2] and [x3, y3]

	 - Input: [x1, y1], [x2, y2], [x3, y3], r;
	 - Output: [[x1, y1], [x2, y2]], if the three points are different; null, if not.

	Note: The three points should be totally different.
************************************************************************/
const getTangentPointsOf3pAndRadius = (x1, y1, x2, y2, x3, y3, r) => {
	const a = {x: x1, y: y1};  //point1
	const b = {x: x2, y: y2};  //point2
	const c = {x: x3, y: y3};  //point3

	if (JSON.stringify(a) === JSON.stringify(b) ||
		JSON.stringify(a) === JSON.stringify(c) ||
		JSON.stringify(b) === JSON.stringify(c)) {
		return null;
	}

	var xdiff1 = a.x - c.x;
	var ydiff1 = a.y - c.y;
	var xdiff2 = b.x - c.x;
	var ydiff2 = b.y - c.y;
	var angle;
	//求两向量的夹角（0 - 180）
	var dotMul = xdiff1 * xdiff2 + ydiff1 * ydiff2;//计算点乘的值
	var getMod1 = Math.sqrt(xdiff1 * xdiff1 + ydiff1 * ydiff1);//计算line1直线的模
	var getMod2 = Math.sqrt(xdiff2 * xdiff2 + ydiff2 * ydiff2);//计算line2直线的模
	// angle  =  180 - (360  *  Math.atan(ydiff1 / xdiff1) / (2  *  Math.PI)  -  360  *  Math.atan(ydiff2 / xdiff2) / (2  *  Math.PI));
	angle = Math.acos(dotMul / (getMod1 * getMod2));

	var l = r / Math.sin(angle / 2);//圆心到两直线交点c的距离
	var z = Math.sqrt(l * l - r * r);//根据勾股定理求出切点到两直线交点c的距离

	//求直线上距离交点c，c - a方向距离为z的切点坐标
	var xdiff3 = 1;//自定义一条与x轴正向的参考方向，用于求ab直线与x轴所成夹角
	var ydiff3 = 0;
	var daxy;//ac方向切点的坐标，为一个对象
	var dbxy;//bc方向切点的坐标，为一个对象
	if (xdiff1 === 0 && ydiff1 > 0)//c - a与y轴正方向平行
	{

		daxy = {x:c.x, y:c.y + z};
	}
	else if (xdiff1 === 0 && ydiff1 < 0)//c - a与y轴负方向平行
	{
		daxy = {x:c.x, y:c.y - z};
	}
	else if (ydiff1 === 0 && xdiff1 > 0)//c - a与x轴正方向平行
	{
		daxy = {x:c.x + z, y:c.y};
	}
	else if (ydiff1 === 0 && xdiff1 < 0)//c - a与x轴负方向平行
	{
		daxy = {x:c.x - z, y:c.y};
	}
	else {//c - a不与x、y轴方向都不平行
		if (ydiff1 > 0){
			dotMul = xdiff3 * xdiff1 + ydiff3 * ydiff1;//计算点乘的值
			getMod1 = Math.sqrt(xdiff3 * xdiff3 + ydiff3 * ydiff3);//计算参考直线的模
			getMod2 = Math.sqrt(xdiff1 * xdiff1 + ydiff1 * ydiff1);//计算ca直线的模
			//var angle = (Math.acos(dotMul/(getMod1 * getMod2)) *  180/Math.PI)/(360);
			angle = Math.acos(dotMul / (getMod1 * getMod2));
			daxy = {x:c.x + z * Math.cos(angle), y:c.y + z * Math.sin(angle)};
		}
		else {
			dotMul = xdiff3 * xdiff1 + ydiff3 * ydiff1;//计算点乘的值
			getMod1 = Math.sqrt(xdiff3 * xdiff3 + ydiff3 * ydiff3);//计算参考直线的模
			getMod2 = Math.sqrt(xdiff1 * xdiff1 + ydiff1 * ydiff1);//计算ca直线的模
			//var angle = (Math.acos(dotMul/(getMod1 * getMod2)) *  180/Math.PI)/(360);
			angle = Math.acos(dotMul / (getMod1 * getMod2));
			daxy = {x:c.x + z * Math.cos(angle), y:c.y - z * Math.sin(angle)};
		}


	}


	//求直线上距离交点c，c - b方向距离为z的切点坐标
	if (xdiff2 ===  0 && ydiff2 > 0)//c - b与y轴正方向平行
	{
		dbxy = {x:c.x, y:c.y + z};
	}
	else if (xdiff2 ===  0 && ydiff2 < 0)//c - b与y轴负方向平行
	{
		dbxy = {x:c.x, y:c.y - z};
	}
	else if (ydiff2 === 0 && xdiff2 > 0)//c - b与x轴正方向平行
	{
		dbxy = {x:c.x + z, y:c.y};
	}
	else if (ydiff2 === 0 && xdiff2 < 0)//c - b与x轴负方向平行
	{
		dbxy = {x:c.x - z, y:c.y};
	}
	else {
		if (ydiff2 > 0){
			dotMul = xdiff3 * xdiff2 + ydiff3 * ydiff2;//计算点乘的值
			getMod1 = Math.sqrt(xdiff3 * xdiff3 + ydiff3 * ydiff3);//计算参考直线的模
			getMod2 = Math.sqrt(xdiff2 * xdiff2 + ydiff2 * ydiff2);//计算cb直线的模
			//var angle = (Math.acos(dotMul/(getMod1 * getMod2)) *  180/Math.PI)/(360);
			angle = Math.acos(dotMul / (getMod1 * getMod2));
			dbxy = {x:c.x + z * Math.cos(angle), y:c.y + z * Math.sin(angle)};
		}
		else {
			dotMul = xdiff3 * xdiff2 + ydiff3 * ydiff2;//计算点乘的值
			getMod1 = Math.sqrt(xdiff3 * xdiff3 + ydiff3 * ydiff3);//计算参考直线的模
			getMod2 = Math.sqrt(xdiff2 * xdiff2 + ydiff2 * ydiff2);//计算cb直线的模
			//var angle = (Math.acos(dotMul/(getMod1 * getMod2)) *  180/Math.PI)/(360);
			angle = Math.acos(dotMul / (getMod1 * getMod2));
			dbxy = {x:c.x + z * Math.cos(angle), y:c.y - z * Math.sin(angle)};
		}
	}


	return [[daxy.x, daxy.y], [dbxy.x, dbxy.y]];
};


export default getTangentPointsOf3pAndRadius;
