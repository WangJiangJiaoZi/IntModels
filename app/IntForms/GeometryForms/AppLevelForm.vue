<template>
	<div id="app-level-form">
		<table
			width="98%"
		>
			<tbody>
				<tr>
					<BaseRowHead
						v-bind:labelName = "appAngleLable"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseDropdownLongOptionsCell
						v-bind:labelName = "appAngleLable"
						v-bind:curSelectedIndex = "selectedAngleIndex"
						v-bind:options = "appAngleOptions"
						v-bind:selectHandler = "updateAppAngle"
					/>
				</tr>
				<tr
					v-for = "(oneSetting, index) in appLevelSettings"
					:key = "oneSetting.labelName"
					v-bind = "oneSetting"
				>
					<BaseRowHead
						v-bind:labelName = "oneSetting.labelName"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseInputCell
						v-bind:labelName = "oneSetting.labelName"
						v-bind:cellPlaceHolder = "oneSetting.cellPlaceHolder"
						v-bind:cellType = "oneSetting.cellType"
						v-bind:enterHandler = "oneSetting.enterHandler"
						v-bind:inputValue = "oneSetting.inputValue"
						v-bind:baseCellWidth = "appCellWidth"
					/>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

import BaseRowHead from "../SharedBaseCells/BaseRowHead.vue";
import BaseInputCell from "../SharedBaseCells/BaseInputCell.vue";
import BaseDropdownLongOptionsCell from "../SharedBaseCells/BaseDropdownLongOptionsCell.vue";

export default {
	name: "AppLevelForm",
	props: {
		labelWdith: Number,
		appCellWidth: Number,
		appFormWidth: Number,
		curAppIndex: Number,
		language: Number,
		updateAngles: Function,
	},
	components: {
		BaseRowHead,
		BaseInputCell,
		BaseDropdownLongOptionsCell
	},
	mounted: function() {
		const updateAppLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateAppLevelGeo;
		this.updateAppLevelGeo = updateAppLevelGeo;

		const updateTextLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateTextLevelGeo;
		this.updateTextLevelGeo = updateTextLevelGeo;
	},
	data: function() {
		return {
			appAngleLable: (this.language === 1) ? "Road Angle" : "道路角度",
		};
	},
	computed: {
		appAngleOptions: function() {
			const curAppAngleRangeArray = this.getAppAngleRangeArray();
			const appAngleOptions = [];

			curAppAngleRangeArray.forEach((oneAngle) => {
				appAngleOptions.push({
					label: JSON.stringify(oneAngle),
					value: JSON.stringify(oneAngle)
				});
			});

			return appAngleOptions;
		},
		selectedAngleIndex: function() {
			const selectedAngleIndex = this.getSelectedAngleIndex();

			return selectedAngleIndex;
		},
		appLevelSettings: function() {
			const getAppLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getAppLevelGeo;
			const curApp = getAppLevelGeo.getApproachByAppIndex(this.curAppIndex);

			const getTextLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getTextLevelGeo;
			const roadName = getTextLevelGeo.getRoadNameByAppIndex(
								this.curAppIndex, this.language
							);
			/*
			const roadDirName = getTextLevelGeo.getRoadDirNameByAppIndex(
								this.curAppIndex, this.language
							);
			*/
			const appLevelSettings = [
				{
					labelName: (this.language === 1) ? "INBD Storage Len" : "进口方向展宽长度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppIbStLen,
					inputValue: JSON.stringify(curApp.inboundStorageLength)
				},
				{
					labelName: (this.language === 1) ? "INBD Taper Len" : "进口方向展宽过渡段长",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppIbSlipLen,
					inputValue: JSON.stringify(curApp.inboundSlipLength)
				},
				{
					labelName: (this.language === 1) ? "INBD Storage Width" : "进口方向展宽宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppIbStWidth,
					inputValue: JSON.stringify(curApp.inboundStorageWidth)
				},
				{
					labelName: (this.language === 1) ? "OUTBD Storage Len" : "出口方向展宽长度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppObStLen,
					inputValue: JSON.stringify(curApp.outboundStorageLength)
				},
				{
					labelName: (this.language === 1) ? "OUTBD Taper Len" : "出口方向展宽过渡段长",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppObSlipLen,
					inputValue: JSON.stringify(curApp.outboundSlipLength)
				},
				{
					labelName: (this.language === 1) ? "OUTBD Storage Width" : "出口方向展宽宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppObStWidth,
					inputValue: JSON.stringify(curApp.outboundStorageWidth)
				},
				{
					labelName: (this.language === 1) ? "Speed Limit" : "限速",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppSpeedLimit,
					inputValue: JSON.stringify(curApp.appSpeedLimit)
				},
				{
					labelName: (this.language === 1) ? "Road Class" : "道路级别",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppRoadClass,
					inputValue: JSON.stringify(curApp.appRoadClass)
				},

				{
					labelName: (this.language === 1) ? "Road Name" : "道路名称",
					cellPlaceHolder: "text",
					cellType: "text",
					enterHandler: this.updateAppRoadName,
					inputValue: roadName
				},
				/*
				//dirName update is closed for now. Backend support needed.
				{
					labelName: (this.language === 1) ? "Direction Name" : "方向名称",
					cellPlaceHolder: "text",
					cellType: "text",
					enterHandler: this.updateAppDirName,
					inputValue: roadDirName
				},
				*/
				{
					labelName: (this.language === 1) ? "Road Slope" : "道路坡度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateAppSlope,
					inputValue: curApp.slope
				},
			];

			return appLevelSettings;
		},
	},
	methods: {
		getAppAngleRangeArray: function() {
			const getAppLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getAppLevelGeo;
			const curAppAngleRange = getAppLevelGeo.getAppAngleRangeByAppIndex(
										this.curAppIndex, this.language
									);
			const startAngle = curAppAngleRange.startAngle;
			const endAngle = curAppAngleRange.endAngle;

			const rangeArray = [];
			for (let angle = startAngle; angle <= endAngle; angle += 5) {
				rangeArray.push(angle);
			}

			return rangeArray;
		},
		getSelectedAngleIndex: function() {
			const getAppLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getAppLevelGeo;
			const curApp = getAppLevelGeo.getApproachByAppIndex(this.curAppIndex);
			const curAngle = curApp.appAngle;

			const angleRangeArray = this.getAppAngleRangeArray();
			const angleIndex = angleRangeArray.indexOf(curAngle);

			return angleIndex;
		},


		updateAppAngle: function (nextAngle) {
			const ifReDraw = true;
			this.updateAppLevelGeo.updateAppAngle(
				this.curAppIndex,
				Number(nextAngle),
				ifReDraw,
				this.language
			);

			this.updateAngles(Number(nextAngle));
		},
		updateAppIbStLen: function (enterEvent) {
			const nextIbStLen = enterEvent.target.value;
			const ifReDraw = true;
			this.updateAppLevelGeo.updateAppIbStLen(
				this.curAppIndex,
				Number(nextIbStLen),
				ifReDraw,
				this.language
			);
		},

		updateAppIbSlipLen: function (enterEvent) {
			const nextIbSlipLen = enterEvent.target.value;
			const ifReDraw = true;
			this.updateAppLevelGeo.updateAppIbSlipLen(
				this.curAppIndex,
				Number(nextIbSlipLen),
				ifReDraw,
				this.language
			);
		},

		updateAppIbStWidth: function (enterEvent) {
			const nextIbStWidth = enterEvent.target.value;
			const ifReDraw = true;
			this.updateAppLevelGeo.updateAppIbStWidth(
				this.curAppIndex,
				Number(nextIbStWidth),
				ifReDraw,
				this.language
			);
		},

		updateAppObStLen: function (enterEvent) {
			const nextObStLen = enterEvent.target.value;
			const ifReDraw = true;
			this.updateAppLevelGeo.updateAppObStLen(
				this.curAppIndex,
				Number(nextObStLen),
				ifReDraw,
				this.language
			);
		},

		updateAppObSlipLen: function (enterEvent) {
			const nextObSlipLen = enterEvent.target.value;
			const ifReDraw = true;
			this.updateAppLevelGeo.updateAppObSlipLen(
				this.curAppIndex,
				Number(nextObSlipLen),
				ifReDraw,
				this.language
			);
		},

		updateAppObStWidth: function (enterEvent) {
			const nextObStWidth = enterEvent.target.value;
			const ifReDraw = true;
			this.updateAppLevelGeo.updateAppObStWidth(
				this.curAppIndex,
				Number(nextObStWidth),
				ifReDraw,
				this.language
			);
		},

		updateAppSpeedLimit: function (enterEvent) {
			const nextSpeedLimit = enterEvent.target.value;
			this.updateAppLevelGeo.updateAppSpeedLimit(
				this.curAppIndex,
				Number(nextSpeedLimit),
				this.language
			);
		},

		updateAppRoadClass: function (enterEvent) {
			const nextRoadClass = enterEvent.target.value;
			this.updateAppLevelGeo.updateAppRoadClass(
				this.curAppIndex,
				Number(nextRoadClass),
				this.language
			);
		},


		updateAppRoadName: function(enterEvent) {
			const nextRoadName = enterEvent.target.value;
			const ifReDraw = true;

			this.updateTextLevelGeo.updateTextFeature(
				this.curAppIndex,
				"appName",
				"name",
				nextRoadName,
				ifReDraw,
				this.language
			);

		},

		/*
		//updateAppDirName closed for now...
		updateAppDirName: function(enterEvent) {
			const nextDirName = enterEvent.target.value;
			const ifReDraw = true;

			this.updateTextLevelGeo.updateTextFeature(
				this.curAppIndex,
				"dirName",
				"name",
				nextDirName,
				ifReDraw,
				this.language
			);
		}
		*/

		updateAppSlope: function(enterEvent) {
			const nextSlope = enterEvent.target.value;

			this.updateAppLevelGeo.updateAppSlope(
				this.curAppIndex,
				nextSlope,
				this.language
			);
		}
	}


};
</script>

<style scoped>

</style>