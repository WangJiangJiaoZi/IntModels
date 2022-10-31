<template>
	<div id="ob-lg-level-component">
		<BaseFormTitle
			v-bind = "baseFormTitleProps"
		/>
		<AppArrowForm
			v-if = "expanded"
			v-bind = "appArrowFormProps"
			v-bind:style = "{width: appFormWidth - 4 + 'px'}"
		/>
		<ObLgFormsContainer
			v-if = "expanded"
			v-bind = "ObLgFormsContainerProps"
		/>
	</div>
</template>

<script>
import BaseFormTitle from "../../../SharedBaseCells/BaseFormTitle.vue";
import AppArrowForm from "../../../GeometryForms/AppArrowForm.vue";
import ObLgFormsContainer from "../../../GeometryForms/ObLgFormsContainer/ObLgFormsContainer.vue";



export default {
	name: "ObLgLevelComponent",

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
		curArrowsTypes: Array,
		updateSideModeWidth: Function,
		updateCurApp: Function,
		updateAngles: Function,
		updateCurArrowTypes: Function,
		language: Number
	},
	components: {
		BaseFormTitle,
		AppArrowForm,
		ObLgFormsContainer
	},
	data: function() {
		return {
			expanded: false,
			curObLaneCount: this.getCurObLaneCount(this.curAppIndex),
		};
	},
	watch: {
		curAppIndex: function(newAppIndex, oldAppIndex) {
			this.updateCurObLaneCount(newAppIndex);
		},
	},
	computed: {
		baseFormTitleProps: function() {
			const baseFormTitleProps = {
				formTitle: (this.language === 1) ? "Outbound Lanes Settings" : "出口车道属性设置",
				expanded: this.expanded,
				toggleHandler: this.toggleHandler,
			};
			return baseFormTitleProps;
		},
		appArrowFormProps: function() {
			const appArrowFormProps = {
				labelWdith: this.labelWdith,
				appCellWidth: this.appCellWidth,
				appFormWidth: this.appFormWidth,
				curAppIndex: this.curAppIndex,
				angles: this.angles,
				updateCurApp: this.updateCurApp,
				language: this.language
			};
			return appArrowFormProps;
		},
		ObLgFormsContainerProps: function() {
			const curAppAngle = this.angles[this.curAppIndex];

			const ObLgFormsContainerProps = {
				/*				*/
				sideModeContainerInnerWidth: this.sideModeContainerInnerWidth,
				sideModeWidth: this.sideModeWidth,
				prototypeDummy: this.prototypeDummy,
				labelWdith: this.labelWdith,
				minCellWidth: this.minCellWidth,
				curAppIndex: this.curAppIndex,
				curAppAngle: curAppAngle,
				curObLaneCount: this.curObLaneCount,
				updateSideModeWidth: this.updateSideModeWidth,
				updateCurObLaneCount: this.updateCurObLaneCount,
				updateCurArrowTypes: this.updateCurArrowTypes,
				language: this.language

			};

			return ObLgFormsContainerProps;
		}
	},
	methods: {
		toggleHandler: function() {
			if (this.expanded) {
				//going to hide
				this.updateSideModeWidth(this.sideModeContainerInnerWidth);
			}
			else {
				//going to expand:
				if (this.appFormWidth > this.sideModeContainerInnerWidth) {
					this.updateSideModeWidth(this.appFormWidth);
				}
			}
			this.expanded = (this.expanded) ? false : true;
		},

		getCurObLaneCount: function(appIndex) {
			//get counts of the current approach's inbound lanes:
			const getLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getLaneGGLevelGeo;
			//would be 0 if current approach has no inbound laneGroup:
			const curObLaneCount = getLaneGGLevelGeo.getLaneGroupLaneCountsByAppIndexAndBound(
									appIndex, "outbound", this.language
								);

			return curObLaneCount;
		},

		updateCurObLaneCount: function(appIndex) {
			const nextCurObLaneCount = this.getCurObLaneCount(appIndex);
			this.curObLaneCount = nextCurObLaneCount;
		},

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