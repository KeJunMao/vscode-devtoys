# shared.IToolData

- **Type:** interface
- **Language:** typescript
- **File:** `\src\shared.ts` (lines 32-41)
- **Role:** protocol
- **Stability:** unknown

## Signature

```
interface IToolData {
  label: string;
  tooltip: string;
  panel: PanelType | Category;
  iconPath?:
    | string
    | Uri
    | { light: string | Uri; dark: string | Uri }
    | ThemeIcon;
}
```

## Docstring

_No docstring provided._

## Source

```
export interface IToolData {
  label: string;
  tooltip: string;
  panel: PanelType | Category;
  iconPath?:
    | string
    | Uri
    | { light: string | Uri; dark: string | Uri }
    | ThemeIcon;
}
```

## Git History

- Commits: 8
- Authors: 3
- Bug fixes: 0
- Features: 7

## Callers

None

## Callees

None
