<script setup lang="ts">
import { watch, onMounted, ref } from "vue";
import VsCodeButtonVue from "../common/VsCodeButton.vue";
import VsCodeTextFieldVue from "../common/VsCodeTextField.vue";
const now = ref(new Date());
const timestamp = ref(now.value.getTime());
const datetime = ref(now.value.toISOString().replace(/\..+/, ""));

const timer = ref<ReturnType<typeof setInterval>>();
const handleToggleTimer = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = undefined;
  } else {
    timer.value = setInterval(() => (now.value = new Date()), 1000);
  }
};
const handleDatetimeInput = ({ target }) => {
  const { control } = target;
  timestamp.value = control.valueAsNumber;
};

const handleTimestampInput = ({ target }) => {
  const { control } = target;
  control.style.background = "";
  try {
    datetime.value = new Date(Number(target.value))
      .toISOString()
      .replace(/\..+/, "");
    if (/^[-+]/.test(datetime.value)) {
      throw new RangeError("Invalid time value")
    }
  } catch (e) {
    tsvscode.postMessage({
      type: "onError",
      value: "Invalid timestamp: " + e,
    });
    control.style.background = "var(--vscode-inputValidation-errorBackground)";
  }
};
onMounted(() => {
  handleToggleTimer();
});
</script>

<template>
  <h1>{{$t('tool.timestamp.title')}}</h1>
  <VsCodeTextFieldVue
    style="width: 100%"
    @input="handleTimestampInput"
    v-model="timestamp"
    type="number"
  >
    {{$t('tool.timestamp.timestamp.textField.label')}}
  </VsCodeTextFieldVue>
  <VsCodeTextFieldVue
    style="width: 100%"
    @input="handleDatetimeInput"
    v-model="datetime"
    type="datetime-local"
  >
    {{$t('tool.timestamp.dateTime.textField.label')}}
  </VsCodeTextFieldVue>
  <VsCodeTextFieldVue style="width: 100%" readonly :value="now.getTime()">
    {{$t('tool.timestamp.now.textField.label')}}
  </VsCodeTextFieldVue>

  <VsCodeButtonVue @click="handleToggleTimer">
    {{ timer ? $t('tool.timestamp.stop.button.label') : $t('tool.timestamp.start.button.label') }}
  </VsCodeButtonVue>
</template>

<style></style>
