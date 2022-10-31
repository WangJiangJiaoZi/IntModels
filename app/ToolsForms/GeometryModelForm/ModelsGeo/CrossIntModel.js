const crossIntModel = {
	geoVersionId: 11010200320180620,

	intId: 110102003,
	timestamp: new Date().getTime(),
	location: {lat: 110.110, lng: 102.102},
	class: 2,
	controlType: "signal",
	roadColor: "#545454",
	cornerIslandColor: "#426300",
	crossWalkColor: "#E5E5E5",
	textColor: "#000000",
	backgroundColor: "#FFFFFF",

	approaches: [
		/*		 */
		//approach [0]
		{
			appId: 0,
			appAngle: 0,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "未名路一",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 15, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 1, //meters
				crosswalkWidth: 7, //meters
				crosswalkBuffer: 0.75, //meters
				crosswalkHeight: 0.8, //meters
				crosswalkGap: 0.8, //meters
			},

			dividerGroup: [
				//*
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

				//"divC" is divider color:
				//0: white
				//1: yellow
				{
					dividerType: 1, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0.5,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 1, //meters
					capRadius: 0.5,  //meters
				}
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: ["1-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: ["2-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: ["3-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "inboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 3,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 4.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: null, //outbound bike lane
							whiteLinelength: -1, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				}
			],

		},

		//approach [1]
		{
			appId: 1,
			appAngle: 90,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "未名路二",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 15, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 1, //meters
				crosswalkWidth: 7, //meters
				crosswalkBuffer: 0.75, //meters
				crosswalkHeight: 0.8, //meters
				crosswalkGap: 0.8, //meters
			},

			dividerGroup: [
				//*
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

				//"divC" is divider color:
				//0: white
				//1: yellow
				{
					dividerType: 1, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0.5,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 1, //meters
					capRadius: 0.5,  //meters
				}
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: ["2-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: ["3-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: ["0-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "inboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 3,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 4.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: null, //outbound bike lane
							whiteLinelength: -1, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				}
			],

		},

		//approach [2]
		{
			appId: 2,
			appAngle: 180,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "未名路三",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 15, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 1, //meters
				crosswalkWidth: 7, //meters
				crosswalkBuffer: 0.75, //meters
				crosswalkHeight: 0.8, //meters
				crosswalkGap: 0.8, //meters
			},

			dividerGroup: [
				//*
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

				//"divC" is divider color:
				//0: white
				//1: yellow
				{
					dividerType: 1, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0.5,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 1, //meters
					capRadius: 0.5,  //meters
				}
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: ["3-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: ["0-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: ["1-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "inboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 3,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 4.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: null, //outbound bike lane
							whiteLinelength: -1, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				}
			],
		},

		//approach [3]
		{
			appId: 3,
			appAngle: 270,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "未名路四",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 15, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 1, //meters
				crosswalkWidth: 7, //meters
				crosswalkBuffer: 0.75, //meters
				crosswalkHeight: 0.8, //meters
				crosswalkGap: 0.8, //meters
			},

			dividerGroup: [
				//*
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

				//"divC" is divider color:
				//0: white
				//1: yellow
				{
					dividerType: 1, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0.5,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 1, //meters
					capRadius: 0.5,  //meters
				}
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: ["0-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: ["1-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: ["2-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "inboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 3,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: null,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 4.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: null,
							laneMov: null, //outbound bike lane
							whiteLinelength: -1, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				}
			],

		},
	],
};


export default crossIntModel;
