# index.canvasLoadImage

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\ColorBlindnessSimulator\index.tsx` (lines 86-99)
- **Role:** internal
- **Stability:** unknown

## Signature

```
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
```

## Docstring

_No docstring provided._

## Source

```
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
