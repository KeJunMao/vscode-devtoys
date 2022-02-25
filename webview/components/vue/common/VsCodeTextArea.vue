<template>
  <vscode-text-area
    :value="modelValue || value"
    @input="handleOnInput"
    :rows="rows"
    :cols="cols"
    :placeholder="placeholder"
  >
    <slot></slot>
  </vscode-text-area>
</template>

<script setup lang="ts">
import { vsCodeTextArea, provideVSCodeDesignSystem } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeTextArea());

const props = defineProps<{
  modelValue?: string;
  value?: string;
  cols?: number;
  rows?: number;
  placeholder?: string;
}>();
const emit = defineEmits<{
  (event: "input", value: any): void;
  (event: "update:modelValue", modelValue: number): void;
}>();

function handleOnInput(event: any) {
  emit("input", event);
  emit("update:modelValue", event.target.value);
}
</script>
<style></style>
