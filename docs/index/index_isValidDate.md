# index.isValidDate

- **Type:** function
- **Language:** typescript
- **File:** `\src\utils\index.ts` (lines 23-25)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function isValidDate(d: Date): boolean {
  return d instanceof Date && !isNaN(d.getTime());
}
```

## Docstring

_No docstring provided._

## Source

```
export function isValidDate(d: Date): boolean {
  return d instanceof Date && !isNaN(d.getTime());
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
