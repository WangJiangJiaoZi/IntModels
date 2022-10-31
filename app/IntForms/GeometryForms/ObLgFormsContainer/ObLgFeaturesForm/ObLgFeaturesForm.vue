<template>
	<div id="ob-lg-features-form">
		<tr
			v-for = "(oneIbLgFeatureRowProp, oneIbLgFeatureRowPropIndex) in obLgFeatureRowPropsArray"
			:key = "curAppIndex + 'ob-lg-feature-setting-' + oneIbLgFeatureRowPropIndex"
		>
			<ObLgFeatureRow
				v-bind:style = "{width: (cellWidth + 3) * laneCounts + labelWdith + 'px'}"
				v-bind = "oneIbLgFeatureRowProp"
			/>
		</tr>
	</div>
</template>

<script>
import ObLgFeatureRow from "./ObLgFeatureRow.vue";

export default {
	name: "ObLgFeaturesForm",

	props: {
		labelWdith: Number,
		formWidth: Number,
		cellWidth: Number,
		curAppIndex: Number,
		laneCounts: Number,
		language: Number
	},
	components: {
		ObLgFeatureRow
	},
	data: function() {

		return {
			obFeatureSettings: this.getObFeatureSettings(),
		}
	},

	computed: {
		obLgFeatureRowPropsArray: function() {
			const obLgFeatureRowPropsArray = [];

			this.obFeatureSettings.forEach((oneFeatureSetting, index) => {
				obLgFeatureRowPropsArray.push({
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

			return obLgFeatureRowPropsArray;
		}
	},
	mounted: function() {
		const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;
		this.updateLaneGGLevelGeo = updateLaneGGLevelGeo;
	},
	methods: {
		getObFeatureSettings: function() {
			const obFeatureSettings = [
				{
					labelName: (this.language === 1) ? "Lane Width" : "车道宽度",
					featureName: "laneWidth",
					ifActiveOnInnerLane: true,
					enterHandler: this.updateLaneWidth,
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
					labelName: (this.language === 1) ? "Leftside Line Color" : "道左划线颜色",
					featureName: "laneLineColor",
					ifActiveOnInnerLane: false,
					enterHandler: this.updateLaneLineColor
				},
			];

			return obFeatureSettings;
		},

		updateLaneWidth: function(laneIndex, nextInputValue) {
			const nextLaneWidth = Number(nextInputValue);
			const featureName = "laneWidth";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "outbound", laneIndex,
				featureName, nextLaneWidth, ifReDraw, this.language
			);
		},

		updateLaneSpeedLimit: function(laneIndex, nextInputValue) {
			const nextLaneSpeedLimit = Number(nextInputValue);
			const featureName = "laneSpeedLimit";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "outbound", laneIndex,
				featureName, nextLaneSpeedLimit, ifReDraw, this.language
			);
		},

		updateLaneText: function(laneIndex, nextInputValue) {
			const nextLaneText = Number(nextInputValue);
			const featureName = "laneText";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "outbound", laneIndex,
				featureName, nextLaneText, ifReDraw, this.language
			);
		},

		updateLaneLength: function(laneIndex, nextInputValue) {
			const nextLaneLength = Number(nextInputValue);
			const featureName = "laneLength";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "outbound", laneIndex,
				featureName, nextLaneLength, ifReDraw, this.language
			);
		},

		updateLaneLineColor: function(laneIndex, nextInputValue) {
			const nextLaneLineColor = nextInputValue;
			const featureName = "laneLineColor";
			const ifReDraw = true;

			this.updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex, "outbound", laneIndex,
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