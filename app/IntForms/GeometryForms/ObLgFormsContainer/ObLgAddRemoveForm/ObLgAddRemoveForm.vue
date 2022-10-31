<template>
	<div id="ob-lg-add-remove-form">
		<tr>
			<BaseRowHead
				v-bind:labelName = "''"
				v-bind:labelWidth = "labelWdith"
			/>
			<td v-for = "laneIndexAddOne in curObLaneCount"
				:key = "curAppIndex + '-ob-' + laneIndexAddOne"
				v-on:click = "removeObLane(laneIndexAddOne - 1)"
			>
				<div v-bind:style = "{width: cellWidth + 'px', height: '40px'}"
				>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
						height="40"
						v-bind:style = "{'padding-left': paddingWidth * 3 + 'px', width: svgArrowWidth, float: 'left'}"
					>
						<polygon 
							v-bind:points = "removeIconPath"
							transform = "scale(0.06, 0.05)"
							fill = "#B1B1B1"
						/>
					</svg>
				</div>				
			</td>


			<td>
				<div v-bind:style = "{width: cellWidth + 'px', height: '40px'}"
					v-on:click = "addNewLane"
				>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
						height="40"
						v-bind:style = "{'padding-left': paddingWidth * 3 + 'px', width: svgArrowWidth, float: 'left'}"
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

import icons from "../../../PredefinedShapes/Icons";


export default {
	name: "ObLgAddRemoveForm",

	props: {
		labelWdith: Number,
		formWidth: Number,
		cellWidth: Number,
		curAppIndex: Number,
		curObLaneCount: Number,
		updateCurObLaneCount: Function,
		updateCurArrowTypes: Function,
		language: Number
	},
	components: {
		BaseRowHead,
	},
	data: function() {
		return {
			addIconPath: icons.addIconPath,
			svgArrowWidth: 40,  //for 40 px
			removeIconPath: icons.removeIconPath,
		};
	},
	computed: {
		paddingWidth: function() {
			const paddingWidth = (this.cellWidth - this.svgArrowWidth) / 5;
			return paddingWidth;
		},
	},
	methods: {
		addNewLane: function() {
			const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;
			const bound = "outbound";
			const ifReDraw = true;

			updateLaneGGLevelGeo.addLane(
				this.curAppIndex, bound, ifReDraw, this.language
			);

			this.updateCurObLaneCount(this.curAppIndex);
		},
		removeObLane: function(laneIndex) {
			const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;
			const bound = "outbound";
			const ifReDraw = true;

			updateLaneGGLevelGeo.removeLane(
				this.curAppIndex, bound, laneIndex, ifReDraw, this.language
			);

			this.updateCurObLaneCount(this.curAppIndex);
			//inform inbound laneGroup to update its arrow types (mainly for u-turn case):
			this.updateCurArrowTypes(this.curAppIndex);

		}
	}


};
</script>

<style scoped>
td {
	padding: 0px;
	padding-top: 4px;
}

</style>