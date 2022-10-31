const localGeoData1 = {
	geoVersionId: 11010200120180615,

	intId: 110102002,
	timestamp: 20180615,
	location: {lat: 110.110, lng: 102.102},
	class: 2,
	roadColor: "#545454",
	cornerIslandColor: "#426300",
	crossWalkColor: "#E5E5E5",
	textColor: "#000000",
	backgroundColor: "#FFFFFF",

	approaches: [
		/*		 */
		//approach [0]
		{
			appId: 1000,
			appAngle: 80,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "后厂村路",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 10, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 1, //meters
				crosswalkWidth: 4, //meters
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
					dividerId: 110102001,  //unique id from DB
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0.15,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 7, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 2, //meters
					capRadius: 1,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0,  //meters
				}
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 1,
							laneMov: ["1-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 15, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["2-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 60, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["2-2", "3-3"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 60, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "inboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 4,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 2, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: -1,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: -2,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
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
							laneId: -3,
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


		/*		*/
		//approach [1]
		{

			appId: 1001,
			appAngle: 170,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "东北旺西路",
			appSpeedLimit: 40, //km/hr
			appRoadClass: 3,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 10, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 90, //0 for auto
				crosswalkOffset: 7, //meters
				crosswalkWidth: 4, //meters
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
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 3, //1 for white dash, 2 for white solid, 3.......
					color: "#C57100",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.9, //meters
					capRadius: 0,  //meters
				}
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 1,
							laneMov: ["2-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 12, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["3-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["0-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: -1,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: -2,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: -3,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						}
					]
				}
			],
		},


		/*		*/
		//approach [2]
		{
			appId: 1002,
			appAngle: 260,
			inboundStorageLength: 40,   //meters
			inboundSlipLength: 7, //meters
			inboundStorageWidth: 3.5, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "后厂村路",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 10, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 5, //meters
				crosswalkWidth: 4, //meters
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
					dividerId: 110102001,  //unique id from DB
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: null, //meters
					storageSlipLength: null, //meters
					storageWidth: null, //meters
					startWidth: 0.3, //meters
					capRadius: 1,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 7, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 3, //meters
					capRadius: 2,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 0, //meters
					storageLength: null, //meters
					storageSlipLength: null, //meters
					storageWidth: null, //meters
					startWidth: 0.3, //meters
					capRadius: 0,  //meters
				}
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"

					lanes: [
						{
							laneId: 1,
							laneMov: ["3-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: ["Left Only"],
							waitingLength: 0, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["0-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 60, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["0-1", "1-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 40, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 60, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "inboundSide", //"inbound" / "outbound" / "inboundSide" / "outboundSide"
					lanes: [
						{
							laneId: 4,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outbound",  //"inbound" / "outbound" / "inboundSide" / "outboundSide"
					lanes: [
						{
							laneId: -1,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: -2,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: -3,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outboundSide",  //"inbound" / "outbound" / "inboundSide" / "outboundSide"
					lanes: [
						{
							laneId: -4,
							laneMov: null, //outbound lane has no laneMov
							whiteLinelength: -1, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						}
					]
				}
			],

		},



		/*		*/
		//approach [3]
		{
			appId: 1003,
			appAngle: 350,
			inboundStorageLength: 50,   //meters
			inboundSlipLength: 10, //meters
			inboundStorageWidth: 3, //meters
			outboundStorageLength: 50, //meters
			outboundSlipLength: 10, //meters
			outboundStorageWidth: 3, //meters
			appName: "友谊路",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 3,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 10, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 1, //meters
				crosswalkWidth: 4, //meters
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
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 3, //1 for white dash, 2 for white solid, 3.......
					color: "#C57100",
					offset: 10, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.9, //meters
					capRadius: null,  //meters
				},

			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 1,
							laneMov: ["0-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 40, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["1-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 40, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["1-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 40, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 4,
							laneMov: ["2-3"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 40, //meters
							laneLength: 50, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "outbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: -1,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: -2,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: -3,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: -4,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: 50, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
					]
				},
			],

		},

	],

	TM: {
		appIds: [0, 1, 2, 3, 4, "total"],
		volumes: [
			[null, 100, 100, 100, 300],
			[100, null, 100, 100, 300],
			[100, 100, null, 100, 300],
			[100, 100, 100, null, 300],
			[300, 300, 300, 300, 1200],
		],
		delays: [
			[], [], [], []
		],
		queues: [
			[], [], [], []
		]
	}
};


export default localGeoData1;
