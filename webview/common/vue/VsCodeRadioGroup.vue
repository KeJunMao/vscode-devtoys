<template>
  <vscode-radio-group :value="modelValue || value" @change="handleOnChange">
    <slot></slot>
  </vscode-radio-group>
</template>

<script setup lang="ts">
import { vsCodeRadioGroup, provideVSCodeDesignSystem } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeRadioGroup());

const props = defineProps<{
  modelValue?: string;
  value?: string;
}>();
const emit = defineEmits<{
  (event: "change", value: any): void;
  (event: "update:modelValue", modelValue: number): void;
}>();

function handleOnChange(event) {
  emit("change", event);
  emit("update:modelValue", event.target.value);
}
</script>
<style></style>
