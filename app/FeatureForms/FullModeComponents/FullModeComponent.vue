<template>
	<div id="full-mode-component">
		I am feature's full mode component. My width is {{fullModeContainerWidth}}
	</div>
</template>

<script>
//import HelloWorld from "./HelloWorld.vue";

export default {
	name: "FullModeComponent",
	props: {
		fullModeContainerWidth: Number,
		prototypeDummy: Number,
		labelWidth: Number,
		titleStrings: Object
	},
	/*
	components: {
		HelloWorld
	},
	*/
	data: function() {
		return {
			Jin: "Jin"
		};
	},
};
</script>

<style>
/*
#full-mode-component {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
*/
</style>