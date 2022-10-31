const localGeoData3 = {
	geoVersionId: 11010200320180620,

	intId: 110102003,
	timestamp: 20180620,
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
			appId: 0,
			appAngle: 80,
			inboundStorageLength: 10,   //meters
			inboundSlipLength: 10, //meters
			inboundStorageWidth: 5, //meters
			outboundStorageLength: 20, //meters
			outboundSlipLength: 10, //meters
			outboundStorageWidth: 5, //meters
			appName: "上地三街",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerType: 3, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 30, //meters
				cornerInboundWidth: 1.5, //meters
				cornerOutboundWidth: 1.5, //meters
				channelWidth: 4,  //meters
				cornerCrosswalkWidth: 5,  //meters
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
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 20, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 1, //meters
					capRadius: 0.5,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 3, //1 for white dash, 2 for white solid, 3.......
					color: "#C57100",
					offset: 7, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.9, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 15, //meters
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
							laneId: 1,
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
							laneId: 2,
							laneMov: ["1-1"], //to which lane in which approach: "appId-laneId"
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
							laneId: 3,
							laneMov: ["2-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 45, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 4,
							laneMov: ["2-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 40, //meters
							laneWidth: 2.5, //meters
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
							laneId: 5,
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
						{
							laneId: 6,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 1.5, //meters
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
							laneId: -1,
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
							laneId: -2,
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
							laneId: -3,
							laneMov: [], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: 70, //meters, -1 for unlimited
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
							laneId: -4,
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
						{
							laneId: -5,
							laneMov: null, //outbound bike lane
							whiteLinelength: -1, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 1.5, //meters
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

			appId: 1,
			appAngle: 170,
			inboundStorageLength: 20,   //meters
			inboundSlipLength: 10, //meters
			inboundStorageWidth: 3.5, //meters
			outboundStorageLength: 20, //meters
			outboundSlipLength: 10, //meters
			outboundStorageWidth: 3.5, //meters
			appName: "信息路",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerType: 3, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 30, //meters
				cornerInboundWidth: 1.5, //meters
				cornerOutboundWidth: 1.5, //meters
				channelWidth: 4,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 7, //meters
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
					offset: 20, //meters
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
					offset: 5, //meters
					storageLength: 40, //meters
					storageSlipLength: 10, //meters
					storageWidth: 7, //meters
					startWidth: 0.9, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 20, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: 0,  //meters
				},
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 1,
							laneMov: ["2-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 70, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["2-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 70, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["3-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 60, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 4,
							laneMov: ["3-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 5,
							laneMov: ["3-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 40, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
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
							laneId: 6,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 1.5, //meters
							laneSpeedLimit: 40, //km/hr
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
							laneLength: 50, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						}
					]
				},
				{
					bound: "outboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: -4,
							laneMov: null, //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 1.5, //meters
							laneSpeedLimit: 40, //km/hr
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
		//approach [2]
		{
			appId: 2,
			appAngle: 260,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "上地三街",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerType: 3, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 30, //meters
				cornerInboundWidth: 1.5, //meters
				cornerOutboundWidth: 1.5, //meters
				channelWidth: 5,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 7, //meters
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
					offset: 20, //meters
					storageLength: null, //meters
					storageSlipLength: null, //meters
					storageWidth: null, //meters
					startWidth: 0.3, //meters
					capRadius: 1,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 3, //1 for white dash, 2 for white solid, 3.......
					color: "#C57100",
					offset: 5, //meters
					storageLength: 40, //meters
					storageSlipLength: 10, //meters
					storageWidth: 3.5, //meters
					startWidth: 0.9, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 20, //meters
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
							laneLength: 35, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: ["Left Only"],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["3-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 40, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: ["Left Only"],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["0-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 60, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 4,
							laneMov: ["0-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 60, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 5,
							laneMov: ["0-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 60, //km/hr
							laneText: [],
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
							laneId: 6,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 1.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 3,
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
						{
							laneId: -4,
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
							laneId: -5,
							laneMov: null, //outbound lane has no laneMov
							whiteLinelength: -1, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 1.5, //meters
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
			appId: 3,
			appAngle: 350,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 5, //meters
			outboundSlipLength: 10, //meters
			outboundStorageWidth: 3.5, //meters
			appName: "信息路",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 2,

			corner: {
				cornerType: 3, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 30, //meters
				cornerInboundWidth: 1.5, //meters
				cornerOutboundWidth: 1.5, //meters
				channelWidth: 5,  //meters
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
					offset: 20, //meters
					storageLength: null, //meters
					storageSlipLength: null, //meters
					storageWidth: null, //meters
					startWidth: 0.3, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 5, //meters
					storageLength: 40, //meters
					storageSlipLength: 10, //meters
					storageWidth: 7, //meters
					startWidth: 0.9, //meters
					capRadius: 0,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 20, //meters
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
							laneMov: ["0-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 30, //meters
							laneLength: 35, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["0-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 30, //meters
							laneLength: 35, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 15, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["1-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 30, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 50, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 4,
							laneMov: ["1-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 30, //meters
							laneLength: -1, //meters
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
					bound: "inboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 4,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 1.5, //meters
							laneSpeedLimit: 20, //km/hr
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
							laneLength: 30, //meters, -1 for unlimited
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
							laneId: -1,
							laneMov: null, //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 1.5, //meters
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


export default localGeoData3;
