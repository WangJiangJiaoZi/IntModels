<template>
	<div id="div-group-level-component">
		<BaseFormTitle
			v-bind = "baseFormTitleProps"
		/>
		<AppArrowForm
			v-if = "expanded"
			v-bind = "appArrowFormProps"
			v-bind:style = "{width: appFormWidth - 4 + 'px'}"
		/>
		<DivGroupFormsContainer
			v-if = "expanded"
			v-bind = "divGroupLevelFormProps"
			v-bind:style = "{width: appFormWidth - 4 + 'px'}"
		/>
	</div>
</template>

<script>
import BaseFormTitle from "../../SharedBaseCells/BaseFormTitle.vue";
import AppArrowForm from "../../GeometryForms/AppArrowForm.vue";
import DivGroupFormsContainer from "../../GeometryForms/DivGroupFormsContainer/DivGroupFormsContainer.vue";


export default {
	name: "DividerGroupLevelComponent",
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
		DivGroupFormsContainer
	},
	data: function() {
		return {
			expanded: false,
		};
	},
	computed: {
		baseFormTitleProps: function() {
			const formTitle = (this.language === 1) ? "Dividers Level Settings" : "隔离带设置";
			const baseFormTitleProps = {
				formTitle: formTitle,
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
		divGroupLevelFormProps: function() {
			const divGroupLevelFormProps = {
				labelWdith: this.labelWdith,
				appCellWidth: this.appCellWidth,
				appFormWidth: this.appFormWidth,
				curAppIndex: this.curAppIndex,
				language: this.language
			};
			return divGroupLevelFormProps;
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