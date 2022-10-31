<template>
	<BaseInputCell
		id="ob-lg-feature-cell"
		v-bind = "oneLaneFeatureCellProp"
	/>
</template>

<script>
import BaseInputCell from "../../../SharedBaseCells/BaseInputCell.vue";

export default {
	name: "ObLgFeatureCell",

	props: {
		curAppIndex: Number,
		laneIndex: Number,
		featureName: String,
		enterHandler: Function,
		cellWidth: Number,
		ifActiveOnInnerLane: Boolean,
		language: Number
	},
	components: {
		BaseInputCell
	},

	computed: {
		oneLaneFeatureCellProp: function() {
			const oneLaneFeatureCellProp = {
				labelName: this.featureName,
				cellPlaceHolder: this.featureName,
				cellType: "Text",
				enterHandler: this.oneLaneFeatureCellEnterHandler,
				cellWidth: this.baseCellWidth,
				inputValue: (this.laneIndex === 0 && !this.ifActiveOnInnerLane) ? "-" : JSON.stringify(this.getOneLaneFeature()),
				ifDisabled: (this.laneIndex === 0 && !this.ifActiveOnInnerLane) ? true : false
			};

			return oneLaneFeatureCellProp;
		}
	},
	methods: {
		getOneLaneFeature: function() {
			const getLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getLaneGGLevelGeo;

			const featureValue = getLaneGGLevelGeo.getLaneFeature(
				this.curAppIndex, "outbound", this.laneIndex, this.featureName, this.language
			);

			return featureValue;
		},
		oneLaneFeatureCellEnterHandler: function(enterEvent) {
			this.enterHandler(this.laneIndex, enterEvent.target.value);
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