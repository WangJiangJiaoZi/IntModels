

import GeometryModelForm from "./GeometryModelForm.vue";

const geometryModelFormConnector = ({
	Vue, intModel, intForm, toolFormContainerId, canvasContainerId, canvasSize, toggleInfoBox, language
}) => {


	Vue.config.productionTip = false;
	Vue.prototype.$intModel = intModel;

	const props = {
		//intModel: intModel,
		intForm: intForm,
		canvasContainerId: canvasContainerId,
		canvasSize: canvasSize,
		prototypeDummy: 0,  //if the int prototype changed, update intForms
		toggleInfoBox: toggleInfoBox,
		language: language
	};


	/* eslint-disable no-new */
	new Vue({
		el: "#" + toolFormContainerId,//"#int-forms",
		components: { GeometryModelForm },
		data: function() {
			return {
				props: props
			};
		},
		template: "<GeometryModelForm v-bind='props' />"
	});

};


export default geometryModelFormConnector;
