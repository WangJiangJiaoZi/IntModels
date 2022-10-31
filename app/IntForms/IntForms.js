

import IntFormsContainer from "./IntFormsContainer.vue";

const intForms = (Vue, intModel, intFormContainerId, mode, sideModeContainerWidth, fullModeContainerWidth, height, language) => {


	Vue.config.productionTip = false;
	Vue.prototype.$intModel = intModel;

	const propsForIntForm = {
		//intModel: intModel,
		mode: mode,
		sideModeContainerWidth: sideModeContainerWidth,
		fullModeContainerWidth: fullModeContainerWidth,
		height: height,
		prototypeDummy: 0,  //if the int prototype changed, update intForms
		language: language
	};


	/* eslint-disable no-new */
	return new Vue({
		el: "#" + intFormContainerId,//"#int-forms",
		components: { IntFormsContainer },
		data: function() {
			return {
				propsForIntForm: propsForIntForm
			};
		},
		template: "<IntFormsContainer v-bind='propsForIntForm' />",
		methods: {
			updatePrototypeDummy: function() {
				this.propsForIntForm.prototypeDummy = Math.random();
			}
		}
	});

};


export default intForms;
