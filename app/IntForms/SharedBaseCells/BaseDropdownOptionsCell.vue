<template>
	<td>
		<select
			class = "custom-select"
			v-bind:id = "labelName + '-cell-id'"
			v-bind:style = "{width: '102.04%'}"
			v-on:change = "selectHandler"
			v-bind:disabled = "ifDisabled"
		>
			<option 
				v-for = "(oneOpt, index) in options"
				v-bind:value = "oneOpt.optValue"
				v-bind:selected = "selected[index]"
			>
				{{oneOpt.optName}}
			</option>
		</select>
	</td>
</template>

<script>

export default {
	name: "BaseDropdownOptionsCell",
	props: {
		labelName: String,
		curSelectedIndex: Number,
		options: Array,
		selectHandler: Function,
		ifDisabled: {
			type: Boolean,
			required: false,
			default: false
		}
	},

	computed: {
		selected: function() {
			const selected = [];
			for (let i = 0; i < this.options.length; i++) {
				selected.push(false);
			}
			selected[this.curSelectedIndex] = true;
			return selected;
		}
	},

};
</script>

<style scoped>
td {
	padding: 0px;
}
select {
    height: 20px;
    border: 1px solid #A7A7A7;
    /*border-radius: 0.0rem;*/
    margin: 3px;
    font-size: 15px;
    padding-top: 0px;
    padding-bottom: 0px;
    color: #333;
    line-height: 18px;
    vertical-align: middle;
}



.custom-select {
  display: inline-block;
  width: 100%;
  height: $custom-select-height;
  padding: $custom-select-padding-y ($custom-select-padding-x + $custom-select-indicator-padding) $custom-select-padding-y $custom-select-padding-x;
  line-height: $custom-select-line-height;
  color: $custom-select-color;
  vertical-align: middle;
  background: $custom-select-background;
  background-color: $custom-select-bg;
  border: $custom-select-border-width solid $custom-select-border-color;
  @if $enable-rounded {
    border-radius: $custom-select-border-radius;
  } @else {
    border-radius: 0;
  }
  @include box-shadow($custom-select-box-shadow);
  appearance: none;

  &:focus {
    border-color: $custom-select-focus-border-color;
    outline: 0;
    @if $enable-shadows {
      box-shadow: $custom-select-box-shadow, $custom-select-focus-box-shadow;
    } @else {
      box-shadow: $custom-select-focus-box-shadow;
    }

    &::-ms-value {
      color: $input-color;
      background-color: $input-bg;
    }
  }

  &[multiple],
  &[size]:not([size="1"]) {
    height: auto;
    padding-right: $custom-select-padding-x;
    background-image: none;
  }

  &:disabled {
    color: $custom-select-disabled-color;
    background-color: $custom-select-disabled-bg;
  }

  &::-ms-expand {
    opacity: 0;
  }
}

</style>