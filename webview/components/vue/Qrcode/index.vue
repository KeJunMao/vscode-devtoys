<script setup lang="ts">
import QRCode from "qrcode";
import { QRCodeErrorCorrectionLevel } from "qrcode";
import VsCodeRadioGroup from "../common/VsCodeRadioGroup.vue";
import VsCodeRadio from "../common/VsCodeRadio.vue";
import VsCodeTextArea from "../common/VsCodeTextArea.vue";
import VsCodeTextField from "../common/VsCodeTextField.vue";
import VsCodeButton from "../common/VsCodeButton.vue";
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

enum RenderType {
  img = "img",
  svg = "svg",
  canvas = "canvas",
}

const renderTypeList: {
  name: string;
  type: RenderType;
}[] = [
  {
    name: i18n.t("tool.qrcode.renderTypeRadio.img.label"),
    type: RenderType.img,
  },
  {
    name: i18n.t("tool.qrcode.renderTypeRadio.svg.label"),
    type: RenderType.svg,
  },
  {
    name: i18n.t("tool.qrcode.renderTypeRadio.canvas.label"),
    type: RenderType.canvas,
  },
];

const errorCorrectionLevelList = [
  {
    name: "Low",
    value: "low",
  },
  {
    name: "Medium",
    value: "medium",
  },
  {
    name: "Quartile",
    value: "quartile",
  },
  {
    name: "High",
    value: "high",
  },
];

const sourceText = ref("");
const imageSrc = ref("");
const svgCode = ref("");
const cnavasEl = ref();
const renderType = ref(renderTypeList[0].type);

const version = ref(1);
const errorCorrectionLevel = ref<QRCodeErrorCorrectionLevel>("medium");

watchEffect(() => {
  if (Number(version.value) < 0 || Number(version.value) > 40) {
    tsvscode.postMessage({
      type: "onError",
      value: i18n.t("tool.qrcode.versionValueMinMax.error.message"),
    });
    return;
  }
  if (!sourceText.value) {
    return;
  }
  if (!errorCorrectionLevel.value) {
    return;
  }
  if (!renderType.value) return;
  generateQR(sourceText.value);
});

async function generateQR(value: string) {
  if (!value) return;

  try {
    imageSrc.value = await QRCode.toDataURL(value, {
      version: version.value,
      errorCorrectionLevel: errorCorrectionLevel.value,
    });
    svgCode.value = await QRCode.toString(value, {
      version: version.value,
      errorCorrectionLevel: errorCorrectionLevel.value,
    });
    if (cnavasEl.value) {
      await QRCode.toCanvas(cnavasEl.value, value, {
        version: version.value,
        errorCorrectionLevel: errorCorrectionLevel.value,
      });
    }
  } catch (err: any) {
    tsvscode.postMessage({
      type: "onError",
      value: err.message,
    });
  }
}

function downloadByUrl(url: string, name: string) {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", name);
  downloadLink.setAttribute("href", url);
  downloadLink.click();
}

function handleSave() {
  switch (renderType.value) {
    case RenderType.img:
      downloadByUrl(imageSrc.value, "qrcode.png");
      break;
    case RenderType.svg:
      downloadByUrl(
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgCode.value),
        "qrcode.svg"
      );
      break;
    case RenderType.canvas:
      const dataUrl = cnavasEl.value.toDataURL("image/png");
      const url = dataUrl.replace(
        /^data:image\/png/,
        "data:application/octet-stream"
      );
      downloadByUrl(url, "qrcode.png");
      break;
  }
}
</script>
<template>
  <h1>{{ $t("tool.qrcode.title") }}</h1>
  <VsCodeRadioGroup v-model="renderType">
    <label slot="label">{{
      $t("tool.qrcode.renderTypeRadioGroup.label")
    }}</label>
    <VsCodeRadio
      v-for="type in renderTypeList"
      :value="type.type"
      :key="type.name"
      >{{ type.name }}</VsCodeRadio
    >
  </VsCodeRadioGroup>

  <VsCodeTextField v-model.number="version" type="number">
    {{ $t("tool.qrcode.versionTextField.label") }}
  </VsCodeTextField>
  <VsCodeRadioGroup v-model="errorCorrectionLevel">
    <label slot="label">{{
      $t("tool.qrcode.errorCorrectionLevelRadioGroup.label")
    }}</label>
    <VsCodeRadio
      v-for="(item, index) in errorCorrectionLevelList"
      :key="index"
      :value="item.value"
    >
      {{ item.name }}
    </VsCodeRadio>
  </VsCodeRadioGroup>

  <vs-code-text-area style="width: 100%" v-model="sourceText">{{
    $t("tool.qrcode.sourceTextArea.label")
  }}</vs-code-text-area>

  <vs-code-button v-if="sourceText" @click="handleSave">{{
    $t("tool.qrcode.saveButton.label")
  }}</vs-code-button>
  <div class="result-wapper" v-if="sourceText">
    <img v-if="renderType === RenderType.img" :src="imageSrc" alt="qrcode" />
    <div
      class="result-svg"
      v-else-if="renderType === RenderType.svg"
      v-html="svgCode"
    ></div>
    <canvas v-show="renderType === RenderType.canvas" ref="cnavasEl"></canvas>
  </div>
</template>

<style>
.result-wapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.result-svg {
  width: 100%;
}
</style>
