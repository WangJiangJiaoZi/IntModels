<template>
	<div id="ib-lg-features-form">
		<tr
			v-for = "(oneIbLgFeatureRowProp, oneIbLgFeatureRowPropIndex) in ibLgFeatureRowPropsArray"
			:key = "curAppIndex + 'ib-lg-feature-setting-' + oneIbLgFeatureRowPropIndex"
		>
			<IbLgFeatureRow
				v-bind:style = "{width: (cellWidth + 5)* laneCounts + labelWdith + 'px'}"
				v-bind = "oneIbLgFeatureRowProp"
			/>
		</tr>
	</div>
</template>

<script>
import IbLgFeatureRow from "./IbLgFeatureRow.vue";

import icons from "../../../PredefinedShapes/Icons";


export default {
	name: "IbLgFeaturesForm",

	props: {
		labelWdith: Number,
		formWidth: Number,
		cellWidth: Number,
		curAppIndex: Number,
		laneCounts: Number,
		language: Number
	},
	components: {
		IbLgFeatureRow
	},
	data: function() {

		return {
			ibFeatureSettings: this.getIbFeatureSettings(),
		}
	},

	computed: {
		ibLgFeatureRowPropsArray: function() {
			const ibLgFeatureRowPropsArray = [];

			this.ibFeatureSettings.forEach((oneFeatureSetting, index) => {

				ibLgFeatureRowPropsArray.push({
					labelName: oneFeatureSetting.labelName,
					featureName: oneFeatureSetting.featureName,
					ifActiveOnInnerLane: oneFeatureSetting.ifActiveOnInnerLane,
					enterHandler: oneFeatureSetting.enterHandler,
					labelWdith: this.labelWdith,
					formWidth: this.formWidth,
					cellWidth: this.cellWidth,
					curAppIndex: this.curAppIndex,
					laneCounts: this.laneCounts,
					language: this.language
				});
			});

			return ibLgFeatureRowPropsArray;
		}
	},
	mounted: function() {
		const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;
		this.updateLaneGGLevelGeo = updateLaneGGLevelGeo;
	},
	methods: {
		getIbFeatureSettings: function() {
			const ibFeatureSettings = [
				{
					labelName: (this.language === 1) ? "Lane Width" : "车道宽度",
					featureName: "laneWidth",
					ifActiveOnInnerLane: true,
					enterHandler: this.updateLaneWidth,
				},
				{
					labelName: (this.language === 1) ? "Waiting Area Length" : "待转区长度",
					featureName: "waitingLength",
					ifActiveOnInnerLane: true,
					enterHandler: this.updateWaitingAreaLength,
				},
				{
					labelName: (this.language === 1) ? "Lane Speed Limit" : "车道限速",
					featureName: "laneSpeedLimit",
					ifActiveOnInnerLane: true,
					enterHandler: this.updateLaneSpeedLimit
				},
				/*tbd....
				{
					labelName: (this.language === 1) ? "Lane Text" : "车道文字标识",
					featureName: "laneText",
					ifActiveOnInnerLane: true,
					enterHandler: this.updateWaitingAreaLength
				},
				*/
				{
					labelName: (this.language === 1) ? "Leftside Line Total Len" : "道左划线全长",
					featureName: "laneLength",
					ifActiveOnInnerLane: false,
					enterHandler: this.updateLaneLength
				},
				{
					labelName: (this.language === 1) ? "Leftside Solid Line Len" : "道左划线实线长",
					featureName: "whiteLinelength",
					ifActiveOnInnerLane: false,
					enterHandler: this.updateLaneSolidLineLength
				},
				{
					labelName: (this.language === 1) ? "Leftside Line Color" : "道左划线颜色",
					featureName: "laneLineColor",
					ifActiveOnInnerLane: false,
					enterHandler: this.updateLaneLineColor
				},
			];

			return ibFeatureSettings;
		},

		updateLaneWidth: function(laneIndex, nextInputValue) {
			const nextLaneWidth = Number(nextInputValue);
			const featureName = "laneWidth";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "inbound", laneIndex,
				featureName, nextLaneWidth, ifReDraw, this.language
			);
		},

		updateWaitingAreaLength: function(laneIndex, nextInputValue) {
			const nextWaitingLength = Number(nextInputValue);
			const featureName = "waitingLength";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "inbound", laneIndex,
				featureName, nextWaitingLength, ifReDraw, this.language
			);
		},

		updateLaneSpeedLimit: function(laneIndex, nextInputValue) {
			const nextLaneSpeedLimit = Number(nextInputValue);
			const featureName = "laneSpeedLimit";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "inbound", laneIndex,
				featureName, nextLaneSpeedLimit, ifReDraw, this.language
			);
		},

		updateLaneText: function(laneIndex, nextInputValue) {
			const nextLaneText = Number(nextInputValue);
			const featureName = "laneText";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "inbound", laneIndex,
				featureName, nextLaneText, ifReDraw, this.language
			);
		},

		updateLaneLength: function(laneIndex, nextInputValue) {
			const nextLaneLength = Number(nextInputValue);
			const featureName = "laneLength";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "inbound", laneIndex,
				featureName, nextLaneLength, ifReDraw, this.language
			);
		},

		updateLaneSolidLineLength: function(laneIndex, nextInputValue) {
			const nextWhiteLaneLength = Number(nextInputValue);
			const featureName = "whiteLineLength";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "inbound", laneIndex,
				featureName, nextWhiteLaneLength, ifReDraw, this.language
			);
		},

		updateLaneLineColor: function(laneIndex, nextInputValue) {
			const nextLaneLineColor = nextInputValue;
			const featureName = "laneLineColor";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "inbound", laneIndex,
				featureName, nextLaneLineColor, ifReDraw, this.language
			);
		}


	}


};
</script>

<style scoped>
td {
	padding: 0px;
	padding-top: 4px;
}




</style>