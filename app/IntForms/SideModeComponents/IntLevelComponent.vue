<template>
	<div id="int-level-component"
		v-bind:style = "{width: sideModeWidth - 4 + 'px'}"
	>
		<BaseFormTitle
			v-bind = "propsForFormTitle"
		/>
		<IntLevelForm
			v-if = "expanded"
			v-bind = "propsForIntLevelForm"
		/>
	</div>
</template>

<script>
import BaseFormTitle from "../SharedBaseCells/BaseFormTitle.vue";
import IntLevelForm from "../GeometryForms/IntLevelForm.vue";

export default {
	name: "IntLevelComponent",
	props: {
		sideModeWidth: Number,
		mode: Number,
		prototypeDummy: Number,
		labelWdith: Number,
		language: Number
	},
	components: {
		BaseFormTitle: BaseFormTitle,
		IntLevelForm: IntLevelForm
	},
	data: function() {
		return {
			expanded: false
		};
	},
	watch: {
		//whenever prototypeDummy changed, close the pannel
		prototypeDummy: function() {
			this.expanded = false;
		}
	},
	computed: {
		propsForFormTitle: function() {
			return {
				formTitle: (this.language === 1) ? "Intersection Level Settings" : "路口属性设置",
				expanded: this.expanded,
				toggleHandler: this.toggleHandler,
			}
		},
		propsForIntLevelForm: function() {
			return {
				sideModeWidth: this.sideModeWidth,
				mode: this.mode,
				labelWdith: this.labelWdith,
				language: this.language
			}
		}
	},
	methods: {
		toggleHandler: function() {
			this.expanded = (this.expanded) ? false : true;
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