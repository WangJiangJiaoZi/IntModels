<template>
	<div id="corner-level-component">
		<BaseFormTitle
			v-bind = "baseFormTitleProps"
		/>
		<AppArrowForm
			v-if = "expanded"
			v-bind = "appArrowFormProps"
			v-bind:style = "{width: appFormWidth - 4 + 'px'}"
		/>
		<CornerLevelForm
			v-if = "expanded"
			v-bind = "cornerLevelFormProps"
			v-bind:style = "{width: appFormWidth - 4 + 'px'}"
		/>
	</div>
</template>

<script>
import BaseFormTitle from "../../SharedBaseCells/BaseFormTitle.vue";
import AppArrowForm from "../../GeometryForms/AppArrowForm.vue";
import CornerLevelForm from "../../GeometryForms/CornerLevelForm.vue";


export default {
	name: "CornerLevelComponent",
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
		language: Number
	},
	components: {
		BaseFormTitle,
		AppArrowForm,
		CornerLevelForm
	},
	data: function() {
		return {
			expanded: false,
		};
	},
	computed: {
		baseFormTitleProps: function() {
			const baseFormTitleProps = {
				formTitle: (this.language === 1) ? "Corner Level Settings" : "转角属性设置",
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
		cornerLevelFormProps: function() {
			const cornerLevelFormProps = {
				labelWdith: this.labelWdith,
				appCellWidth: this.appCellWidth,
				appFormWidth: this.appFormWidth,
				curAppIndex: this.curAppIndex,
				language: this.language
			};
			return cornerLevelFormProps;
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
	}
};
</script>

<style>
/*
#app-level-component {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
*/
</style>