<template>
	<div id="int-level-form">
		<table
			width="98%"
		>
			<tbody>
				<tr
					v-for = "(oneSetting, index) in intLevelSettings"
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
						v-bind:baseCellWidth = "baseCellWidth"
					/>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import BaseFormTitle from "../SharedBaseCells/BaseFormTitle.vue";
import BaseRowHead from "../SharedBaseCells/BaseRowHead.vue";
import BaseInputCell from "../SharedBaseCells/BaseInputCell.vue";

export default {
	name: "IntLevelForm",
	props: {
		sideModeWidth: Number,
		mode: Number,
		labelWdith: Number,
		language: Number
	},
	components: {
		BaseFormTitle: BaseFormTitle,
		BaseRowHead: BaseRowHead,
		BaseInputCell: BaseInputCell
	},

	data: function() {
		return {
			baseCellWidth: this.sideModeWidth - this.labelWdith,
		};
	},
	beforeCreate: function() {
		const updateIntLevelGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo.updateIntLevelGeo;
		this.updateIntLevelGeo = updateIntLevelGeo;
	},
	computed: {
		intLevelSettings: function() {
			const intersection = this.$intModel.intersection;
			const getIntLevelGeo = this.$intModel.intModelControllers.intModelGeoController.getGeo.getIntLevelGeo;
			const intFeatures = getIntLevelGeo.getIntFeatures();

			const intLocation = intFeatures.location;

			const lat = intLocation.lat;
			const lng = intLocation.lng;
			const intLocationStr = lat + ", " + lng;


			const intLevelSettings = [
				{
					labelName: (this.language === 1) ? "Intersection Id" : "路口Id",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateIntId,
					inputValue: JSON.stringify(intFeatures.intId)
				},
				{
					labelName: (this.language === 1) ? "Int Location" : "路口坐标",
					cellPlaceHolder: "lat, lng",
					cellType: "text",
					enterHandler: this.updateIntLocation,
					inputValue: intLocationStr
				},
				{
					labelName: (this.language === 1) ? "Int Class" : "路口级别",
					cellPlaceHolder: "number",
					cellType: "text",
					enterHandler: this.updateIntClass,
					inputValue: JSON.stringify(intFeatures.class)
				},
				{
					labelName: (this.language === 1) ? "Road Color" : "道路颜色",
					cellPlaceHolder: "hex code",
					cellType: "text",
					enterHandler: this.updateIntRoadColor,
					inputValue: intFeatures.roadColor
				},
				{
					labelName: (this.language === 1) ? "Channel Color" : "渠化岛颜色",
					cellPlaceHolder: "hex color code",
					cellType: "text",
					enterHandler: this.updateIntCornerIslandColor,
					inputValue: intFeatures.cornerIslandColor
				},
				{
					labelName: (this.language === 1) ? "Crosswalk Color" : "人行道颜色",
					cellPlaceHolder: "hex color code",
					cellType: "text",
					enterHandler: this.updateIntCrosswalkColor,
					inputValue: intFeatures.crossWalkColor
				},
				{
					labelName: (this.language === 1) ? "Text Color" : "文字颜色",
					cellPlaceHolder: "hex color code",
					cellType: "text",
					enterHandler: this.updateIntTextColor,
					inputValue: intFeatures.textColor
				},
				{
					labelName: (this.language === 1) ? "Background Color" : "背景颜色",
					cellPlaceHolder: "hex color code",
					cellType: "text",
					enterHandler: this.updateIntBackgroundColor,
					inputValue: intFeatures.backgroundColor
				}
			];
			return intLevelSettings;
		}

	},

	methods: {
		updateIntId: function(enterEvent) {
			const inputValue = enterEvent.target.value;
			this.updateIntLevelGeo.updateIntId(Number(inputValue));
		},

		updateIntLocation: function(enterEvent) {
			const nextIntLocationArray = enterEvent.target.value.split(", ");
			const nextIntLocation = {
				lat: nextIntLocationArray[0],
				lng: nextIntLocationArray[1]
			};
			this.updateIntLevelGeo.updateIntLocation(nextIntLocation);
		},

		updateIntClass: function(enterEvent) {
			const nextIntClass = Number(enterEvent.target.value);
			this.updateIntLevelGeo.updateIntClass(nextIntClass);
		},

		updateIntRoadColor: function(enterEvent) {
			const nextRoadColor = enterEvent.target.value;
			const ifRedraw = true;
			this.updateIntLevelGeo.updateIntRoadColor(nextRoadColor, ifRedraw);
		},

		updateIntCornerIslandColor: function(enterEvent) {
			const nextCornerIslandColor = enterEvent.target.value;
			const ifRedraw = true;
			this.updateIntLevelGeo.updateIntCornerIslandColor(nextCornerIslandColor, ifRedraw);
		},

		updateIntCrosswalkColor: function(enterEvent) {
			const nextCrosswalkColor = enterEvent.target.value;
			const ifRedraw = true;
			this.updateIntLevelGeo.updateIntCrosswalkColor(nextCrosswalkColor, ifRedraw);
		},

		updateIntTextColor: function(enterEvent) {
			const updateIntTextColor = enterEvent.target.value;
			const ifRedraw = true;
			this.updateIntLevelGeo.updateIntTextColor(updateIntTextColor, ifRedraw);
		},

		updateIntBackgroundColor: function(enterEvent) {
			//int background color updating is acutally model level
			const nextBgColor = enterEvent.target.value;
			const ifRedraw = true;
			const updateGeo = this.$intModel.intModelControllers.intModelGeoController.updateGeo;
			updateGeo.updateModelLevelGeo.updateBackgroundColor(nextBgColor, ifRedraw);
		}
	}

};
</script>

<style scoped>

</style>