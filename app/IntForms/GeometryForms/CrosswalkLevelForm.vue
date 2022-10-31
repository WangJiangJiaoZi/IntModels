<template>
	<div id="crosswalk-level-form">
		<table
			width="98%"
		>
			<tbody>
				<tr>
					<BaseRowHead
						v-bind:labelName = "ifCrosswalkSetting.labelName"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseDropdownLongOptionsCell
						:key = "curAppIndex + '-ifCrosswalkSetting'"
						v-bind:labelName = "ifCrosswalkSetting.labelName"
						v-bind:curSelectedIndex = "ifCrosswalkSetting.curSelectedIndex"
						v-bind:options = "ifCrosswalkSetting.options"
						v-bind:selectHandler = "ifCrosswalkSetting.selectHandler"
					/>
				</tr>
				<tr>
					<BaseRowHead
						v-bind:labelName = "crosswalkAngleSetting.labelName"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseDropdownLongOptionsCell
						:key = "curAppIndex + '-crosswalkAngleSetting'"
						v-bind:labelName = "crosswalkAngleSetting.labelName"
						v-bind:curSelectedIndex = "crosswalkAngleSetting.curSelectedIndex"
						v-bind:options = "crosswalkAngleSetting.options"
						v-bind:selectHandler = "crosswalkAngleSetting.selectHandler"
						v-bind:ifDisabled = "crosswalkAngleSetting.ifDisabled"
					/>
				</tr>
				<tr
					v-for = "(oneSetting, index) in crosswalkSettings"
					:key = "oneSetting.labelName"
					v-bind = "oneSetting"
				>
					<BaseRowHead
						v-bind:labelName = "oneSetting.labelName"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseInputCell
						v-bind:labelName = "oneSetting.labelName"
						v-bind:cellPlaceHolder = "oneSetting.cellPlaceHolder"
						v-bind:cellType = "oneSetting.cellType"
						v-bind:enterHandler = "oneSetting.enterHandler"
						v-bind:inputValue = "oneSetting.inputValue"
						v-bind:baseCellWidth = "appCellWidth"
						v-bind:ifDisabled = "oneSetting.ifDisabled"
					/>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

import BaseRowHead from "../SharedBaseCells/BaseRowHead.vue";
//import BaseDropdownOptionsCell from "../SharedBaseCells/BaseDropdownOptionsCell.vue";
import BaseInputCell from "../SharedBaseCells/BaseInputCell.vue";
import BaseDropdownLongOptionsCell from "../SharedBaseCells/BaseDropdownLongOptionsCell.vue";


export default {
	name: "CrosswalkLevelForm",
	props: {
		labelWdith: Number,
		appFormWidth: Number,
		curAppIndex: Number,
		appCellWidth: Number,
		language: Number
	},
	components: {
		BaseRowHead,
		//BaseDropdownOptionsCell,
		BaseInputCell,
		BaseDropdownLongOptionsCell
	},

	data: function() {
		const ifCrosswalkOptions = [
			{
				value: true,
				label: (this.language === 1) ? "YES" : "是"
			},
			{
				value: false,
				label: (this.language === 1) ? "No" : "否"
			}
		];

		const crosswalkAngleOptions = [{
				label: (this.language === 1) ? "Auto" : "自适应",
				value: (this.language === 1) ? "Auto" : "自适应"
		}];
		let i = 5;
		while (i < 180) {
			crosswalkAngleOptions.push({
				label: i.toString(),
				value: i.toString()
			});
			i = i + 5;
		}

		const curCrosswalkFeatures = this.getCrosswalkFeatures(this.curAppIndex);

		return {
			ifCrosswalkOptions: ifCrosswalkOptions,
			curCrosswalkFeatures: curCrosswalkFeatures,
			crosswalkAngleOptions: crosswalkAngleOptions
		};
	},
	computed: {
		ifCrosswalkSetting: function() {
			const ifCrosswalk = this.curCrosswalkFeatures.ifCrosswalk;
			const curSelectedIndex = (ifCrosswalk) ? 0 : 1;
			const ifCrosswalkSetting = {
				labelName: (this.language === 1) ? "If Crosswalk" : "是否有人行道",
				curSelectedIndex: curSelectedIndex,
				options: this.ifCrosswalkOptions,
				selectHandler: this.updateIfCrosswalk
			}

			return ifCrosswalkSetting;
		},
		crosswalkAngleSetting: function() {
			const ifCrosswalk = this.curCrosswalkFeatures.ifCrosswalk;
			const ifIslandEnd = this.curCrosswalkFeatures.ifIslandEnd;

			const curAngle = (ifIslandEnd) ? 0 : this.curCrosswalkFeatures.crosswalkAngle;
			const curSelectedIndex = Math.floor(curAngle / 5);

			const crosswalkAngleSetting = {
				labelName: (this.language === 1) ? "Crosswalk Angle" : "人行道角度",
				curSelectedIndex: curSelectedIndex,
				options: this.crosswalkAngleOptions,
				selectHandler: this.updateCrosswalkAngle,
				ifDisabled: (ifCrosswalk && !ifIslandEnd) ? false : true
			};

			return crosswalkAngleSetting;
		},
		crosswalkSettings: function() {
			const ifFeaturesDisabled = (this.curCrosswalkFeatures.ifCrosswalk) ? false : true;

			const crosswalkSettings = [
				{
					labelName: (this.language === 1) ? "Crosswalk Width" : "人行道宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateCrosswalkWidth,
					inputValue: JSON.stringify(this.curCrosswalkFeatures.crossswalkWidth),
					ifDisabled: ifFeaturesDisabled
				},
				{
					labelName: (this.language === 1) ? "Dist. to Center" : "距路口距离",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateCrosswalkOffset,
					inputValue: JSON.stringify(this.curCrosswalkFeatures.crosswalkOffset),
					ifDisabled: ifFeaturesDisabled
				},
				{
					labelName: (this.language === 1) ? "Dist. to Stop Bar" : "距停止线距离",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateCrosswalkBuffer,
					inputValue: JSON.stringify(this.curCrosswalkFeatures.crosswalkBuffer),
					ifDisabled: ifFeaturesDisabled
				}
			];

			return crosswalkSettings;
		}
	},
	watch: {
		curAppIndex: function(newAppIndex, oldAppIndex) {
			this.curCrosswalkFeatures = this.getCrosswalkFeatures(newAppIndex);
		}
	},
	mounted: function() {
		this.updateCrosswalkLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateCrosswalkLevelGeo;
	},
	methods: {
		getCrosswalkFeatures: function(appIndex) {
			const getCrosswalkLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getCrosswalkLevelGeo;
			const curCrosswalkFeatures = getCrosswalkLevelGeo.getCrosswalkFeaturesByAppIndex(
											appIndex, this.language
										);

			return curCrosswalkFeatures;
		},

		updateIfCrosswalk: function(nextIfCrosswalk) {
			const ifReDraw = true;

			this.updateCrosswalkLevelGeo.updateIfCrosswalk(
				this.curAppIndex, nextIfCrosswalk, ifReDraw, this.language
			);
		},

		updateCrosswalkAngle: function(nextAngle) {
			const ifReDraw = true;
			const nextCwAngle = (nextAngle === "Auto" || nextAngle === "自适应") ? 0 : Number(nextAngle);

			this.updateCrosswalkLevelGeo.updateCrosswalkAngle(
				this.curAppIndex, nextCwAngle, ifReDraw, this.language
			);
		},

		updateCrosswalkWidth: function(enterEvent) {
			const nextWidth = Number(enterEvent.target.value);
			const ifReDraw = true;

			this.updateCrosswalkLevelGeo.updateCrosswalkWidth(
				this.curAppIndex, nextWidth, ifReDraw, this.language
			);

			//when crosswalk width changed, other features may change as well
			this.curCrosswalkFeatures = this.getCrosswalkFeatures(this.curAppIndex);
		},

		updateCrosswalkOffset: function(enterEvent) {
			const nextOffset = Number(enterEvent.target.value);
			const ifReDraw = true;

			this.updateCrosswalkLevelGeo.updateCrosswalkOffset(
				this.curAppIndex, nextOffset, ifReDraw, this.language
			);
		},

		updateCrosswalkBuffer: function(enterEvent) {
			const nextBuffer = Number(enterEvent.target.value);
			const ifReDraw = true;

			this.updateCrosswalkLevelGeo.updateCrosswalkBuffer(
				this.curAppIndex, nextBuffer, ifReDraw, this.language
			);
		}
	}


};
</script>

<style scoped>

</style>