<template>
	<div id="center-div-form">
		<table
			width="98%"
		>
			<tbody>
				<tr>
					<BaseRowHead
						v-bind:labelName = "centerDivTypeLable"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseDropdownLongOptionsCell
						v-bind:labelName = "centerDivTypeLable"
						v-bind:curSelectedIndex = "selectedDivTypeIndex"
						v-bind:options = "typeOptions"
						v-bind:selectHandler = "updatecenterDivType"
					/>
				</tr>
				<tr
					v-for = "(oneSetting, index) in centerDivSettings"
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

import BaseRowHead from "../../SharedBaseCells/BaseRowHead.vue";
//import BaseDropdownOptionsCell from "../../SharedBaseCells/BaseDropdownOptionsCell.vue";
import BaseInputCell from "../../SharedBaseCells/BaseInputCell.vue";
import BaseDropdownLongOptionsCell from "../../SharedBaseCells/BaseDropdownLongOptionsCell.vue";

export default {
	name: "CenterDivForm",
	props: {
		labelWdith: Number,
		appCellWidth: Number,
		appFormWidth: Number,
		curAppIndex: Number,
		language: Number,
		getDivByBound: Function,
		getDivFeaturesByBound: Function
	},
	components: {
		BaseRowHead,
		BaseDropdownLongOptionsCell,
		BaseInputCell
	},

	data: function() {

		return {
			centerDivTypeLable: ((this.language === 1) ?
							"Center Divider Type" : "中央方向隔离带类型"),
			centerDivType: this.getCenterDivType(),
			typeOptions: [
				{
					value: 0,
					label: (this.language === 1) ? "None" : "无",
				},
				{
					value: 1,
					label: (this.language === 1) ? "Dash Line" : "虚线",
				},
				{
					value: 2,
					label: (this.language === 1) ? "Single Line" : "单实线",
				},
				{
					value: 3,
					label: (this.language === 1) ? "Doule Line" : "双实线",
				},
				{
					value: 4,
					label: (this.language === 1) ? "Green Belt" : "绿化带",
				},
			],
		};
	},
	computed: {
		selectedDivTypeIndex: function() {
			let selectedDivTypeIndex;
			switch (this.centerDivType) {
				case 1:
					selectedDivTypeIndex = 1;
					break;
				case 2:
					selectedDivTypeIndex = 2;
					break;
				case 3:
					selectedDivTypeIndex = 3;
					break;
				case 8:
					selectedDivTypeIndex = 4;
					break;
				default:
					selectedDivTypeIndex = 0;
			}

			return selectedDivTypeIndex;
		},
		centerDivSettings: function() {
			//get inbound divider features:
			//1 for "inbound" / 2 for "outbound" / 3 for "center":
			const centerDivFeatures = this.getDivFeaturesByBound(3);
			const centerDivColor = centerDivFeatures.divColor;
			const centerDivOffset = centerDivFeatures.divOffset;
			const centerDivWidth = centerDivFeatures.divWidth;
			const centerDivCapRadius = centerDivFeatures.divCapRadius;
			const centerDivStorageLen = centerDivFeatures.storageLen;
			const centerDivStorageWidth = centerDivFeatures.sotrageWidth;
			const centerDivStorageTaper = centerDivFeatures.storageSlipLen;

			const centerDivSettings = [
				{
					labelName: (this.language === 1) ? "Divider Color" : "隔离带颜色",
					cellPlaceHolder: "hex color code",
					cellType: "text",
					enterHandler: this.updateDivColor,
					inputValue: centerDivColor,
					ifDisabled: (this.centerDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Offset From Stopbar" : "距停止线距离",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivOffset,
					inputValue: JSON.stringify(centerDivOffset).replace(/['"]+/g, ''),
					ifDisabled: (this.centerDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Divider Width" : "隔离带宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivWidth,
					inputValue: JSON.stringify(centerDivWidth).replace(/['"]+/g, ''),
					ifDisabled: (this.centerDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Cap Radius" : "拐角半径",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivCapRadius,
					inputValue: JSON.stringify(centerDivCapRadius).replace(/['"]+/g, ''),
					ifDisabled: (this.centerDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Storage Len" : "展宽长度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivStorageLen,
					inputValue: JSON.stringify(centerDivStorageLen).replace(/['"]+/g, ''),
					ifDisabled: (this.centerDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Storage Width" : "展宽宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivStorageWidth,
					inputValue: JSON.stringify(centerDivStorageWidth).replace(/['"]+/g, ''),
					ifDisabled: (this.centerDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Taper Len" : "展宽过渡段长度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivStorageTaper,
					inputValue: JSON.stringify(centerDivStorageTaper).replace(/['"]+/g, ''),
					ifDisabled: (this.centerDivType) ? false : true
				},
			];


			return centerDivSettings;
		},
	},
	mounted: function() {
		const updateDivGroupLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateDivGroupLevelGeo;
		this.updateDivGroupLevelGeo = updateDivGroupLevelGeo;

	},
	beforeUpdate: function() {
		this.centerDivType = this.getCenterDivType();
	},

	methods: {
		getCenterDivType: function() {
			let centerDivType = null;
			const divBound = 3;  //1 for inbound
			const centerDiv = this.getDivByBound(3);
			if (centerDiv) {
				centerDivType = centerDiv.type;
			}

			return centerDivType;
		},
		updatecenterDivType: function(selectedIndex) {
			//const selectedIndex = selectEvent.target.selectedIndex;
			//if select none type:
			if (selectedIndex === 0) {
				this.removeCenterDiv();
				this.centerDivType = null;
			}
			//else if both current type and the select one are solid
			else if (this.centerDivType) {
				const nextDivType = this.getCenterDivTypeFromIndex(selectedIndex);
				this.updateDivGeo("type", nextDivType);
				this.centerDivType = nextDivType;
			}
			//else if the current one is none:
			else {
				const nextDivType = this.getCenterDivTypeFromIndex(selectedIndex);
				this.addCenterDiv(nextDivType);
				this.centerDivType = nextDivType;
			}
		},
		getCenterDivTypeFromIndex: function(selectedIndex) {
			let centerDivType;
			switch (selectedIndex) {
				case 1:
					centerDivType = 1;
					break;
				case 2:
					centerDivType = 2;
					break;
				case 3:
					centerDivType = 3;
					break;
				case 4:
					centerDivType = 8;
					break;
				default:
					centerDivType = null;
			}
			return centerDivType;
		},
		addCenterDiv: function(nextDivType) {
			const nextDivBound = 3; //1 for inbound
			const ifReDraw = true;
			this.updateDivGroupLevelGeo.addDiv(
				this.curAppIndex,
				nextDivType,
				nextDivBound,
				ifReDraw,
				this.language
			);
		},
		removeCenterDiv: function() {
			const nextDivBound = 3; //1 for inbound
			const ifReDraw = true;
			this.updateDivGroupLevelGeo.removeDiv(
				this.curAppIndex,
				nextDivBound,
				ifReDraw,
				this.language
			);
		},
		updateDivGeo: function(nextFeatureName, nextFeatureValue) {
			const nextDivBound = 3;
			this.updateDivGroupLevelGeo.updateDivGeo(
				this.curAppIndex,
				nextDivBound,
				nextFeatureName,
				nextFeatureValue,
				true,
				this.language
			);
		},
		updateDivColor: function(enterEvent) {
			const nextDivColor = enterEvent.target.value;
			this.updateDivGeo("color", nextDivColor);
		},
		updateDivOffset: function(enterEvent) {
			const nextDivOffset = Number(enterEvent.target.value);
			this.updateDivGeo("offset", nextDivOffset);
		},
		updateDivWidth: function(enterEvent) {
			const nextDivWidth = Number(enterEvent.target.value);
			this.updateDivGeo("startWidth", nextDivWidth);
		},
		updateDivCapRadius: function(enterEvent) {
			const nextDivCapRadius = Number(enterEvent.target.value);
			this.updateDivGeo("capRadius", nextDivCapRadius);
		},
		updateDivStorageLen: function(enterEvent) {
			const nextDivStorageLen = Number(enterEvent.target.value);
			this.updateDivGeo("storageLen", nextDivStorageLen);
		},
		updateDivStorageWidth: function(enterEvent) {
			const nextDivStorageWidth = Number(enterEvent.target.value);
			this.updateDivGeo("storageWidth", nextDivStorageWidth);
		},
		updateDivStorageTaper: function(enterEvent) {
			const nextDivStorageTaper = Number(enterEvent.target.value);
			this.updateDivGeo("storageSlipLen", nextDivStorageTaper);
		}



	}


};
</script>

<style scoped>

</style>