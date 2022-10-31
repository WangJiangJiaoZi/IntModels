

import FeatureFormsContainer from "./FeatureFormsContainer.vue";

const featureForms = (Vue, intModel, featureFormContainerId, mode, sideModeContainerWidth, fullModeContainerWidth, height, titleStrings) => {


	Vue.config.productionTip = false;
	Vue.prototype.$intModel = intModel;

	const propsForFeatureForm = {
		mode: mode,
		sideModeContainerWidth: sideModeContainerWidth,
		fullModeContainerWidth: fullModeContainerWidth,
		height: height,
		prototypeDummy: 0,  //if the int prototype changed, update featureForms
		titleStrings: titleStrings
	};


	/* eslint-disable no-new */
	return new Vue({
		el: "#" + featureFormContainerId,//"#int-forms",
		components: { FeatureFormsContainer },
		data: function() {
			return {
				propsForFeatureForm: propsForFeatureForm
			};
		},
		template: "<SignalFormsContainer v-bind='propsForFeatureForm' />",
		methods: {
			updatePrototypeDummy: function() {
				this.propsForFeatureForm.prototypeDummy = Math.random();
			}
		}
	});

};


export default featureForms;