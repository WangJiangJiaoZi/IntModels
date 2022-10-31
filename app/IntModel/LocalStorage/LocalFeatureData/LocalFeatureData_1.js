


const localFeatureData = [
	//intersection level of service:
	{
		level: "intersection",
		type: "LOS",
		values: "F"
	},
	{
		level: "intersection",
		type: "controlType",
		values: "signal"
	},
	{
		level: "intersection",
		type: "delay",
		values: "90.4"
	},
	//movements volumes:
	{
		level: "movement",
		type: "volume",
		unit: "",
		values: [
			[50, 30, 80, 200, 115, null],
			[null, null, null, null, null, null],
			[15, 31, 10, 112, 421, null],
			[300, 71, 56, 40, 271, null],
			[200, 146, 1002, 300, 40, null],
			[70, 85, 202, 102, 88, null]
		]
	},
	//movement delays:
	{
		level: "movement",
		type: "delay",
		unit: "s",
		values: [
			[2, 40, 40, 25, 13, null],
			[null, null, null, null, null, null],
			[5, 1, 30, 50, 40, null],
			[50, 50, 3, 2, 60, null],
			[100, 100, 47, 2, 2, null],
			[90, 90, 96, 49, 1, null]
		]
	},
	//movement stops:
	{
		level: "movement",
		type: "stop",
		unit: "",
		values: [
			[1, 1, 1, 1, 1, null],
			[null, null, null, null, null, null],
			[1, 1, 2, 2, 1, null],
			[2, 2, 1, 1, 2, null],
			[3, 3, 2, 0, 0, null],
			[2, 2, 2, 2, 0, null]
		]
	},
	//movement queue length:
	{
		level: "movement",
		type: "queue",
		unit: "m",   //meters
		values: [
			[0, 40, 40, 25, 10, null],
			[null, null, null, null, null, null],
			[5, 0, 30, 50, 40, null],
			[50, 50, 0, 0, 60, null],
			[100, 100, 50, 0, 0, null],
			[90, 90, 95, 45, 1, null]
		]
	},
	//movement v/c ratio
	{
		level: "movement",
		type: "overflow",
		unit: "%",
		values: [
			[0, 0, 0, 0, 10, null],
			[null, null, null, null, null, null],
			[0, 0, 0, 0, 0, null],
			[0, 0, 0, 0, 0, null],
			[0.05, 0.05, 0, 0, 0, null],
			[0.04, 0.04, 0.03, 0, 0, null]
		]
	},
];


export default localFeatureData;
