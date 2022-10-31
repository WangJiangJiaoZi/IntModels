<template>
	<div id="ib-lane-toLane-option-form">
		<div
			v-for = "(oneToLaneOption, oneToLaneOptionIndex) in toLaneOptions"
			:key = "laneIndex + '-lane-option-' + oneToLaneOptionIndex"
			v-on:click = "handleToLaneOptionClicked(oneToLaneOption, oneToLaneOptionIndex)"
		>
			<div
				class = "toLane-option"
				v-bind:style = "{color: (oneToLaneOption.ifSelected) ? '#70AD47' : '#767171'}"
			>
				{{laneText}} - {{oneToLaneOption.toLaneIndex}}
			</div>
		</div>

	</div>
</template>

<script>
import laneMovArrows from "../../../PredefinedShapes/LaneMovArrows";


export default {
	name: "IbLaneToLaneOptionForm",

	props: {
		cellWidth: Number,
		cellHeight: Number,
		arrowIndex: Number,
		laneIndex: Number,
		toLanesArray: Array,
		selectedToLane: Number,
		updateIbLaneArrowLaneOptions: Function,
		language: Number
	},
	components: {
	},
	data: function() {

		const toLaneOptions = [];
		this.toLanesArray.forEach((oneToLaneOption) => {
			toLaneOptions.push({
				toLaneIndex: oneToLaneOption,
				ifSelected: (oneToLaneOption === this.selectedToLane) ? true : false
			});
		});

		const laneText = (this.language === 1) ? "Lane" : "车道";

		return {
			laneText: laneText,
			toLaneOptions: toLaneOptions,
		};
	},
	computed: {


	},
	methods: {
		handleToLaneOptionClicked: function(nextSelectedToLaneOption, nextSelectedToLaneOptionIndex) {
			//decide nextIfSelected:
			const nextIfSelected = (nextSelectedToLaneOption.ifSelected) ? false : true;

			//reset this.toLaneOptions:
			this.toLaneOptions.forEach((oneOption, oneOptionIndex, toLaneOptions) => {
				toLaneOptions[oneOptionIndex].ifSelected = false;
			});

			this.$set(this.toLaneOptions, nextSelectedToLaneOptionIndex, {
				toLaneIndex: nextSelectedToLaneOption.toLaneIndex,
				ifSelected: nextIfSelected
			});


			const selectedToLane = (nextSelectedToLaneOption.ifSelected) ? null : nextSelectedToLaneOptionIndex;   //lane index starts from 0

			const ifArrowSelected = (nextIfSelected) ? true : false;

			this.updateIbLaneArrowLaneOptions(this.arrowIndex, ifArrowSelected, selectedToLane);

		}
	}


};
</script>

<style scoped>

.toLane-option {
	text-align: center;
	height: 22px;
	font-size: 16px;
	cursor: pointer;
}

</style>