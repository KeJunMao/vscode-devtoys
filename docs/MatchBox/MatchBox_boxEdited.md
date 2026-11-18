# MatchBox.boxEdited

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\RegexTester\components\MatchBox.tsx` (lines 92-124)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
    let text = getMatchTextOnly();
    let matches = [];
    let timmer: number | undefined;
    if (!regex) {
      return;
    }
    if (worker) {
      worker.terminate();
      worker = undefined;
    }
    worker = new WokerBuilder(MainWorker) as Worker;
    return new Promise<void>((r, j) => {
      if (!worker) {
        return;
      }
      timmer = setTimeout(() => {
        worker?.terminate();
        worker = undefined;
        j();
      }, 300);
      worker.onmessage = (e) => {
        clearTimeout(timmer);
        matches = e.data;
        highlightHtml(matches);
        r();
      };
      worker?.postMessage({
        text,
        regex,
      });
    });
  }
```

## Docstring

_No docstring provided._

## Source

```
  const boxEdited = () => {
    let text = getMatchTextOnly();
    let matches = [];
    let timmer: number | undefined;
    if (!regex) {
      return;
    }
    if (worker) {
      worker.terminate();
      worker = undefined;
    }
    worker = new WokerBuilder(MainWorker) as Worker;
    return new Promise<void>((r, j) => {
      if (!worker) {
        return;
      }
      timmer = setTimeout(() => {
        worker?.terminate();
        worker = undefined;
        j();
      }, 300);
      worker.onmessage = (e) => {
        clearTimeout(timmer);
        matches = e.data;
        highlightHtml(matches);
        r();
      };
      worker?.postMessage({
        text,
        regex,
      });
    });
  };
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
