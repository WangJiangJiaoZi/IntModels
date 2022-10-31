
<template>
	<td>
		<VueSelect
			id = "v-select"
			v-bind:options = "options"
			v-bind:onChange = "handleChange"
			v-bind:searchable = "false"
			v-bind:clearSearchOnSelect = "false"
			v-bind:value = "options[curSelectedIndex].label"
			v-bind:disabled = "ifDisabled"
			label = "label"
			v-bind:style = "{width: '100%', color: 'red'}"
		>
		</VueSelect>
	</td>
</template>

<script>

import VueSelect from "vue-select";


export default {
	name: "BaseDropdownLongOptionsCell",
	props: {
		labelName: String,
		curSelectedIndex: Number,
		options: Array,
		selectHandler: Function,
		ifDisabled: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	components: {
		VueSelect: VueSelect
	},
	computed: {
		textColor: function() {
			const textColor = this.ifDisabled ? "#C73737" : "#333333";
			return textColor;
		}
	},
	methods: {
		handleChange: function(selectEvent) {
			if (selectEvent instanceof Object) {
				const nextValue = selectEvent.value;
				this.selectHandler(nextValue);
			}
		}
	}

};



</script>

<style scoped>
td {
	padding: 0px;
}


</style> 

<style>

.v-select {
	height: 20px;
    border: 1px solid #ffffff;
    border-color: rgba(111,111,111,0.2) transparent transparent;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 3px;
    margin-bottom: 3px;
    font-size: 15px;
    padding-top: 0px;
    padding-bottom: 0px;
    color: #333333;
    line-height: 18px;
    vertical-align: middle;
}

.v-select .dropdown-toggle{
	height: 20px;
	vertical-align: middle;
	border: 1px solid #A7A7A7;
	border-radius: 0.0rem;
}

.v-select input{
	height: 20px;
	width: 100%;
}

.v-select .selected-tag {
	margin: 0px;
	border: 0px;
	padding-left: 12px;
	position: absolute;
	top: -2px;
	font-size: 15px;
}

.v-select .clear {
	display: none;
}

.v-select .open-indicator {
	height: 10px;
}

.v-select .dropdown-toggle .clearfix {
	height: 8px;
}

.v-select.dropdown.open .dropdown-toggle .clearfix{
	height: 8px;
    border-color: #4CC3D9;
    
}


input:disabled {
	color: #DC2F2F;
}
</style>