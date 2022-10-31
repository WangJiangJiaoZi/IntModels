<template>
	<div id="ib-lg-level-component">
		<BaseFormTitle
			v-bind = "baseFormTitleProps"
		/>
		<AppArrowForm
			v-if = "expanded"
			v-bind = "appArrowFormProps"
			v-bind:style = "{width: appFormWidth - 4 + 'px'}"
		/>
		<IbLgFormsContainer
			v-if = "expanded"
			v-bind = "IbLgFormsContainerProps"
		/>
	</div>
</template>

<script>
import BaseFormTitle from "../../../SharedBaseCells/BaseFormTitle.vue";
import AppArrowForm from "../../../GeometryForms/AppArrowForm.vue";
import IbLgFormsContainer from "../../../GeometryForms/IbLgFormsContainer/IbLgFormsContainer.vue";



export default {
	name: "IbLgLevelComponent",

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
		IbLgFormsContainer
	},
	data: function() {
		return {
			expanded: false,
			curIbLaneCount: this.getCurIbLaneCount(this.curAppIndex),
		};
	},
	watch: {
		curAppIndex: function(newAppIndex, oldAppIndex) {
			this.updateCurIbLaneCount(newAppIndex);
		},
	},
	computed: {
		baseFormTitleProps: function() {
			const baseFormTitleProps = {
				formTitle: (this.language === 1) ? "Inbound Lanes Settings" : "进口车道属性设置",
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
		IbLgFormsContainerProps: function() {
			const curAppAngle = this.angles[this.curAppIndex];

			const IbLgFormsContainerProps = {
				/*				*/
				sideModeContainerInnerWidth: this.sideModeContainerInnerWidth,
				sideModeWidth: this.sideModeWidth,
				prototypeDummy: this.prototypeDummy,
				labelWdith: this.labelWdith,
				minCellWidth: this.minCellWidth,
				curAppIndex: this.curAppIndex,
				curAppAngle: curAppAngle,
				curIbLaneCount: this.curIbLaneCount,
				curArrowsTypes: this.curArrowsTypes,
				updateSideModeWidth: this.updateSideModeWidth,
				updateCurIbLaneCount: this.updateCurIbLaneCount,
				updateCurArrowTypes: this.updateCurArrowTypes,
				language: this.language

			};

			return IbLgFormsContainerProps;
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

		getCurIbLaneCount: function(appIndex) {
			//get counts of the current approach's inbound lanes:
			const getLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getLaneGGLevelGeo;
			//would be 0 if current approach has no inbound laneGroup:
			const curIbLaneCount = getLaneGGLevelGeo.getLaneGroupLaneCountsByAppIndexAndBound(
									appIndex, "inbound", this.language
								);

			return curIbLaneCount;
		},

		updateCurIbLaneCount: function(appIndex) {
			const nextCurIbLaneCount = this.getCurIbLaneCount(appIndex);
			this.curIbLaneCount = nextCurIbLaneCount;
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