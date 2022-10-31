<template>
	<div id="app-arrow-form">
		<table
			width="100%"
		>
			<tbody>
				<tr>
					<BaseRowHead
						v-bind:labelName = "''"
						v-bind:labelWidth = "labelWdith"
					/>
					<td
						v-for = "(oneArrow, index) in arrows"
						:key = "'arrow-key-' + index"
					>
						<div
							v-bind:style = "{width: appCellWidth}"
						>
							<img 
								v-bind:src = "oneArrow.imgSrc"
								class = "arrow"
								v-bind:style = "{transform: 'rotate(' + oneArrow.angle + 'deg)'}"
								v-on:click = "updateCurApp(index)"
							/>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import BaseRowHead from "../SharedBaseCells/BaseRowHead.vue";
import ApproachInactiveArrow from "../../Images/Icons/ApproachInactiveArrow.png";
import ApproachActiveArrow from "../../Images/Icons/ApproachActiveArrow.png";


export default {
	name: "AppArrowForm",
	props: {
		labelWdith: Number,
		appCellWidth: Number,
		appFormWidth: Number,
		curAppIndex: Number,
		angles: Array,
		updateCurApp: Function,
		language: Number
	},
	components: {
		BaseRowHead
	},

	computed: {
		arrows: function() {
			const arrows = this.getArrows();

			return arrows;
		},

	},
	methods: {
		getArrows: function() {
			const angles = this.angles;

			const arrows = [];
			angles.forEach((oneAngle, index) => {
				const ifCurApp = (index === this.curAppIndex) ? true : false;
				const imgSource = (ifCurApp) ? ApproachActiveArrow : ApproachInactiveArrow;
				const oneArrow = {
					angle: oneAngle,
					ifCurApp: ifCurApp,
					imgSrc: imgSource
				}
				arrows.push(oneArrow);
			});

			return arrows;
		},
	}

};
</script>

<style scoped>
table {
	margin-bottom: 0px;
}

td {
	padding: 0px;
}
.arrow {
	height: 30px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0px;
    margin-bottom: 0px;
}






</style>