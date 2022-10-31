<template>
	<div id="side-mode-component"
		v-bind:style = "{
			width: sideModeWidth,
			height: sideModeContainerHeight - 2 + 'px',
			position: 'relative',
			overflow: 'auto'
		}"
	>
		<SignalFormsHeader
			v-bind = "sigFormsHeaderProps"
		/>
		<div v-if = "ifProcessing">
			Processing...
		</div>
		<div v-show = "!ifProcessing">
			<StepOneComponent
				v-bind = "stepProps"
				v-if = "currentStep === 1"
			/>
			<StepTwoComponent
				v-bind = "stepProps"
				v-if = "currentStep === 2"
			/>
			<StepThreeComponent
				v-if = "currentStep === 3"
				v-bind = "Object.assign({}, stepProps, stepWzCanvasProps)"
			/>
			<StepFourComponent
				v-if = "currentStep === 4"
				v-bind = "Object.assign({}, stepProps, stepWzCanvasProps)"
			/>
			<StepFiveComponent
				v-if = "currentStep === 5 && !ifProcessing"
				v-bind = "Object.assign({}, stepProps, stepWzCanvasProps)"
			/>
			<RBCanvasContainer
				class = "rb-canvas-container"
				v-if = "[3, 4, 5].includes(currentStep)"
				v-bind = "rbCanvasContainerProps"
			/>
		</div>

	</div>
</template>

<script>
import FeatureFormsHeader from "../SharedBaseCells/FeatureFormsHeader.vue";
//import IntLevelComponent from "./IntLevelComponent.vue";
//import MovLevelComponent from "./MovLevelComponent.vue";
//import BndLevelComponent from "./BndLevelComponent.vue";
//import PathLevelComponent from "./PathLevelComponent.vue";
//import LaneLevelComponent from "./LaneLevelComponent.vue";


export default {
	name: "SideModeComponent",

	props: {
		sideModeContainerWidth: Number,
		sideModeContainerHeight: Number,
		prototypeDummy: Number,
		labelWidth: Number,
		minCellWidth: Number,
		levelCounts: Number,
		titleStrings: Object
	},
	components: {
		FeatureFormsHeader: FeatureFormsHeader
	},
	data: function() {
		const sideModeWidth = this.sideModeContainerWidth - 30;  //initial side mode width equals to conatiner width
		const currentLevel = 1;  //start from the "int" level

		return {
			sideModeContainerInnerWidth: sideModeWidth - 30,
			sideModeWidth: sideModeWidth,
			currentLevel: currentLevel,
			ifProcessing: false
		};
	},
	computed: {
		featureFormsHeaderProps: function() {
			const featureFormsHeaderProps = {
				levelCounts: this.levelCounts,
				currentLevel: this.currentLevel,
				title: this.titleStrings.feature_levels,
				levelNames: this.titleStrings.level_names
			};

			return featureFormsHeaderProps;
		},
		stepProps: function() {
			const stepProps = {
				sideModeContainerInnerWidth: this.sideModeContainerInnerWidth,
				sideModeWidth: this.sideModeWidth,
				prototypeDummy: this.prototypeDummy,
				labelWidth: this.labelWidth,
				minCellWidth: this.minCellWidth,
				updateSideModeWidth: this.updateSideModeWidth,
				updateStep: this.updateStep,
				stepCounts: this.stepCounts,
				titleStrings: this.titleStrings,
				updateRBCMode: this.updateRBCMode
			};

			return stepProps;
		},

		canvasContainerHeight: function() {
			const canvasContainerHeight = (this.ringGap + this.ringHeight) * 4 + 2;
			return canvasContainerHeight;
		},

		stepWzCanvasProps: function() {
			const stepWzCanvasProps = {
				rbCanvasContainerId: this.rbCanvasContainerId,
				ringHeight: this.ringHeight,  //in pixel
				ringGap: this.ringGap,  //in pixel
				stepHeight: this.sideModeContainerHeight - this.canvasContainerHeight - 44,
				rbcMode: this.rbcMode,
				modelRBAndDraw: this.modelRBAndDraw,
			};

			return stepWzCanvasProps;
		},

		rbCanvasContainerProps: function() {
			const rbCanvasContainerProps = {
				sideModeContainerInnerWidth: this.sideModeContainerInnerWidth,
				sideModeWidth: this.sideModeWidth,
				prototypeDummy: this.prototypeDummy,
				rbCanvasContainerId: this.rbCanvasContainerId,
				titleStrings: this.titleStrings,
				ringHeight: this.ringHeight,  //in pixel
				ringGap: this.ringGap,  //in pixel
				canvasContainerHeight: this.canvasContainerHeight
			};

			return rbCanvasContainerProps;
		}
	},
	methods: {
		updateSideModeWidth: function(nextWidth) {
			this.sideModeWidth = nextWidth;
		},

		toggleIfProcessing: function() {
			this.ifProcessing = !this.ifProcessing;
		},

		updateLevel: function(nextLevel) {
			/**/
			//process data:
			const bsdSteps = [1, 2, 3, 4];
			if (bsdSteps.includes(this.currentStep) && !bsdSteps.includes(nextStep)) {
				this.toggleIfProcessing();
				this.exportBsdToDB().then(() => {
					this.importPatternsFrDB().then(() => {
						this.toggleIfProcessing();
					});
				}).catch((er) => {
					throw new Error(er);
				});
			}
			else if (!bsdSteps.includes(this.currentStep) && bsdSteps.includes(nextStep)) {
				this.toggleIfProcessing();
				this.exportPatternsToDB().then(() => {
					this.importBsdFrDB().then(() => {
						this.toggleIfProcessing();
					});
				}).catch((er) => {
					throw new Error(er);
				});
			}

			//update step:
			this.currentStep = nextStep;
		}

	}


};
</script>

<style scoped="">
	/**/
	#side-mode-component {
		height: 100%;
	}

</style>