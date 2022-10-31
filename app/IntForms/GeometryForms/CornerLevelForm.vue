<template>
	<div id="corner-level-form">
		<table
			width="98%"
		>
			<tbody>
				<tr>
					<BaseRowHead
						v-bind:labelName = "cornerTypeLable"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseDropdownLongOptionsCell
						:key = "curAppIndex + '-corner-type-setting'"
						v-bind:labelName = "cornerTypeSetting.labelName"
						v-bind:curSelectedIndex = "cornerTypeSetting.curSelectedIndex"
						v-bind:options = "cornerTypeSetting.options"
						v-bind:selectHandler = "cornerTypeSetting.selectHandler"
					/>
				</tr>
				<tr
					v-for = "(oneSetting, index) in cornerLevelSettings"
					:key = "oneSetting.labelName"
					v-bind = "oneSetting"
				>
					<BaseRowHead
						v-bind:labelName = "oneSetting.labelName"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseInputCell
						:key = "curAppIndex + 'corner-feature-setting-' + index"
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
	name: "CornerLevelForm",
	props: {
		labelWdith: Number,
		appCellWidth: Number,
		appFormWidth: Number,
		curAppIndex: Number,
		language: Number
	},
	components: {
		BaseRowHead,
		BaseDropdownLongOptionsCell,
		BaseInputCell
	},

	data: function() {

		return {
			cornerTypeLable: (this.language === 1) ? "Corner Type" : "转角类型",
			cornerTypeOptions: [
				{
					value: 1,
					label: (this.language === 1) ? "Bevel" : "折线",
				},
				{
					value: 2,
					label: (this.language === 1) ? "Curve" : "圆角",
				},
				{
					value: 3,
					label: (this.language === 1) ? "Channel" : "圆角渠化",
				},
			],
			cornerFeatures: this.getCornerFeaturesByAppIndex(this.curAppIndex)
		};
	},
	watch: {
		curAppIndex: function(newAppIndex, oldAppIndex) {
			this.cornerFeatures = this.getCornerFeaturesByAppIndex(newAppIndex);
		}
	},
	computed: {
		cornerTypeSetting: function() {
			const cornerTypeSetting = {
				labelName: "cornerTypeLable",
				curSelectedIndex: this.cornerFeatures.cornerType - 1,
				options: this.cornerTypeOptions,
				selectHandler: this.updateCornerType
			};

			return cornerTypeSetting;
		},
		cornerLevelSettings: function() {
			const curCornerType = this.cornerFeatures.cornerType;

			const cornerLevelSettings = [
				{
					labelName: (this.language === 1) ? "Corner Radius" : "转角半径",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateCornerRadius,
					inputValue: JSON.stringify(this.cornerFeatures.cornerRadius),
					ifDisabled: false
				},
				{
					labelName: (this.language === 1) ? "Channel Width" : "渠化道宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateCornerChannelWidth,
					inputValue: JSON.stringify(this.cornerFeatures.channelWidth),
					ifDisabled: (curCornerType === 3) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Corner Entry Width" : "渠化入口宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateChannelEntryWidth,
					inputValue: JSON.stringify(this.cornerFeatures.cornerInboundWidth),
					ifDisabled: (curCornerType === 3) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Corner Exit Width" : "渠化出口宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateChannelExitWidth,
					inputValue: JSON.stringify(this.cornerFeatures.cornerOutboundWidth),
					ifDisabled: (curCornerType === 3) ? false : true
				},
				/*
				{
					labelName: "Crosswalk Width",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateCrosswalkWidth,
					inputValue: JSON.stringify(curCorner.cornerCrosswalkWidth)
				},
				*/
			];

			return cornerLevelSettings;
		},
	},
	mounted: function() {
		const updateCornerLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateCornerLevelGeo;
		this.updateCornerLevelGeo = updateCornerLevelGeo;
	},

	methods: {
		getCornerFeaturesByAppIndex: function(appIndex) {
			const getCornerLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getCornerLevelGeo;
			const cornerFeatures = getCornerLevelGeo.getCornerFeaturesByAppIndex(appIndex, this.language);
			return cornerFeatures;
		},
		updateCornerType: function(nextCornerType) {
			//nextCornerType++;
			//if update from type 1 or 2 to type 3, default change is to first also
			//update channel entry and exit width to 3.
			//Similarly, if update from type 3 to type 1 or 2, default change is to first
			//update channel entry and exit width to 3.
			const ifRedraw = true;
			this.updateCornerLevelGeo.updateCornerType(
				this.curAppIndex,
				nextCornerType,
				ifRedraw,
				this.language
			);

			//force corner features refresh to enable/disable feature settings if necessary:
			this.cornerFeatures = this.getCornerFeaturesByAppIndex(this.curAppIndex);
		},
		updateCornerRadius: function(enterEvent) {
			const nextCornerRadius = Number(enterEvent.target.value);
			const ifRedraw = true;
			this.updateCornerLevelGeo.updateCornerRadius(
				this.curAppIndex,
				nextCornerRadius,
				ifRedraw,
				this.language
			);
		},
		updateCornerChannelWidth: function(enterEvent) {
			const nextCornerChannelWidth = Number(enterEvent.target.value);
			const ifRedraw = true;
			this.updateCornerLevelGeo.updateCornerChannelWidth(
				this.curAppIndex,
				nextCornerChannelWidth,
				ifRedraw,
				this.language
			);
		},
		updateChannelEntryWidth: function(enterEvent) {
			const nextCornerIbWidth = Number(enterEvent.target.value);
			const ifRedraw = true;
			this.updateCornerLevelGeo.updateCornerIbWidth(
				this.curAppIndex,
				nextCornerIbWidth,
				ifRedraw,
				this.language
			);
		},
		updateChannelExitWidth: function(enterEvent) {
			const nextCornerObWidth = Number(enterEvent.target.value);
			const ifRedraw = true;
			this.updateCornerLevelGeo.updateCornerObWidth(
				this.curAppIndex,
				nextCornerObWidth,
				ifRedraw,
				this.language
			);
		}
	}


};
</script>

<style scoped>

</style>