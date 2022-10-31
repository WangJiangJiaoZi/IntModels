<template>
	<tr id="side-lg-feature-cell"
	>
		<BaseRowHead
			v-bind:labelName = "sideLaneSettings.labelName"
			v-bind:labelWidth = "labelWidth"
		/>
		<BaseInputCell
			v-bind:labelName = "sideLaneSettings.labelName"
			v-bind:cellPlaceHolder = "sideLaneSettings.cellPlaceHolder"
			v-bind:cellType = "sideLaneSettings.cellType"
			v-bind:enterHandler = "sideLaneSettings.enterHandler"
			v-bind:inputValue = "sideLaneSettings.inputValue"
			v-bind:baseCellWidth = "appCellWidth"
		/>
	</tr>
</template>

<script>
import BaseRowHead from "../../SharedBaseCells/BaseRowHead.vue";
import BaseInputCell from "../../SharedBaseCells/BaseInputCell.vue";

export default {
	name: "SideLgFeatureCell",

	props: {
		bound: String,
		curAppIndex: Number,
		labelWidth: Number,
		appCellWidth: Number,
		language: Number
	},
	components: {
		BaseRowHead,
		BaseInputCell
	},
	computed: {
		sideLaneSettings: function() {
			const sideLaneSettings = {
				labelName: (this.language === 1) ? "Side Lane Width" : "辅路宽度",
				cellPlaceHolder: "Number",
				cellType: "text",
				enterHandler: this.updateSideLaneWidth,
				inputValue: JSON.stringify(this.getSideLaneWidth(this.curAppIndex)),
			};
			return sideLaneSettings;
		}
	},
	methods: {
		getSideLaneWidth(appIndex) {
			//get counts of the current approach's outboundSide lanes:
			const getLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getLaneGGLevelGeo;
			const featureName = "laneWidth";
			const laneIndex = 0;  //only one side lane allowed at most

			const sideLaneWidth = getLaneGGLevelGeo.getLaneFeature(
									appIndex, this.bound, laneIndex, featureName, this.language
								);

			return sideLaneWidth;
		},
		updateSideLaneWidth(enterEvent) {
			const nextSideLaneWidth = Number(enterEvent.target.value);
			const updateLaneFeature = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo.updateLaneFeature;

			const laneIndex = 0;  //only one side lane allowed at most
			const featureName = "laneWidth";
			const ifReDraw = true;
			updateLaneFeature(
				this.curAppIndex,
				this.bound,
				laneIndex,
				featureName,
				nextSideLaneWidth,
				ifReDraw,
				this.language
			);
		}
	}


};
</script>

<style>
/*
#side-mode-component {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
*/
</style>