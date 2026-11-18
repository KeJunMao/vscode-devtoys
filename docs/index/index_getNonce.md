# index.getNonce

- **Type:** function
- **Language:** typescript
- **File:** `\src\utils\index.ts` (lines 1-9)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
```

## Docstring

_No docstring provided._

## Source

```
export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
```

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 1
- Features: 2

## Callers

None

## Callees

None
