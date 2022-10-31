<template>
	<div id="app-components-container">
		<AppLevelComponent v-bind = "appComponentProps" />
		<CornerLevelComponent v-bind = "appComponentProps" />
		<DividerGroupLevelComponent v-bind = "appComponentProps" />
		<CrosswalkLevelComponent v-bind = "appComponentProps" />
		<LgComponentsContainer v-bind = "appComponentProps" />
	</div>
</template>

<script>

import AppLevelComponent from "./AppLevelComponent.vue";
import CornerLevelComponent from "./CornerLevelComponent.vue";
import DividerGroupLevelComponent from "./DividerGroupLevelComponent.vue";
import CrosswalkLevelComponent from "./CrosswalkLevelComponent.vue";

import LgComponentsContainer from "./LgComponentsContainer/LgComponentsContainer.vue";

export default {
	name: "AppComponentsContainer",

	props: {
		sideModeContainerInnerWidth: Number,
		sideModeWidth: Number,
		prototypeDummy: Number,
		labelWdith: Number,
		minCellWidth: Number,
		updateSideModeWidth: Function,
		language: Number
	},
	components: {
		AppLevelComponent,
		CornerLevelComponent,
		DividerGroupLevelComponent,
		CrosswalkLevelComponent,
		LgComponentsContainer
	},
	data: function() {
		return {
			curAppIndex: 0,  //initial approach index
			angles: this.getAngles()
		};
	},
	watch: {
		//whenever prototypeDummy changed, set curAppIndex to 0 and re-get angles
		prototypeDummy: function() {
			this.curAppIndex = 0;
			this.angles = this.getAngles();
		}
	},
	computed: {
		appComponentProps: function() {
			const appLevelComponentProps = {
				sideModeContainerInnerWidth: this.sideModeContainerInnerWidth,
				sideModeWidth: this.sideModeWidth,
				prototypeDummy: this.prototypeDummy,
				labelWdith: this.labelWdith,
				minCellWidth: this.minCellWidth,
				appCellWidth: this.appCellWidth,
				appFormWidth: this.appFormWidth,
				curAppIndex: this.curAppIndex,
				angles: this.angles,
				updateSideModeWidth: this.updateSideModeWidth,
				updateCurApp: this.updateCurApp,
				updateAngles: this.updateAngles,
				language: this.language
			};
			return appLevelComponentProps;
		},
		appCellWidth: function() {
			//computed based on mode and modeWidth (in case that the window changed):
			const approaches = this.$intModel.intersection.approaches;
			const appCount = approaches.length;  //number of approaches
			let appCellWidth;

			appCellWidth = ((this.sideModeContainerInnerWidth / appCount) < this.minCellWidth) ? this.minCellWidth : (this.sideModeContainerInnerWidth / appCount);

			return appCellWidth;
		},
		appFormWidth: function() {
			const approaches = this.$intModel.intersection.approaches;
			const appCount = approaches.length;  //number of approaches
			let appFormWidth = ((this.sideModeContainerInnerWidth / appCount) < this.minCellWidth) ? (this.minCellWidth * appCount) : this.sideModeContainerInnerWidth;
			return appFormWidth;
		},
	},
	methods: {
		updateCurApp: function(nextAppIndex) {
			if (nextAppIndex !== this.curAppIndex) {
				this.curAppIndex = nextAppIndex;
			}
		},
		getAngles: function() {
			const getAppLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getAppLevelGeo;
			const angles = getAppLevelGeo.getAllAppAngles(this.language);

			return angles;
		},
		updateAngles: function(nextAngle) {
			this.angles = this.getAngles();
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