<template>
	<tr id="side-lg-add-remove-cell">
		<BaseRowHead
			v-bind:labelName = "labelName"
			v-bind:labelWidth = "labelWidth"
		/>
		<td>
			<div v-bind:style = "{width:'100%', height: svgArrowWidth + 'px'}"
				v-on:click = "handleIconClick"
			>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
					height="40"
					v-bind:style = "{'padding-left': paddingWidth + 'px', width: 0  + svgArrowWidth}"
				>
					<polygon 
						v-bind:points = "(ifSideLane) ? removeIconPath : addIconPath"
						transform = "scale(0.06, 0.05)"
						fill = "#B1B1B1"
					/>
				</svg>
			</div>			
		</td>
	</tr>
</template>

<script>
import icons from "../../PredefinedShapes/Icons";
import BaseRowHead from "../../SharedBaseCells/BaseRowHead.vue";

export default {
	name: "SideLgAddRemoveCell",

	props: {
		ifSideLane: Boolean,
		curAppIndex: Number,
		addSideLane: Function,
		removeSideLane: Function,
		bound: String,
		cellWidth: Number,
		labelWidth: Number,
		language: Number
	},
	components: {
		BaseRowHead
	},
	data: function() {
		return {
			addIconPath: icons.addIconPath,
			removeIconPath: icons.removeIconPath,
			svgArrowWidth: 40,  //for 40 px
		};
	},
	computed: {
		labelName: function() {
			let bound, action, target;
			if (this.language === 1) {
				action = (this.ifSideLane) ? "Remove " : "Add ";
				bound = (this.bound === "inboundSide") ? "INBD " : "OUTBD ";
				target = "Side Lane";
			}
			else {
				action = (this.ifSideLane) ? "删除" : "添加";
				bound = (this.bound === "inboundSide") ? "进口方向" : "出口方向";
				target = "辅路";
			}

			const labelName = action + bound + target;

			return labelName;
		},
		paddingWidth: function() {
			const paddingWidth = (this.cellWidth - this.svgArrowWidth) / 2;

			return paddingWidth;
		}
	},
	methods: {
		handleIconClick: function() {
			if (this.ifSideLane) {
				this.removeSideLane(this.bound);
			}
			else {
				this.addSideLane(this.bound);
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