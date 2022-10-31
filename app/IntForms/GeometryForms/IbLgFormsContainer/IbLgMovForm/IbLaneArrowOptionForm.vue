<template>
	<div id="ib-lane-arrow-option-form">
		<div
			v-for = "(oneArrowLaneOption, optionIndex) in ibLaneArrowLaneOptions"
			:key = "laneIndex + 'arrow-option-' + optionIndex"
			v-on:click = "handleSvgClicked(oneArrowLaneOption)"
		>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
				height="40"
				v-bind:style = "(oneArrowLaneOption.curTypeCount > 1) ? arrowAndNumberClass : onlyArrowClass"
			>
				<path 
					v-bind:d = "laneMovArrowsPath[oneArrowLaneOption.singleArrowType]"
					transform = "scale(0.06, 0.05)"
					v-bind:fill = "(oneArrowLaneOption.ifSelected) ? '#70AD47' : '#B1B1B1'"
				/>
				<path v-bind:d = "laneMovArrowsPath['number' + oneArrowLaneOption.curTypeCount]"
					v-if = "oneArrowLaneOption.curTypeCount > 1"
					transform = "scale(0.06, 0.05)"
					v-bind:fill = "(oneArrowLaneOption.ifSelected) ? '#70AD47' : '#B1B1B1'"
				/>
			</svg>
			<div
				class = "toLane-option-container"
				v-bind:style = "{width: cellWidth + 'px'}"
				v-if = "oneArrowLaneOption.toAppIndex === openedToAppIndex"
			>
				<div
					class = "toLane-option-menu"
					v-bind:style = "{transform: 'translate(' + cellWidth + 'px, ' + optionIndex * cellHeight + 'px)', width: cellWidth + 'px', 'background-color': '#FFFFFF'}"
				>
					<IbLaneToLaneOptionForm
						v-bind = "toLaneOptionPropsArray[optionIndex]"
					/>
				</div>
			</div>
		</div>
		<div
			v-on:click = "removeCurIbLane"
		>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
				height="40"
				v-bind:style = "onlyArrowClass"
			>
				<polygon 
					v-bind:points = "removeIconPath"
					transform = "scale(0.06, 0.05)"
					fill = "#B1B1B1"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
import laneMovArrows from "../../../PredefinedShapes/LaneMovArrows";

import IbLaneToLaneOptionForm from "./IbLaneToLaneOptionForm.vue";

import icons from "../../../PredefinedShapes/Icons";


export default {
	name: "IbLaneArrowOptionForm",

	props: {
		curAppIndex: Number,
		cellWidth: Number,
		paddingWidth: Number,
		laneIndex: Number,
		cellHeight: Number,
		updateLaneMov: Function,
		ibLaneArrowLaneOptions: Array,
		updateCurIbLaneCount: Function,
		updateCurArrowTypes: Function,
		updateIbLaneArrowLaneOptions: Function,
		updateExpandedLaneIndex: Function,
		language: Number
	},
	components: {
		IbLaneToLaneOptionForm
	},
	data: function() {
		const onlyArrowClass = {
			"padding-left": this.paddingWidth + 'px',
			width: this.paddingWidth + 40,
			float: "left"
		};
		const arrowAndNumberClass = {
			"padding-left": this.paddingWidth - 15 + 'px',
			width: this.paddingWidth + 70,
			float: "left"
		}

		const openedToAppIndex = null;  //initially none opened

		return {
			laneMovArrowsPath: laneMovArrows,
			onlyArrowClass: onlyArrowClass,
			arrowAndNumberClass: arrowAndNumberClass,
			openedToAppIndex: openedToAppIndex,
			removeIconPath: icons.removeIconPath
		};
	},
	computed: {
		toLaneOptionPropsArray: function() {
			const toLaneOptionPropsArray = [];

			this.ibLaneArrowLaneOptions.forEach((oneOption, arrowIndex) => {
				toLaneOptionPropsArray.push({
					cellWidth: this.cellWidth,
					cellHeight: this.cellHeight,
					arrowIndex: arrowIndex,
					laneIndex: this.laneIndex,
					toLanesArray: oneOption.toLanesArray,
					selectedToLane: oneOption.selectedToLane,
					updateIbLaneArrowLaneOptions: this.updateIbLaneArrowLaneOptions,
					language: this.language
				});
			});

			return toLaneOptionPropsArray;
		}

	},
	methods: {

		handleSvgClicked: function(oneArrowLaneOption) {
			const clickedToAppIndex = oneArrowLaneOption.toAppIndex;
			this.openedToAppIndex = clickedToAppIndex;
		},

		removeCurIbLane: function() {
			const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;

			const ifReDraw = true;
			const bound = "inbound";

			updateLaneGGLevelGeo.removeLane(
				this.curAppIndex, bound, this.laneIndex, ifReDraw, this.language
			);

			this.updateCurIbLaneCount(this.curAppIndex);
			this.updateCurArrowTypes(this.curAppIndex);
			this.updateExpandedLaneIndex(null);   //close the current expanded menu
		}
	}


};
</script>

<style scoped>
td {
	padding: 0px;
}

.toLane-option-container {
	position: relative;
}

.toLane-option-menu {
	position: absolute;
    border: 1px solid #A7A7A7;
    border-radius: .25rem;
    background-color: "#FFFFFF";
}



</style>