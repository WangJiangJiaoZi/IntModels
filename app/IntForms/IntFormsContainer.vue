<template>
	<div id="int-forms-container"
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
	name: "IntFormsContainer",

	props: {
		mode: Number,
		sideModeContainerWidth: Number,
		fullModeContainerWidth: Number,
		height: Number,
		prototypeDummy: Number,
		language: Number
	},
	components: {
		SideModeComponent: SideModeComponent,
		FullModeComponent: FullModeComponent
	},
	data: function() {
		return {
			labelWdith: 190,  //pixel
			minCellWidth: 60,  //minimum cell width in pixel
		};
	},
	computed: {
		sideModeProps: function() {
			const sideModeProps = {
				sideModeContainerWidth: this.sideModeContainerWidth,
				prototypeDummy: this.prototypeDummy,
				labelWdith: this.labelWdith,
				minCellWidth: this.minCellWidth,
				language: this.language
			};
			return sideModeProps;
		},
		fullModeProps: function() {
			const fullModeProps = {
				fullModeContainerWidth: this.fullModeContainerWidth,
				prototypeDummy: this.prototypeDummy,
				labelWdith: this.labelWdith,
				language: this.language
			};
			return fullModeProps;
		}
	},

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