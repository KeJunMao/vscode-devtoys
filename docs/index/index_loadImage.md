# index.loadImage

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\ColorBlindnessSimulator\index.tsx` (lines 68-74)
- **Role:** internal
- **Stability:** unknown

## Signature

```
async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }
```

## Docstring

_No docstring provided._

## Source

```
  async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
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
