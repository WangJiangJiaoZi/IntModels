<template>
	<td  v-bind:style = "{width: labelWidth + 'px'}">
		<div v-bind:style = "{width: labelWidth + 'px'}">
			<label
				v-bind:for = "labelName + '-cell-id'"
			>
				{{labelName}}
			</label>
		</div>
	</td>
</template>

<script>

export default {
	name: "BaseRowHead",
	props: {
		labelName: String,
		labelWidth: Number,
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
	padding: 0px;
	height: 20px;
}
label {
    /*font-family: Georgia, "Times New Roman", Times, serif;*/
    font-size: 15px;
    color: #333;
    height: 20px;
    margin: 3px;
    text-align: left;
    float:left;
}
</style>