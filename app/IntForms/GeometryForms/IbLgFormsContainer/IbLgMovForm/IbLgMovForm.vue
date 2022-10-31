<template>
	<div id="ib-lg-mov-form">
		<tr>
			<BaseRowHead
				v-bind:labelName = "''"
				v-bind:labelWidth = "labelWdith"
			/>
			<td v-for = "(oneArrowType, laneIndex) in curArrowsTypes"
				:key = "curAppIndex + '-ib-' + laneIndex"
			>
				<IbLaneArrowCell
					v-bind = "arrowOptionsFormPropsArray[laneIndex]"
				/>
			</td>


			<td>
				<div v-bind:style = "{width: cellWidth + 'px', height: '40px'}"
					v-on:click = "addNewLane"
				>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
						height="40"
						v-bind:style = "{'padding-left': paddingWidth * 3 + 'px', width: 40, float: 'left'}"
					>
						<polygon 
							v-bind:points = "addIconPath"
							transform = "scale(0.06, 0.05)"
							fill = "#B1B1B1"
						/>
					</svg>
				</div>			
			</td>
		</tr>
	</div>
</template>

<script>
import BaseRowHead from "../../../SharedBaseCells/BaseRowHead.vue";
import IbLaneArrowCell from "./IbLaneArrowCell.vue";

import icons from "../../../PredefinedShapes/Icons";


export default {
	name: "IbLgMovForm",

	props: {
		labelWdith: Number,
		formWidth: Number,
		cellWidth: Number,
		curAppIndex: Number,
		curAppAngle: Number,
		curArrowsTypes: Array,
		updateCurIbLaneCount: Function,
		updateCurArrowTypes: Function,
		language: Number
	},
	components: {
		BaseRowHead,
		IbLaneArrowCell
	},
	data: function() {
		const expandedLaneIndex = null;

		return {
			laneMovLable: (this.language === 1) ? "Lane Mov." : "车道转向",
			expandedLaneIndex: expandedLaneIndex,
			addIconPath: icons.addIconPath,
			svgArrowWidth: 40,  //for 40 px
			expandArrowWidth: 11,  //for 11 px
		};
	},
	watch: {
		curAppIndex: function(newAppIndex, oldAppIndex) {
			//close previously opened menu:
			this.updateExpandedLaneIndex(null);
		}
	},
	computed: {
		paddingWidth: function() {
			const paddingWidth = (this.cellWidth - this.svgArrowWidth - this.expandArrowWidth) / 5;
			return paddingWidth;
		},
		arrowOptionsFormPropsArray: function() {
			const arrowOptionsFormPropsArray = [];

			this.curArrowsTypes.forEach((oneLaneArrowType, laneIndex) => {
				arrowOptionsFormPropsArray.push({
					curAppIndex: this.curAppIndex,
					laneIndex: laneIndex,
					arrowType: oneLaneArrowType,
					expandArrowWidth: this.expandArrowWidth,
					cellWidth: this.cellWidth,
					paddingWidth: this.paddingWidth,
					expandedLaneIndex: this.expandedLaneIndex,
					updateExpandedLaneIndex: this.updateExpandedLaneIndex,
					updateCurIbLaneCount: this.updateCurIbLaneCount,
					updateCurArrowTypes: this.updateCurArrowTypes,
					language: this.language
				});
			});

			return arrowOptionsFormPropsArray;
		}
	},
	methods: {
		addNewLane: function() {
			const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;
			const bound = "inbound";
			const ifReDraw = true;

			updateLaneGGLevelGeo.addLane(
				this.curAppIndex, bound, ifReDraw, this.language
			);

			this.updateCurIbLaneCount(this.curAppIndex);
			this.updateCurArrowTypes(this.curAppIndex);
		},
		updateExpandedLaneIndex: function(nextExpanedLaneIndex) {
			this.expandedLaneIndex = nextExpanedLaneIndex;
		}
	}


};
</script>

<style scoped>
td {
	padding: 0px;
	padding-top: 4px;
}

.to-expand-arrow {
	float: right;
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
    border-radius: .25rem;
}

.arrow-drop-down-menu-container {
	position: relative;
}

.arrow-drop-down-menu {
	/**/position: absolute;
    border: 1px solid #A7A7A7;
    border-radius: .25rem;
    border-top: 5px solid #ffffff;
    transform: translate(-1px, -5px);
}



</style>