<template>
	<div id="ib-lg-forms-container"
		v-bind:style = "{width: formWidth - 4 + 'px'}"
	>
		<table
			width="98%"
		>
			<tbody>
				<ObLgAddRemoveForm
					v-bind = "obLgAddRemoveFormProps"
				/>
				<ObLgFeaturesForm
					v-bind = "obLgFeaturesFormProps"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import ObLgAddRemoveForm from "./ObLgAddRemoveForm/ObLgAddRemoveForm.vue";
import ObLgFeaturesForm from "./ObLgFeaturesForm/ObLgFeaturesForm.vue";

export default {
	name: "ObLgFormsContainer",

	props: {
		sideModeContainerInnerWidth: Number,
		sideModeWidth: Number,
		prototypeDummy: Number,
		labelWdith: Number,
		minCellWidth: Number,
		curAppIndex: Number,
		curAppAngle: Number,
		curObLaneCount: Number,
		updateSideModeWidth: Function,
		updateCurObLaneCount: Function,
		updateCurArrowTypes: Function,
		language: Number
	},
	components: {
		ObLgAddRemoveForm,
		ObLgFeaturesForm,
	},

	computed: {
		formWidth: function() {
			let formWidth = this.calculateFormWidth();
			return formWidth;
		},
		obLgAddRemoveFormProps: function() {
			const cellWidth = this.calculateCellWidth();
			const formWidth = this.calculateFormWidth();

			let obLgAddRemoveFormProps = {
				labelWdith: this.labelWdith,
				formWidth: formWidth,
				cellWidth: cellWidth,
				curAppIndex: this.curAppIndex,
				curObLaneCount: this.curObLaneCount,
				updateCurObLaneCount: this.updateCurObLaneCount,
				updateCurArrowTypes: this.updateCurArrowTypes,
				language: this.language
			};

			return obLgAddRemoveFormProps;
		},
		obLgFeaturesFormProps: function() {
			const cellWidth = this.calculateCellWidth();
			const formWidth = this.calculateFormWidth();

			const obLgFeaturesFormProps = {
				labelWdith: this.labelWdith,
				formWidth: formWidth,
				cellWidth: cellWidth,
				curAppIndex: this.curAppIndex,
				laneCounts: this.curObLaneCount,
				language: this.language
			};

			return obLgFeaturesFormProps;
		}
	},
	methods: {
		calculateCellWidth: function() {
			//varies as curAppIndex and curIbLaneCount change:
			let cellWidth;

			cellWidth = (((this.sideModeContainerInnerWidth - this.labelWdith) / (this.curObLaneCount + 1)) < this.minCellWidth) ? this.minCellWidth : ((this.sideModeContainerInnerWidth - this.labelWdith - 12) / (this.curObLaneCount + 1));

			return cellWidth;
		},
		calculateFormWidth: function() {
			//also varies as curAppIndex and curIbLaneCount change:
			let formWidth = (((this.sideModeContainerInnerWidth - this.labelWdith) / (this.curObLaneCount + 1)) < this.minCellWidth) ? (this.minCellWidth * (this.curObLaneCount + 1) + this.labelWdith) : this.sideModeContainerInnerWidth;
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