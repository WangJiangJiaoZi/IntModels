<template>
	<div id="ob-div-form">
		<table
			width="98%"
		>
			<tbody>
				<tr>
					<BaseRowHead
						v-bind:labelName = "obDivTypeLable"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseDropdownLongOptionsCell
						v-bind:labelName = "obDivTypeLable"
						v-bind:curSelectedIndex = "selectedDivTypeIndex"
						v-bind:options = "typeOptions"
						v-bind:selectHandler = "updateobDivType"
					/>
				</tr>
				<tr
					v-for = "(oneSetting, index) in obDivSettings"
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
	name: "ObDivForm",
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
			obDivTypeLable: (this.language === 1) ? "OUTBD Divider Type" : "出口方向隔离带类型",
			obDivType: this.getObDivType(),
			typeOptions: [
				{
					value: 0,
					label: (this.language === 1) ? "None" : "无",
				},
				{
					value: 1,
					label: (this.language === 1) ? "Single Line" : "单实线",
				},
				{
					value: 2,
					label: (this.language === 1) ? "Green Belt" : "绿化带",
				},
			],
		};
	},
	computed: {
		selectedDivTypeIndex: function() {
			let selectedDivTypeIndex;
			switch (this.obDivType) {
				case 2:
					selectedDivTypeIndex = 1;
					break;
				case 8:
					selectedDivTypeIndex = 2;
					break;
				default:
					selectedDivTypeIndex = 0;
			}

			return selectedDivTypeIndex;
		},
		obDivSettings: function() {
			//get inbound divider features:
			//1 for "inbound" / 2 for "outbound" / 3 for "center":
			const obDivFeatures = this.getDivFeaturesByBound(2);
			const obDivColor = obDivFeatures.divColor;
			const obDivOffset = obDivFeatures.divOffset;
			const obDivWidth = obDivFeatures.divWidth;
			const obDivCapRadius = obDivFeatures.divCapRadius;

			const obDivSettings = [
				{
					labelName: (this.language === 1) ? "Divider Color" : "隔离带颜色",
					cellPlaceHolder: "hex color code",
					cellType: "text",
					enterHandler: this.updateDivColor,
					inputValue: obDivColor,
					ifDisabled: (this.obDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Offset From Stopbar" : "距停止线距离",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivOffset,
					inputValue: JSON.stringify(obDivOffset).replace(/['"]+/g, ''),
					ifDisabled: (this.obDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Divider Width" : "隔离带宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivWidth,
					inputValue: JSON.stringify(obDivWidth).replace(/['"]+/g, ''),
					ifDisabled: (this.obDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Cap Radius" : "拐角半径",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivCapRadius,
					inputValue: JSON.stringify(obDivCapRadius).replace(/['"]+/g, ''),
					ifDisabled: (this.obDivType) ? false : true
				},

			];


			return obDivSettings;
		},
	},
	mounted: function() {
		const updateDivGroupLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateDivGroupLevelGeo;
		this.updateDivGroupLevelGeo = updateDivGroupLevelGeo;

	},
	beforeUpdate: function() {
		this.obDivType = this.getObDivType();
	},

	methods: {
		getObDivType: function() {
			let obDivType = null;
			const divBound = 2;  //2 for inbound
			const obDiv = this.getDivByBound(divBound);
			if (obDiv) {
				obDivType = obDiv.type;
			}

			return obDivType;
		},
		updateobDivType: function(selectedIndex) {
			//const selectedIndex = selectEvent.target.selectedIndex;
			//if select none type:
			if (selectedIndex === 0) {
				this.removeIbDiv();
				this.obDivType = null;
			}
			//else if both current type and the select one are solid
			else if (this.obDivType) {
				const nextDivType = this.getObDivTypeFromIndex(selectedIndex);
				this.updateDivGeo("type", nextDivType);
				this.obDivType = nextDivType;
			}
			//else if the current one is none:
			else {
				const nextDivType = this.getObDivTypeFromIndex(selectedIndex);
				this.addIbDiv(nextDivType);
				this.obDivType = nextDivType;
			}
		},
		getObDivTypeFromIndex: function(selectedIndex) {
			let obDivType;
			switch (selectedIndex) {
				case 1:
					obDivType = 2;
					break;
				case 2:
					obDivType = 8;
					break;
				default:
					obDivType = null;
			}
			return obDivType;
		},
		addIbDiv: function(nextDivType) {
			const nextDivBound = 2; //2 for outbound
			const ifReDraw = true;
			this.updateDivGroupLevelGeo.addDiv(
				this.curAppIndex,
				nextDivType,
				nextDivBound,
				ifReDraw,
				this.language
			);
		},
		removeIbDiv: function() {
			const nextDivBound = 2; //2 for outbound
			const ifReDraw = true;
			this.updateDivGroupLevelGeo.removeDiv(
				this.curAppIndex,
				nextDivBound,
				ifReDraw,
				this.language
			);
		},
		updateDivGeo: function(nextFeatureName, nextFeatureValue) {

			console.log("hello")

			const nextDivBound = 2;
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
		}



	}


};
</script>

<style scoped>

</style>