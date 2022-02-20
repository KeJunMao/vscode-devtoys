<template>
  <vscode-button @click="handleOnClick" :appearance="appearance" :disabled="disabled">
    <slot></slot>
  </vscode-button>
</template>

<script setup lang="ts">
import { vsCodeButton, provideVSCodeDesignSystem } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeButton());

const props = defineProps<{
  appearance?: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (event: "click", value: any): void;
}>();

function handleOnClick(event: any) {
  emit("click", event);
}
</script>
<style></style>
