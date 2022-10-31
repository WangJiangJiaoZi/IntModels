<template>
	<div id="feature-forms-container"
		v-bind:style = "{width: '100%', height: height + 'px'}"
	>
		<SideModeComponent v-if = "mode===1" v-bind = "sideModeProps" />
		<FullModeComponent v-else v-bind = "fullModeProps" />			
	</div>
</template>

<script>
import SideModeComponent from "./SideModeComponents/SideModeComponent.vue";
import FullModeComponent from "./FullModeComponents/FullModeComponent.vue";

export default {
	name: "FeatureFormsContainer",

	props: {
		mode: Number,
		sideModeContainerWidth: Number,
		fullModeContainerWidth: Number,
		height: Number,
		prototypeDummy: Number,
		titleStrings: Object
	},
	components: {
		SideModeComponent: SideModeComponent,
		FullModeComponent: FullModeComponent
	},
	data: function() {
		return {
			labelWidth: 80,  //pixel
			minCellWidth: 60,  //minimum cell width in pixel
			levelCounts: 5,  //4 levels: int, mov, bnd, path, lane
		};
	},
	computed: {
		sideModeProps: function() {
			const sideModeProps = {
				sideModeContainerWidth: this.sideModeContainerWidth,
				sideModeContainerHeight: this.height,
				prototypeDummy: this.prototypeDummy,
				labelWidth: this.labelWidth,
				minCellWidth: this.minCellWidth,
				levelCounts: this.levelCounts,
				titleStrings: this.titleStrings
			};
			return sideModeProps;
		},
		fullModeProps: function() {
			const fullModeProps = {
				fullModeContainerWidth: this.fullModeContainerWidth,
				prototypeDummy: this.prototypeDummy,
				labelWidth: this.labelWidth,
				titleStrings: this.titleStrings
			};
			return fullModeProps;
		}
	},
	methods: {

	}

};
</script>

<style scoped>
/*
#int-forms-container {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
*/
</style>