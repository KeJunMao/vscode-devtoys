<template>
  <vscode-radio :value="modelValue || value" @change="handleOnChange">
    <slot></slot>
  </vscode-radio>
</template>

<script setup lang="ts">
import { vsCodeRadio, provideVSCodeDesignSystem } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeRadio());

const props = defineProps<{
  modelValue?: string;
  value?: string;
}>();
const emit = defineEmits<{
  (event: "change", value: any): void;
  (event: "update:modelValue", modelValue: number): void;
}>();

function handleOnChange(event: any) {
  emit("change", event);
  emit("update:modelValue", event.target.value);
}
</script>
<style></style>
