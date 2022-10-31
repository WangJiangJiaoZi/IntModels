<template>
	<div v-bind:id = "this.formTitle">
		<div class = "form-title-label">
			{{formTitle}}
		</div>
		<!--<img 
			v-bind:src = "expandImageUrl"
			v-bind:class = "imgClass"
			v-on:click = "toggleHandler"
		/>-->
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
			v-on:click = "toggleHandler"
			v-bind:style="{'cursor': 'pointer'}"
		>
			<path 
				v-bind:d = "(this.expanded) ? toHideIconPath : toExpandIconPath"
				transform = "scale(0.03, 0.03)"
				fill = "#70AD47"
			/>
		</svg>
	</div>
	</div>
</template>




<script>

import expandImageUrl from "../../Images/Icons/DropdownArrow.png";
import icons from "../PredefinedShapes/Icons";


export default {
	name: "BaseFormTitle",
	props: {
		formTitle: String,
		expanded: Boolean,
		toggleHandler: Function,
	},
	data: function() {
		return {
			expandImageUrl: expandImageUrl,
			toExpandIconPath: icons.toExpandIconPath,
			toHideIconPath: icons.toHideIconPath
		};
	},
	computed: {
		imgClass: function() {
			const imgClass = this.expanded ? "expanded-arrow" : "to-expand-arrow";
			return imgClass;
		}
	},
};
</script>




<style scoped>
.form-title-label {
	float: left;
}
.to-expand-arrow {
	height: 12px;
	vertical-align: middle;
	padding-left: 6px;
}
.expanded-arrow {
	height: 12px;
	vertical-align: middle;
	padding-right: 6px;
	transform: rotate(180deg);
}


svg {
	height: 40px;
	width: 40px;
	padding-left: 5px;
	padding-top: 3px;
}
</style>