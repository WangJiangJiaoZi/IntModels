<template>
	<div id="shared-info-box"
		class="overlay"
	>
	</div>
</template>

<script>


export default {
	name: "SharedInfoBox",

	props: {
		infoBoxContainerId: String,
		info: String,
		prototypeDummy: Number,
		language: Number
	},
	components: {
	},
	data: function() {
		return {
			width: 100,  //pixel
			height: 50,  //pixel
		};
	},
	computed: {

	},
	methods: {

	}

};
</script>

<style scoped>
.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	background-color: white; /*dim the background*/
}

</style>