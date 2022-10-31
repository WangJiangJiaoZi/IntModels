<template>
	<td>
		<input
			v-bind:class = "ifDisabled ? 'inactive-input' : 'active-input'"
			v-bind:id = "labelName + '-cell-id'"
			v-bind:placeholder = "cellPlaceHolder"
			v-bind:type = "cellType"
			v-bind:value = "inputValue"
			v-on:keyup.13 = "enterHandler"
			v-bind:style = "{width: '100%'}"
			v-bind:disabled = "ifDisabled"
		/>
	</td>
</template>

<script>

export default {
	name: "BaseInputCell",
	props: {
		labelName: String,
		cellPlaceHolder: String,
		cellType: String,
		enterHandler: Function,
		baseCellWidth: Number,
		inputValue: String,
		ifDisabled: {
			type: Boolean,
			required: false,
			default: false
		}
	},
};
</script>

<style scoped>
td {
	padding-right: 5px;
}
input {
    height: 18;
    border: 1px solid #A7A7A7;
    border-radius: .1rem;
    margin-left: 0px;
    margin-top: 3px;
    margin-right: 0px;
    margin-bottom: 3px;
    font-size: 15px;

}
.active-input {
    color: #333;
}
.inactive-input {
	color: #B9B9B9;
}



</style>