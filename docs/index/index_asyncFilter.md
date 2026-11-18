# index.asyncFilter

- **Type:** function
- **Language:** typescript
- **File:** `\src\utils\index.ts` (lines 11-21)
- **Role:** internal
- **Stability:** unknown

## Signature

```
async function asyncFilter<T>(
  arr: T[],
  callback: (item: T) => Promise<boolean> | boolean
) {
  const fail = Symbol();
  return (
    await Promise.all(
      arr.map(async (item) => ((await callback(item)) ? item : fail))
    )
  ).filter((i) => i !== fail);
}
```

## Docstring

_No docstring provided._

## Source

```
export async function asyncFilter<T>(
  arr: T[],
  callback: (item: T) => Promise<boolean> | boolean
) {
  const fail = Symbol();
  return (
    await Promise.all(
      arr.map(async (item) => ((await callback(item)) ? item : fail))
    )
  ).filter((i) => i !== fail);
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
