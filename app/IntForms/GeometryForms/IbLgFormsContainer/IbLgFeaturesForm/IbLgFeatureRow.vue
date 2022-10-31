<template>
	<div id="ib-lg-feature-row">
		<BaseRowHead
			v-bind:labelName = "labelName"
			v-bind:labelWidth = "labelWdith"
		/>
		<td width="100%">
			<table width="100%">
				<tbody width="100%">
					<tr width="100%">
						<IbLgFeatureCell
							v-for = "(oneFeatureCellProp, laneIndex) in featureCellPropsArray"
							:key = "'ib-lg-feature-' + featureName + '-cell-' + laneIndex"
							v-bind = "oneFeatureCellProp"
						/>
					</tr>
				</tbody>
			</table>
		</td>
	</div>
</template>

<script>
import BaseRowHead from "../../../SharedBaseCells/BaseRowHead.vue";
import IbLgFeatureCell from "./IbLgFeatureCell.vue";

import icons from "../../../PredefinedShapes/Icons";


export default {
	name: "IbLgFeatureRow",

	props: {
		labelName: String,
		featureName: String,
		ifActiveOnInnerLane: Boolean,
		enterHandler: Function,
		labelWdith: Number,
		formWidth: Number,
		cellWidth: Number,
		curAppIndex: Number,
		laneCounts: Number,
		language: Number
	},
	components: {
		BaseRowHead,
		IbLgFeatureCell
	},
	computed: {
		featureCellPropsArray: function() {
			const featureCellPropsArray = [];
			for (let i = 0; i < this.laneCounts; i++) {
				featureCellPropsArray.push({
					curAppIndex: this.curAppIndex,
					laneIndex: i,
					featureName: this.featureName,
					enterHandler: this.enterHandler,
					cellWidth: this.cellWidth,
					ifActiveOnInnerLane: this.ifActiveOnInnerLane,
					language: this.language
				});
			}

			return featureCellPropsArray;
		}
	},
	methods: {

	}


};
</script>

<style scoped>



</style>