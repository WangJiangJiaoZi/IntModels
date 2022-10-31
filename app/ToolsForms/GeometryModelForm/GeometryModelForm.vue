<template>
	<div id="geometry-model-form"
	>
		<table>
			<tr>
				<td>
					<div class="model-cell-box"
						v-bind:style="{'width': width + 'px', 'height': height + 'px'}"
						v-on:click="useModel(0)"
					>
						<img
							v-bind:src = "crossIntImgUrl"
							v-bind:style="{
								'height': height * 0.9 + 'px',
								'width': height * 0.9 + 'px',
								'padding-left': imgPadding + 'px',
								'padding-top': height * 0.05 + 'px'
							}"
						>
						</img>
					</div>
				</td>
				<td>
					<div class="model-cell-box"
						v-bind:style="{'width': width + 'px', 'height': height + 'px'}"
						v-on:click="useModel(1)"
					>
						<img
							v-bind:src = "tIntImgUrl"
							v-bind:style="{
								'height': height * 0.9 + 'px',
								'width': height * 0.9 + 'px',
								'padding-left': imgPadding + 'px',
								'padding-top': height * 0.05 + 'px'
							}"
						>
						</img>
					</div>
				</td>
				<td>
					<div class="model-cell-box"
						v-bind:style="{'width': width + 'px', 'height': height + 'px'}"
						v-on:click="useModel(2)"
					>
						<img
							v-bind:src = "starIntImgUrl"
							v-bind:style="{
								'height': height * 0.9 + 'px',
								'width': height * 0.9 + 'px',
								'padding-left': imgPadding + 'px',
								'padding-top': height * 0.05 + 'px'
							}"
						>
						</img>
					</div>
				</td>
				<td>
					<div class="model-cell-box"
						v-bind:style="{'width': width + 'px', 'height': height + 'px'}"
						v-on:click="exportGeo"
					>
						<img
							v-bind:src = "exportGeoImgUrl"
							v-bind:style="{
								'height': height * 0.9 + 'px',
								'width': height * 0.9 + 'px',
								'padding-left': imgPadding + 'px',
								'padding-top': height * 0.05 + 'px'
							}"
						>
						</img>
					</div>
				</td>
				<td>
					<div class="model-cell-box"
						v-bind:style="{'width': width + 'px', 'height': height + 'px'}"
						v-on:click="toggleDimension"
					>
						<img
							v-bind:src = "dimensionImgUrl"
							v-bind:style="{
								'height': height * 0.9 + 'px',
								'width': height * 0.9 + 'px',
								'padding-left': imgPadding + 'px',
								'padding-top': height * 0.05 + 'px'
							}"
						>
						</img>
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import crossIntImgUrl from "../../Images/GeoModels/4Legs.png";
import tIntImgUrl from "../../Images/GeoModels/3Legs.png";
import starIntImgUrl from "../../Images/GeoModels/5Legs.png";
import exportGeoImgUrl from "../../Images/GeoModels/Export.png";
import dimensionImgUrl from "../../Images/GeoModels/Dimension.png";

import crossIntModel from "./ModelsGeo/CrossIntModel";
import tIntModel from "./ModelsGeo/TIntModel";
import starIntModel from "./ModelsGeo/StarIntModel";


export default {
	name: "GeometryModelForm",

	props: {
		intForm: Object,
		canvasContainerId: String,
		canvasSize: Number,
		prototypeDummy: Number,
		toggleInfoBox: Function,
		language: Number
	},
	components: {
	},
	data: function() {
		return {
			width: 100,  //pixel
			height: 50,  //pixel
			crossIntImgUrl: crossIntImgUrl,
			tIntImgUrl: tIntImgUrl,
			starIntImgUrl: starIntImgUrl,
			exportGeoImgUrl: exportGeoImgUrl,
			dimensionImgUrl: dimensionImgUrl,
			imgPadding: (100 - 50 * 0.9) / 2,
		};
	},
	computed: {

	},
	methods: {
		useModel: function(modelIndex) {
			let modelGeo;
			switch(modelIndex) {
				case 0:
					modelGeo = crossIntModel;
					break;
				case 1:
					modelGeo = tIntModel;
					break;
				default:
					modelGeo = starIntModel;
			}

			const intModelGeoController = this.$intModel.intModelControllers.intModelGeoController;
			intModelGeoController.importExportGeo.importGeoFromJSON(JSON.stringify(modelGeo));
			const dimension = 2;
			intModelGeoController.modelGeo.modelIntGeo(this.canvasSize);
			intModelGeoController.drawGeo.redrawIntGeo();

			this.intForm.updatePrototypeDummy();
		},
		exportGeo: function() {
			const intModelGeoController = this.$intModel.intModelControllers.intModelGeoController;
			const geoJSON = intModelGeoController.importExportGeo.exportGeoToJSON();
			this.toggleInfoBox(JSON.stringify(geoJSON));
		},
		toggleDimension: function() {
			const intModelGeoController = this.$intModel.intModelControllers.intModelGeoController;
			intModelGeoController.drawGeo.drawToggledDimensionIntGeo();	
		}
	}

};
</script>

<style scoped>
.model-cell-box {
    border: 1px solid #A7A7A7;
    border-radius: .5rem;
    border-spacing: 0px;
    cursor: pointer;
}

</style>