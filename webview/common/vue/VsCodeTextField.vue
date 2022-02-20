<template>
  <vscode-text-field :value="modelValue || value" @input="handleOnInput" :type="type">
    <slot></slot>
  </vscode-text-field>
</template>

<script setup lang="ts">
import { vsCodeTextField, provideVSCodeDesignSystem } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeTextField());

const props = defineProps<{
  modelValue?: string | number;
  value?: string;
  type?: string;
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
