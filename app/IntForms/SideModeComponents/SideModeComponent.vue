<template>
	<div id="side-mode-component"
		v-bind:style = "{width: sideModeWidth, overflow: 'auto'}"
	>
		<IntLevelComponent v-bind = "intLevelComponentProps"/>
		<AppComponentsContainer v-bind = "appComponentsContainerProps" />
	</div>
</template>

<script>

import IntLevelComponent from "./IntLevelComponent.vue";
import AppComponentsContainer from "./AppComponentsContainer/AppComponentsContainer.vue";


export default {
	name: "SideModeComponent",

	props: {
		sideModeContainerWidth: Number,
		prototypeDummy: Number,
		labelWdith: Number,
		minCellWidth: Number,
		language: Number
	},
	components: {
		IntLevelComponent,
		AppComponentsContainer
	},
	data: function() {
		const sideModeWidth = this.sideModeContainerWidth - 30;  //initial side mode width equals to conatiner width
		return {
			sideModeContainerInnerWidth: sideModeWidth,
			sideModeWidth: sideModeWidth,
		};
	},
	computed: {
		intLevelComponentProps: function() {
			const intLevelFormProps = {
				sideModeWidth: this.sideModeWidth,
				mode: 1,   //side mode is 1
				prototypeDummy: this.prototypeDummy,
				labelWdith: this.labelWdith,
				language: this.language
			};
			return intLevelFormProps;
		},
		appComponentsContainerProps: function() {
			const appLevelComponentProps = {
				sideModeContainerInnerWidth: this.sideModeContainerInnerWidth,
				sideModeWidth: this.sideModeWidth,
				prototypeDummy: this.prototypeDummy,
				labelWdith: this.labelWdith,
				minCellWidth: this.minCellWidth,
				updateSideModeWidth: this.updateSideModeWidth,
				language: this.language
			};
			return appLevelComponentProps;
		},
	},
	methods: {
		updateSideModeWidth: function(nextWidth) {
			this.sideModeWidth = nextWidth;
		},

	}


};
</script>

<style scoped="">
/**/
#side-mode-component {
	height: 100%;
}

</style>