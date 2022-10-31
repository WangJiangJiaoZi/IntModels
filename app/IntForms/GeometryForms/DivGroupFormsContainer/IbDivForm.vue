<template>
	<div id="ib-div-form">
		<table
			width="98%"
		>
			<tbody>
				<tr>
					<BaseRowHead
						v-bind:labelName = "ibDivTypeLable"
						v-bind:labelWidth = "labelWdith"
					/>
					<BaseDropdownLongOptionsCell
						v-bind:labelName = "ibDivTypeLable"
						v-bind:curSelectedIndex = "selectedDivTypeIndex"
						v-bind:options = "typeOptions"
						v-bind:selectHandler = "updateIbDivType"
					/>
				</tr>
				<tr
					v-for = "(oneSetting, index) in ibDivSettings"
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
	name: "IbDivForm",
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
			ibDivTypeLable: (this.language === 1) ? "INBD Divider Type" : "进口方向隔离带类型",
			ibDivType: this.getIbDivType(),
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
			switch (this.ibDivType) {
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
		ibDivSettings: function() {
			//get inbound divider features:
			//1 for "inbound" / 2 for "outbound" / 3 for "center":
			const ibDivFeatures = this.getDivFeaturesByBound(1);
			const ibDivColor = ibDivFeatures.divColor;
			const ibDivOffset = ibDivFeatures.divOffset;
			const ibDivWidth = ibDivFeatures.divWidth;
			const ibDivCapRadius = ibDivFeatures.divCapRadius;

			const ibDivSettings = [
				{
					labelName: (this.language === 1) ? "Divider Color" : "隔离带颜色",
					cellPlaceHolder: "hex color code",
					cellType: "text",
					enterHandler: this.updateDivColor,
					inputValue: ibDivColor,
					ifDisabled: (this.ibDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Offset From Stopbar" : "距停止线距离",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivOffset,
					inputValue: JSON.stringify(ibDivOffset).replace(/['"]+/g, ''),
					ifDisabled: (this.ibDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Divider Width" : "隔离带宽度",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivWidth,
					inputValue: JSON.stringify(ibDivWidth).replace(/['"]+/g, ''),
					ifDisabled: (this.ibDivType) ? false : true
				},
				{
					labelName: (this.language === 1) ? "Cap Radius" : "拐角半径",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateDivCapRadius,
					inputValue: JSON.stringify(ibDivCapRadius).replace(/['"]+/g, ''),
					ifDisabled: (this.ibDivType) ? false : true
				},

			];


			return ibDivSettings;
		},
	},
	mounted: function() {
		const updateDivGroupLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateDivGroupLevelGeo;
		this.updateDivGroupLevelGeo = updateDivGroupLevelGeo;

	},
	beforeUpdate: function() {
		this.ibDivType = this.getIbDivType();
	},

	methods: {
		getIbDivType: function() {
			let ibDivType = null;
			const divBound = 1;  //1 for inbound
			const ibDiv = this.getDivByBound(1);
			if (ibDiv) {
				ibDivType = ibDiv.type;
			}

			return ibDivType;
		},
		updateIbDivType: function(selectedIndex) {
			//const selectedIndex = selectEvent.target.selectedIndex;
			//if select none type:
			if (selectedIndex === 0) {
				this.removeIbDiv();
				this.ibDivType = null;
			}
			//else if both current type and the select one are solid
			else if (this.ibDivType) {
				const nextDivType = this.getIbDivTypeFromIndex(selectedIndex);
				this.updateDivGeo("type", nextDivType);
				this.ibDivType = nextDivType;
			}
			//else if the current one is none:
			else {
				const nextDivType = this.getIbDivTypeFromIndex(selectedIndex);
				this.addIbDiv(nextDivType);
				this.ibDivType = nextDivType;
			}
		},
		getIbDivTypeFromIndex: function(selectedIndex) {
			let ibDivType;
			switch (selectedIndex) {
				case 1:
					ibDivType = 2;
					break;
				case 2:
					ibDivType = 8;
					break;
				default:
					ibDivType = null;
			}
			return ibDivType;
		},
		addIbDiv: function(nextDivType) {
			const nextDivBound = 1; //1 for inbound
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
			const nextDivBound = 1; //1 for inbound
			const ifReDraw = true;
			this.updateDivGroupLevelGeo.removeDiv(
				this.curAppIndex,
				nextDivBound,
				ifReDraw,
				this.language
			);
		},
		updateDivGeo: function(nextFeatureName, nextFeatureValue) {
			const nextDivBound = 1;
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