<template>
	<div id="side-lg-forms-container"
		v-bind:style = "{width: sideModeContainerInnerWidth - 4 + 'px'}"
	>
		<table
			width="98%"
		>
			<tbody>
				<SideLgAddRemoveCell
					v-bind = "ibSideAddRemoveCellProps"
				/>
				<SideLgFeatureCell
					v-if = "ifIbSideLane"
					v-bind = "ibSideFeatureProps"
				/>
				<SideLgAddRemoveCell
					v-bind = "obSideAddRemoveCellProps"
				/>
				<SideLgFeatureCell
					v-if = "ifObSideLane"
					v-bind = "obSideFeatureProps"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import SideLgAddRemoveCell from "./SideLgAddRemoveCell.vue";
import SideLgFeatureCell from "./SideLgFeatureCell.vue";

export default {
	name: "SideLgFormsContainer",

	props: {
		sideModeContainerInnerWidth: Number,
		sideModeWidth: Number,
		prototypeDummy: Number,
		labelWidth: Number,
		appCellWidth: Number,
		curAppIndex: Number,
		language: Number
	},
	components: {
		SideLgAddRemoveCell,
		SideLgFeatureCell
	},
	data: function() {
		return {
			ifIbSideLane: this.getCurIfIbSideLane(this.curAppIndex),
			ifObSideLane: this.getCurIfObSideLane(this.curAppIndex),
		};
	},
	watch: {
		curAppIndex: function(newAppIndex, oldAppIndex) {
			this.updateCurIfIbSideLane(newAppIndex);
			this.updateCurIfObSideLane(newAppIndex);
		},
	},
	computed: {
		ibSideAddRemoveCellProps: function() {
			const ibSideAddRemoveCellProps = {
				ifSideLane: this.ifIbSideLane,
				curAppIndex: this.curAppIndex,
				addSideLane: this.addSideLane,
				removeSideLane: this.removeSideLane,
				bound: "inboundSide",
				cellWidth: this.sideModeContainerInnerWidth - this.labelWidth,
				labelWidth: this.labelWidth,
				language: this.language
			};

			return ibSideAddRemoveCellProps;

		},
		obSideAddRemoveCellProps: function() {
			const obSideAddRemoveCellProps = {
				ifSideLane: this.ifObSideLane,
				curAppIndex: this.curAppIndex,
				addSideLane: this.addSideLane,
				removeSideLane: this.removeSideLane,
				bound: "outboundSide",
				cellWidth: this.sideModeContainerInnerWidth - this.labelWidth,
				labelWidth: this.labelWidth,
				language: this.language
			};
			return obSideAddRemoveCellProps;
		},
		ibSideFeatureProps: function() {
			const ibSideFeatureProps = {
				bound: "inboundSide",
				curAppIndex: this.curAppIndex,
				labelWidth: this.labelWidth,
				appCellWidth: this.appCellWidth,
				language: this.language
			};

			return ibSideFeatureProps;
		},
		obSideFeatureProps: function() {
			const obSideFeatureProps = {
				bound: "outboundSide",
				curAppIndex: this.curAppIndex,
				labelWidth: this.labelWidth,
				appCellWidth: this.appCellWidth,
				language: this.language
			};

			return obSideFeatureProps;
		}
	},
	methods: {
		getCurIfIbSideLane: function(appIndex) {
			//get counts of the current approach's inboundSide lanes:
			const getLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getLaneGGLevelGeo;
			//would be 0 if current approach has no inboundSide laneGroup:
			const ibSideLaneCount = getLaneGGLevelGeo.getLaneGroupLaneCountsByAppIndexAndBound(
									appIndex, "inboundSide", this.language
								);
			const curIfIbSideLane = (ibSideLaneCount === 0) ? false : true;

			return curIfIbSideLane;
		},
		getCurIfObSideLane: function(appIndex) {
			//get counts of the current approach's outboundSide lanes:
			const getLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getLaneGGLevelGeo;
			//would be 0 if current approach has no outboundSide laneGroup:
			const obSideLaneCount = getLaneGGLevelGeo.getLaneGroupLaneCountsByAppIndexAndBound(
									appIndex, "outboundSide", this.language
								);
			const curIfObSideLane = (obSideLaneCount === 0) ? false : true;

			return curIfObSideLane;
		},
		updateCurIfIbSideLane: function(appIndex) {
			this.ifIbSideLane = this.getCurIfIbSideLane(appIndex);
		},
		updateCurIfObSideLane: function(appIndex) {
			this.ifObSideLane = this.getCurIfObSideLane(appIndex);
		},
		addSideLane: function(bound) {
			const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;
			const ifReDraw = true;
			updateLaneGGLevelGeo.addLane(this.curAppIndex, bound, ifReDraw, this.language);


			if (bound === "inboundSide") {
				this.updateCurIfIbSideLane(this.curAppIndex);
			}
			else {
				this.updateCurIfObSideLane(this.curAppIndex);
			}
		},
		removeSideLane: function(bound) {
			const updateLaneGGLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateLaneGGLevelGeo;
			const ifReDraw = true;
			const laneIndex  = 0;   //only one side road lane allowed
			updateLaneGGLevelGeo.removeLane(this.curAppIndex, bound, laneIndex, ifReDraw, this.language);

			if (bound === "inboundSide") {
				this.updateCurIfIbSideLane(this.curAppIndex);
			}
			else {
				this.updateCurIfObSideLane(this.curAppIndex);
			}
		}
	}


};
</script>

<style>
/*
#side-mode-component {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
*/
</style>