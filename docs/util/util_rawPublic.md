# util.rawPublic

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\util.ts` (lines 19-35)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
  alg,
  oth,
  d,
  p,
  q,
  dp,
  dq,
  qi,
  use,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  key_ops,
  ext,
  ...jwk
}: {
  [key: string]: string;
}) => jwk
```

## Docstring

_No docstring provided._

## Source

```
const rawPublic = ({
  alg,
  oth,
  d,
  p,
  q,
  dp,
  dq,
  qi,
  use,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  key_ops,
  ext,
  ...jwk
}: {
  [key: string]: string;
}) => jwk;
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
