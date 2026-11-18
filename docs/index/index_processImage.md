# index.processImage

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\ColorBlindnessSimulator\index.tsx` (lines 26-66)
- **Role:** internal
- **Stability:** unknown

## Signature

```
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
```

## Docstring

_No docstring provided._

## Source

```
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
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
