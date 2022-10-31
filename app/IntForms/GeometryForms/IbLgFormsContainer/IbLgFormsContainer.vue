<template>
	<div id="ib-lg-forms-container"
		v-bind:style = "{width: formWidth - 4 + 'px'}"
	>
		<table
			width="98%"
		>
			<tbody>
				<IbLgMovForm
					v-bind = "ibLgMovFormProps"
				/>
				<IbLgFeaturesForm
					v-bind = "ibLgFeaturesFormProps"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import IbLgMovForm from "./IbLgMovForm/IbLgMovForm.vue";
import IbLgFeaturesForm from "./IbLgFeaturesForm/IbLgFeaturesForm.vue";

export default {
	name: "IbLgFormsContainer",

	props: {
		sideModeContainerInnerWidth: Number,
		sideModeWidth: Number,
		prototypeDummy: Number,
		labelWdith: Number,
		minCellWidth: Number,
		curAppIndex: Number,
		curAppAngle: Number,
		curIbLaneCount: Number,
		curArrowsTypes: Array,
		updateSideModeWidth: Function,
		updateCurIbLaneCount: Function,
		updateCurArrowTypes: Function,
		language: Number
	},
	components: {
		IbLgMovForm,
		IbLgFeaturesForm,
	},

	computed: {
		formWidth: function() {
			let formWidth = this.calculateFormWidth();
			return formWidth;
		},
		ibLgMovFormProps: function() {
			const cellWidth = this.calculateCellWidth();
			const formWidth = this.calculateFormWidth();

			let ibLgMovFormProps = {
				labelWdith: this.labelWdith,
				formWidth: formWidth,
				cellWidth: cellWidth,
				curAppIndex: this.curAppIndex,
				curAppAngle: this.curAppAngle,
				curArrowsTypes: this.curArrowsTypes,
				updateCurIbLaneCount: this.updateCurIbLaneCount,
				updateCurArrowTypes: this.updateCurArrowTypes,
				language: this.language
			};

			return ibLgMovFormProps;
		},
		ibLgFeaturesFormProps: function() {
			const cellWidth = this.calculateCellWidth();
			const formWidth = this.calculateFormWidth();
			const laneCounts = this.curArrowsTypes.length;

			const ibLgFeaturesFormProps = {
				labelWdith: this.labelWdith,
				formWidth: formWidth,
				cellWidth: cellWidth,
				curAppIndex: this.curAppIndex,
				laneCounts: laneCounts,
				language: this.language
			};

			return ibLgFeaturesFormProps;
		}
	},
	methods: {
		calculateCellWidth: function() {
			//varies as curAppIndex and curIbLaneCount change:
			let cellWidth;

			cellWidth = (((this.sideModeContainerInnerWidth - this.labelWdith) / (this.curIbLaneCount + 1)) < this.minCellWidth) ? this.minCellWidth : ((this.sideModeContainerInnerWidth - this.labelWdith - 12) / (this.curIbLaneCount + 1));

			return cellWidth;
		},
		calculateFormWidth: function() {
			//also varies as curAppIndex and curIbLaneCount change:
			let formWidth = (((this.sideModeContainerInnerWidth - this.labelWdith) / (this.curIbLaneCount + 1)) < this.minCellWidth) ? (this.minCellWidth * (this.curIbLaneCount + 1) + this.labelWdith) : this.sideModeContainerInnerWidth;
			return formWidth;
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