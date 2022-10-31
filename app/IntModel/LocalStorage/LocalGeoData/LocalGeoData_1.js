const localGeoData = {
	geoVersionId: 11010200120180301,

	intId: 110102001,
	timestamp: 20180301,
	location: {
		lat: 110.110, lng: 102.102, h: 0
	},
	transformedLocation: [0, 0, 0],  //meters
	class: 2,
	roadColor: "#545454",
	cornerIslandColor: "#426300",
	crossWalkColor: "#E5E5E5",
	textColor: "#000000",
	backgroundColor: "#FFFFFF",
	intDiameter: 200,  //meters

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
			appName: "车载设备路",
			appSpeedLimit: 15, //km/hr
			appRoadClass: 2,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 7, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: false,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 1, //meters
				crosswalkWidth: 6, //meters
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
					capRadius: null,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 1, //1 for white dash, 2 for white solid, 3.......
					color: "#C57100",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: null,  //meters
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
					capRadius: null,  //meters
				}
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 1,  //unique id from DB
							laneMov: ["1-0", "2-0", "3-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: ["No Left Turn", "(9:00 am - 18:00 pm)"],
							waitingLength: 0, //meters
							//signalGroupId: 0, //unique id from DB
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["3-0", "4-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 0, //unique id from DB
							laneLineColor: "#FFFFFF",
						},
					]
				},
				{
					bound: "inboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 3,
							laneMov: null, //bike lane has no mov
							whiteLinelength: -1, //meters, -1 for unlimited length
							laneLength: -1, //meters
							laneWidth: 2, //meters
							laneSpeedLimit: 20, //km/hr
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
						{
							laneId: 3,
							laneMov: [], //bike lane has no mov
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
					bound: "outboundSide", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 3,
							laneMov: null, //bike lane has no mov
							whiteLinelength: -1, //meters
							laneLength: -1, //meters
							laneWidth: 2, //meters
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


		/*		*/
		//approach [1]
		{

			appId: 1,
			appAngle: 60,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "公共交通路",
			appSpeedLimit: 15, //km/hr
			appRoadClass: 3,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 7, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 7, //meters
				crosswalkWidth: 5, //meters
				crosswalkBuffer: 0.75, //meters
				crosswalkHeight: 0.8, //meters
				crosswalkGap: 0.8, //meters
			},

			dividerGroup: [
			],

			laneGG: [
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
			appId: 2,
			appAngle: 90,
			inboundStorageLength: 30,   //meters
			inboundSlipLength: 7, //meters
			inboundStorageWidth: 4, //meters
			outboundStorageLength: 20, //meters
			outboundSlipLength: 10, //meters
			outboundStorageWidth: 7, //meters
			appName: "城市交通大道",
			appSpeedLimit: 60, //km/hr
			appRoadClass: 1,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 3, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 4, //meters
				cornerInboundWidth: 4, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 4,  //meters
				cornerCrosswalkWidth: 3,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 5, //meters
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
					dividerId: 110102001,  //unique id from DB
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#FFFFFF",
					offset: 15, //meters
					storageLength: null, //meters
					storageSlipLength: null, //meters
					storageWidth: null, //meters
					startWidth: 0.3, //meters
					capRadius: 2,  //meters
				},
				{
					dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 20, //meters
					storageLength: 30, //meters
					storageSlipLength: 7, //meters
					storageWidth: 3.5, //meters
					startWidth: 2, //meters
					capRadius: 2,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 4, //meters
					storageLength: null, //meters
					storageSlipLength: null, //meters
					storageWidth: null, //meters
					startWidth: 1, //meters
					capRadius: 1,  //meters
				},
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
							waitingLength: 25, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["3-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 45, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: ["Left Only"],
							waitingLength: 25, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						/**/
						{
							laneId: 3,
							laneMov: ["4-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: ["BUS", "Left Only"],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 4,
							laneMov: ["4-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 55, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						}

					]
				},
				/*
				{
					bound: "inbound", //"inbound" / "outbound"
					waitingLength: 0, //meters
					//signalGroupId: 3,
					laneLineColor: "#FFFFFF",
					lanes: [
						{
							laneId: 3,
							laneMov: ["4-2"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: ["BUS", "Left Only"]
						},
						{
							laneId: 4,
							laneMov: ["4-3"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 55, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: []
						}
					]
				},
				*/
				{
					bound: "inboundSide", //"inbound" / "outbound" / "inboundSide" / "outboundSide"
					lanes: [
						{
							laneId: 5,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 30, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						/*
						{
							laneId: 6,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: 20, //meters
							laneLength: 30, //meters
							laneWidth: 1, //meters
							laneSpeedLimit: 30, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						*/
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
							laneLength: 40, //meters, -1 for unlimited
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
							laneLength: 20, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						}

					]
				},
				{
					bound: "outboundSide",  //"inbound" / "outbound" / "inboundSide" / "outboundSide"
					lanes: [
						{
							laneId: -5,
							laneMov: null, //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: 15, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						/*
						{
							laneId: -6,
							laneMov: null, //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: 15, //meters, -1 for unlimited
							laneWidth: 1, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						},
						*/
					]
				}
			],

		},



		/*		*/
		//approach [3]
		{
			appId: 3,
			appAngle: 180,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "车载设备南路",
			appSpeedLimit: 15, //km/hr
			appRoadClass: 3,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 15, //meters
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
				crosswalkWidth: 6, //meters
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
					type: 2, //1 for white dash, 2 for white solid, 3.......
					color: "#C57100",
					offset: 0, //meters
					storageLength: 0, //meters
					storageSlipLength: 0, //meters
					storageWidth: 0, //meters
					startWidth: 0.3, //meters
					capRadius: null,  //meters
				},
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 1,
							laneMov: ["4-0", "3-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 20, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["0-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["1-2", "2-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: ["Right Only"],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						}
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
						}
					]
				},
			],

		},



		/*		*/
		//approach [4]
		{
			appId: 4,
			appAngle: 270,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 30, //meters
			outboundSlipLength: 7, //meters
			outboundStorageWidth: 3.5, //meters
			appName: "城市交通大道",
			appSpeedLimit: 15, //km/hr
			appRoadClass: 1,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 15, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 0, //meters
				crosswalkWidth: 5, //meters
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
					storageLength: 25, //meters
					storageSlipLength: 7, //meters
					storageWidth: 3.5, //meters
					startWidth: 0.3, //meters
					capRadius: null,  //meters
				},
				{
					dividerType: 1, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 10, //meters
					storageLength: 20, //meters
					storageSlipLength: 7, //meters
					storageWidth: null, //meters
					startWidth: 3, //meters
					capRadius: 1,  //meters
				},
				{
					dividerType: 2, //1 for "inbound" / 2 for "outbound" / 3 for "center"
					dividerId: 110102001,  //unique id from DB
					type: 8, //1 for white dash, 2 for white solid, 3.......
					color: "#426300",
					offset: 10, //meters
					storageLength: 20, //meters
					storageSlipLength: 7, //meters
					storageWidth: null, //meters
					startWidth: 3, //meters
					capRadius: 1,  //meters
				},
			],

			laneGG: [

				{
					bound: "inbound",  //"inbound" / "outbound" / "inboundSide" / "outboundSide"
					lanes: [
						{
							laneId: 1,
							laneMov: ["0-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: 20, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 15, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["1-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: 30, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["2-0"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 4,
							laneMov: ["2-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 5,
							laneMov: ["1-0"],//["2-3", "3-1"], //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						}
					]
				},
				{
					bound: "inboundSide",  //"inbound" / "outbound" / "inboundSide" / "outboundSide"
					lanes: [
						{
							laneId: 6,
							laneMov: null, //to which lane in which approach: "appId-laneId"
							whiteLinelength: 10, //meters
							laneLength: -1, //meters
							laneWidth: 3.5, //meters
							laneSpeedLimit: 20, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: null,
							laneLineColor: "#FFFFFF",
						}
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
				{
					bound: "outboundSide",  //"inbound" / "outbound" / "inboundSide" / "outboundSide"
					lanes: [
						{
							laneId: -4,
							laneMov: null, //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: 25, //meters, -1 for unlimited
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
		//approach [5]
		{

			appId: 5,
			appAngle: 315,
			inboundStorageLength: 0,   //meters
			inboundSlipLength: 0, //meters
			inboundStorageWidth: 0, //meters
			outboundStorageLength: 0, //meters
			outboundSlipLength: 0, //meters
			outboundStorageWidth: 0, //meters
			appName: "新路",
			appSpeedLimit: 15, //km/hr
			appRoadClass: 3,

			corner: {
				cornerId: 110102001,  //unique id from DB
				cornerType: 2, //1 for polyline, 2 for arc, 3 for arc and island
				cornerRadius: 3, //meters
				cornerInboundWidth: 0, //meters
				cornerOutboundWidth: 0, //meters
				channelWidth: 0,  //meters
				cornerCrosswalkWidth: 0,  //meters
			},

			crosswalk: {
				ifCrosswalk: true,
				crosswalkId: 110102001,  //unique id from DB
				crosswalkAngle: 0, //0 for auto
				crosswalkOffset: 7, //meters
				crosswalkWidth: 5, //meters
				crosswalkBuffer: 0.75, //meters
				crosswalkHeight: 0.8, //meters
				crosswalkGap: 0.8, //meters
			},

			dividerGroup: [
			],

			laneGG: [
				{
					bound: "inbound", //"inbound" / "outbound"
					lanes: [
						{
							laneId: 1,
							laneMov: ["1-0", "0-0"], //outbound lane has no laneMov
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 2,
							laneMov: ["2-0"], //outbound lane has no laneMov
							whiteLinelength: 10, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 1,
							laneLineColor: "#FFFFFF",
						},
						{
							laneId: 3,
							laneMov: ["4-2", "3-1"], //outbound lane has no laneMov
							whiteLinelength: 10, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 2,
							laneLineColor: "#FFFFFF",
						},
					]
				},
				/*
				{
					bound: "outbound",
					lanes: [
						{
							laneId: 4,
							laneMov: [],
							whiteLinelength: 0, //meters
							laneLength: -1, //meters, -1 for unlimited
							laneWidth: 3.5, //meters
							laneSpeedLimit: 40, //km/hr
							laneText: [],
							waitingLength: 0, //meters
							//signalGroupId: 0,
							laneLineColor: "#FFFFFF",
						}
					]
				}
				*/
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


export default localGeoData;
