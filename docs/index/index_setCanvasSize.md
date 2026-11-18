# index.setCanvasSize

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\ColorBlindnessSimulator\index.tsx` (lines 76-84)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function setCanvasSize(
    canvas: HTMLCanvasElement | null,
    width: number,
    height: number
  ) {
    if (canvas) {
      canvas.height = (height / width) * canvas.offsetWidth;
    }
  }
```

## Docstring

_No docstring provided._

## Source

```
  function setCanvasSize(
    canvas: HTMLCanvasElement | null,
    width: number,
    height: number
  ) {
    if (canvas) {
      canvas.height = (height / width) * canvas.offsetWidth;
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
