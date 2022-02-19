import { useTranslation } from "react-i18next";
import {
  VSCodeRadioGroup,
  VSCodeRadio,
  VSCodeCheckbox,
  VSCodeLink,
} from "@vscode/webview-ui-toolkit/react";
import "./index.css";
import { Deficiency, simulate } from "@bjornlu/colorblind";
import { useEffect, useRef, useState } from "react";

export default () => {
  const { t } = useTranslation();
  const dragArea = useRef<HTMLDivElement>(null);
  const srcCanvas = useRef<HTMLCanvasElement>(null);
  const distCanvas = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const deficiencyList: Deficiency[] = [
    "protanopia",
    "deuteranopia",
    "tritanopia",
    "achromatopsia",
  ];
  const [deficiency, setDeficiency] = useState<Deficiency>("protanopia");
  const [showSrcCanvas, setShowSrcCanvas] = useState(true);
  function processImage(deficiency: Deficiency) {
    const srcContext = srcCanvas?.current?.getContext("2d");
    const distContext = distCanvas?.current?.getContext("2d");
    if (!(srcContext && distContext)) {
      return;
    }

    const imageData = srcContext.getImageData(
      0,
      0,
      srcCanvas?.current?.width || 0,
      srcCanvas?.current?.height || 0
    );

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const simColor = simulate({ r, g, b }, deficiency);

      data[i] = simColor.r;
      data[i + 1] = simColor.g;
      data[i + 2] = simColor.b;
    }

    setCanvasSize(
      distCanvas?.current,
      srcCanvas?.current?.width || 0,
      srcCanvas?.current?.height || 0
    );
    distContext.clearRect(
      0,
      0,
      distCanvas?.current?.width || 0,
      distCanvas?.current?.height || 0
    );
    distContext.putImageData(imageData, 0, 0);
  }

  async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }

  function setCanvasSize(
    canvas: HTMLCanvasElement | null,
    width: number,
    height: number
  ) {
    if (canvas) {
      canvas.height = (height / width) * canvas.offsetWidth;
    }
  }

  async function canvasLoadImage(
    canvas: HTMLCanvasElement | null,
    src: string
  ) {
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const img = await loadImage(src);
        setCanvasSize(canvas, img.naturalWidth, img.naturalHeight);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  }

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      canvasLoadImage(srcCanvas?.current, url).then(() => {
        processImage(deficiency);
      });
    }
  }, [file, deficiency]);
  return (
    <div>
      <h1>{t("tool.colorBlindnessSimulator.title")}</h1>
      <div
        ref={dragArea}
        className="drag-area"
        onDrop={(event) => {
          event.preventDefault();
          if (dragArea.current) {
            dragArea.current.style.borderColor = "";
            const fileList = event.dataTransfer.files;
            setFile(fileList[0]);
          }
        }}
        onDragOver={(event) => {
          if (dragArea.current) {
            dragArea.current.style.borderColor = "var(--focus-border)";
          }
          event.preventDefault();
        }}
        onDragLeave={(event) => {
          if (dragArea.current) {
            dragArea.current.style.borderColor = "";
          }
          event.preventDefault();
        }}
      >
        <div className="drag-message">
          <span className="drag-message-title">
            {t("tool.colorBlindnessSimulator.dragAreaMessage.title")}
          </span>
          <label htmlFor="file" className="drag-message-label">
            <input
              className="drag-message-input"
              type="file"
              id="file"
              name="file"
              hidden={true}
              onChange={(event) => {
                const file = event?.target?.files?.[0];
                setFile(file);
              }}
            />
            <VSCodeLink>
              {t("tool.colorBlindnessSimulator.dragAreaMessage.link")}
            </VSCodeLink>
          </label>
        </div>
      </div>
      <VSCodeRadioGroup
        value={deficiency}
        onChange={({ target }) => {
          const { value } = target as HTMLInputElement;
          if (deficiencyList.includes(value as Deficiency)) {
            setDeficiency(value as Deficiency);
          }
        }}
      >
        <label slot="label">
          {t("tool.colorBlindnessSimulator.deficiency.title")}
        </label>
        {deficiencyList.map((deficiency) => {
          return (
            <VSCodeRadio key={deficiency} value={deficiency}>
              {t(`tool.colorBlindnessSimulator.deficiency.item.${deficiency}`)}
            </VSCodeRadio>
          );
        })}
        <VSCodeCheckbox
          checked={showSrcCanvas}
          onChange={({ target }) => {
            setShowSrcCanvas((target as HTMLInputElement)?.checked);
          }}
        >
          {t("tool.colorBlindnessSimulator.showOriginal.label")}
        </VSCodeCheckbox>
      </VSCodeRadioGroup>
      <div className="canvas-section">
        <div
          className={
            showSrcCanvas
              ? "canvas-section__block"
              : "canvas-section__block hidden"
          }
        >
          <div className="canvas-section__label">
            {t("tool.colorBlindnessSimulator.original.label")}
          </div>
          <canvas ref={srcCanvas} width="300"></canvas>
        </div>
        <div className="canvas-section__block">
          <div className="canvas-section__label">
            {t("tool.colorBlindnessSimulator.simulated.label")}
          </div>
          <canvas ref={distCanvas} width="300"></canvas>
        </div>
      </div>
    </div>
  );
};
