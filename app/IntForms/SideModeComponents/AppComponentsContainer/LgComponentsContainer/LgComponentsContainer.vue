<template>
	<div id="lg-components-container">
		<IbLgLevelComponent
			v-bind = "lgLevelComponentProps"
		/>
		<ObLgLevelComponent
			v-bind = "lgLevelComponentProps"
		/>
		<SideLgLevelComponent
			v-bind = "lgLevelComponentProps"
		/>
	</div>
</template>

<script>
import IbLgLevelComponent from "./IbLgLevelComponent.vue";
import ObLgLevelComponent from "./ObLgLevelComponent.vue";
import SideLgLevelComponent from "./SideLgLevelComponent.vue";


export default {
	name: "LgComponentsContainer",

	props: {
		sideModeContainerInnerWidth: Number,
		sideModeWidth: Number,
		prototypeDummy: Number,
		labelWdith: Number,
		minCellWidth: Number,
		appCellWidth: Number,
		appFormWidth: Number,
		curAppIndex: Number,
		angles: Array,
		updateSideModeWidth: Function,
		updateCurApp: Function,
		updateAngles: Function,
		language: Number
	},
	components: {
		IbLgLevelComponent,
		ObLgLevelComponent,
		SideLgLevelComponent
	},
	data: function() {
		return {
			curArrowsTypes: this.getCurArrowsTypes(this.curAppIndex)
		};
	},
	watch: {
		curAppIndex: function(newAppIndex, oldAppIndex) {
			this.updateCurArrowTypes(newAppIndex);
		},
	},
	computed: {
		lgLevelComponentProps: function() {
			const lgLevelComponentProps = {
				sideModeContainerInnerWidth: this.sideModeContainerInnerWidth,
				sideModeWidth: this.sideModeWidth,
				prototypeDummy: this.prototypeDummy,
				labelWdith: this.labelWdith,
				minCellWidth: this.minCellWidth,
				appCellWidth: this.appCellWidth,
				appFormWidth: this.appFormWidth,
				curAppIndex: this.curAppIndex,
				angles: this.angles,
				curArrowsTypes: this.curArrowsTypes,
				updateSideModeWidth: this.updateSideModeWidth,
				updateCurApp: this.updateCurApp,
				updateAngles: this.updateAngles,
				updateCurArrowTypes: this.updateCurArrowTypes,
				language: this.language
			};
			return lgLevelComponentProps;
		},
	},
	methods: {

		getCurArrowsTypes: function(appIndex) {
			const curLanesSettings = [];

			const getLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getLaneGGLevelGeo;
			const bound = "inbound"; //no need to get inboundSide for now

			//would be [] if current approach has no inbound laneGroup:
			const curArrowTypes = getLaneGGLevelGeo.getLaneGGInboundArrowTypes(
									this.curAppIndex, bound, this.language
								);

			return curArrowTypes;
		},

		updateCurArrowTypes: function(appIndex) {
			const nextArrowTypes = this.getCurArrowsTypes(appIndex);
			this.curArrowsTypes = nextArrowTypes;
		}

	}


};
</script>

<style>
</style>