<template>
	<div id="ib-lane-arrow-cell">
		<div v-bind:style = "{width: cellWidth + 'px', height: '40px'}"
			class = "arrow-drop-down-box">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
				height="40"
				v-bind:style = "{'padding-left': paddingWidth * 3 + 'px', width: 40, float: 'left'}"
			>
				<path 
					v-for = "(onePath, pathIndex) in laneArrowPathArray"
					:key = "curAppIndex + laneIndex + '-path-' + pathIndex"
					v-bind:d = "onePath"
					transform = "scale(0.06, 0.05)"
					fill = "#B1B1B1"/>
			</svg>
			<div v-bind:style = "{height: '40px', float: 'left'}">
				<img
					v-bind:src = "expandImageUrl"
					v-bind:style = "dropDownArrowStyle"
					v-bind:class = "imgClass"
					v-on:click = "handleDropdownArrowClicked()"
					:key = "curAppIndex + '-' + laneIndex + '-dropdown-img'"
				/>
			</div>
			<div class = "arrow-drop-down-menu-container">
				<div v-if = "expandedLaneIndex === laneIndex"
					class = "arrow-drop-down-menu"
					v-bind:style = "{width: cellWidth + 'px', 'background-color': '#FFFFFF'}"
				>
					<IbLaneArrowOptionForm
						v-bind = "arrowOptionsProps"
					/>
				</div>						
			</div>

		</div>
	</div>
</template>

<script>
import IbLaneArrowOptionForm from "./IbLaneArrowOptionForm.vue";

import laneMovArrows from "../../../PredefinedShapes/LaneMovArrows";

import expandImageUrl from "../../../../Images/Icons/DropdownArrow.png";


export default {
	name: "IbLaneArrowCell",

	props: {
		curAppIndex: Number,
		laneIndex: Number,
		expandedLaneIndex: Number,
		arrowType: Number,
		expandArrowWidth: Number,
		cellWidth: Number,
		paddingWidth: Number,
		updateExpandedLaneIndex: Function,
		updateCurIbLaneCount: Function,
		updateCurArrowTypes: Function,
		language: Number
	},
	components: {
		IbLaneArrowOptionForm
	},
	data: function() {
		const ibLaneArrowLaneOptions = this.getIbLaneArrowLaneOptions();

		return {
			laneMovArrowsPath: laneMovArrows,
			expandImageUrl: expandImageUrl,
			cellHeight: 40,  //for 40 px
			ibLaneArrowLaneOptions: ibLaneArrowLaneOptions,
		};
	},

	computed: {
		dropDownArrowStyle: function() {
			const dropDownArrowStyle = {
				'padding-left': this.paddingWidth - 1 + 'px',
				'padding-right': this.paddingWidth - 1 + 'px',
				//width: this.expandArrowWidth + this.paddingWidth * 2 - 2 + 'px',
				'margin-top': 16 + 'px'
			};

			return dropDownArrowStyle;
		},
		imgClass: function() {
			const imgClass = (this.expandedLaneIndex === this.laneIndex) ? "expanded-arrow" : "to-expand-arrow";

			return imgClass;
		},

		laneArrowPathArray: function() {
			const laneArrowPathArray = this.laneMovArrowsPath[this.arrowType];;

			return laneArrowPathArray;
		},
		arrowOptionsProps: function() {
			const arrowOptionsProps = {
				curAppIndex: this.curAppIndex,
				cellWidth: this.cellWidth,
				paddingWidth: this.paddingWidth * 3,
				laneIndex: this.laneIndex,
				cellHeight: this.cellHeight,
				updateLaneMov: this.updateLaneMov,
				ibLaneArrowLaneOptions: this.ibLaneArrowLaneOptions,
				updateIbLaneArrowLaneOptions: this.updateIbLaneArrowLaneOptions,
				updateCurIbLaneCount: this.updateCurIbLaneCount,
				updateCurArrowTypes: this.updateCurArrowTypes,
				updateExpandedLaneIndex: this.updateExpandedLaneIndex,
				language: this.language
			};

			return arrowOptionsProps;
		}
	},
	methods: {
		getIbLaneArrowLaneOptions: function() {
			const getLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getLaneGGLevelGeo;
			const ibLaneArrowLaneOptions = getLaneGGLevelGeo.getIbLaneArrowLaneOptions(
											this.curAppIndex, this.laneIndex, this.language
										);

			return ibLaneArrowLaneOptions;
		},
		updateIbLaneArrowLaneOptions: function(arrowIndex, ifSelected, selectedToLane) {
			const arrowLaneOptionToUpdate = this.ibLaneArrowLaneOptions[arrowIndex];

			this.$set(
				this.ibLaneArrowLaneOptions,
				arrowIndex,
				{
					singleArrowType: arrowLaneOptionToUpdate.singleArrowType,
					ifSelected: ifSelected,
					curTypeCount: arrowLaneOptionToUpdate.curTypeCount,
					toAppIndex: arrowLaneOptionToUpdate.toAppIndex,
					toLanesArray: arrowLaneOptionToUpdate.toLanesArray,
					selectedToLane: selectedToLane
				}
			);
		},
		handleDropdownArrowClicked: function() {
			if (this.laneIndex === this.expandedLaneIndex) {
				this.updateExpandedLaneIndex(null);
				this.updateLaneMov(this.laneIndex, this.ibLaneArrowLaneOptions)
			}
			else {
				this.updateExpandedLaneIndex(this.laneIndex);
			}
		},
		updateLaneMov: function(laneIndex, arrowToLaneOptionsResult) {
			const nextLaneMov = [];
			arrowToLaneOptionsResult.forEach((oneArrowToLaneOption) => {
				if (oneArrowToLaneOption.ifSelected) {
					nextLaneMov.push(oneArrowToLaneOption.toAppIndex + "-" + oneArrowToLaneOption.selectedToLane);
				}
			});

			const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;
			updateLaneGGLevelGeo.updateLaneFeature(
				this.curAppIndex,
				"inbound",
				this.laneIndex,
				"laneMov",
				nextLaneMov,
				true,
				this.language
			);

			//ask updateCurArrowTypes to arrowType in cells:
			this.updateCurArrowTypes(this.curAppIndex);
		}
	}


};
</script>

<style scoped>
td {
	padding-right: 0px;
	padding-top: 4px;
}

.to-expand-arrow {
	float: left;
	height: 8px;
	margin-top: 16px;
}
.expanded-arrow {
	float: right;
	height: 8px;
	margin-top: 16px;
	transform: rotate(180deg);
}

.arrow-drop-down-box {
    border: 1px solid #A7A7A7;
    border-radius: .0rem;
    border-spacing: 0px;
}

.arrow-drop-down-menu-container {
	position: relative;
}

.arrow-drop-down-menu {
	/**/position: absolute;
    border: 1px solid #A7A7A7;
    border-radius: .0rem;
    border-top: 5px solid #ffffff;
    transform: translate(-1px, 39px);
}


</style>