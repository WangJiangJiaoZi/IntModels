<template>
	<div id="div-group-forms-container">
		<IbDivForm
			v-bind = "divFormProps"
		/>
		<ObDivForm
			v-bind = "divFormProps"
		/>
		<CenterDivForm
			v-bind = "divFormProps"
		/>
	</div>
</template>

<script>

import IbDivForm from "./IbDivForm.vue";
import ObDivForm from "./ObDivForm.vue";
import CenterDivForm from "./CenterDivForm.vue";

export default {
	name: "DivGroupFormsContainer",
	props: {
		labelWdith: Number,
		appCellWidth: Number,
		appFormWidth: Number,
		curAppIndex: Number,
		language: Number
	},
	components: {
		IbDivForm,
		ObDivForm,
		CenterDivForm
	},
	computed: {
		divFormProps: function() {
			const divFormProps = {
				labelWdith: this.labelWdith,
				appCellWidth: this.appCellWidth,
				appFormWidth: this.appFormWidth,
				curAppIndex: this.curAppIndex,
				language: this.language,
				getDivByBound: this.getDivByBound,
				getDivFeaturesByBound: this.getDivFeaturesByBound
			};
			return divFormProps;
		},
	},
	mounted: function() {
		const updateDivGroupLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateDivGroupLevelGeo;
		this.updateDivGroupLevelGeo = updateDivGroupLevelGeo;
	},

	methods: {
		getDivByBound: function(divBound) {
			//1 for "inbound" / 2 for "outbound" / 3 for "center":
			const getDivGroupLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getDivGroupLevelGeo;
			const div = getDivGroupLevelGeo.getDivByAppIndexAndDivBound(
							this.curAppIndex, divBound, this.language
						);

			return div;
		},
		getDivFeaturesByBound: function(divBound) {
			//declare features and their initial values:
			let divColor, divOffset, divWidth, divCapRadius, storageLen, sotrageWidth, storageSlipLen;
			divColor = divOffset = divWidth = divCapRadius = storageLen = sotrageWidth = storageSlipLen = (this.language === 1) ? "TBD" : "待定义";

			//try to find the div by bound and update features if succeed:
			const getDividerLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getDivGroupLevelGeo.getDividerLevelGeo;
			const theDiv = this.getDivByBound(divBound);
			let features;
			if (theDiv) {
				features = getDividerLevelGeo.getDivFeatures(theDiv, this.language);
			}
			else {
				//return features object:
				features = {
					divColor: divColor,
					divOffset: divOffset,
					divWidth: divWidth,
					divCapRadius: divCapRadius,
					storageLen: storageLen,
					sotrageWidth: sotrageWidth,
					storageSlipLen: storageSlipLen
				}
			}

			return features;

		},


	}


};
</script>

<style scoped>

</style>