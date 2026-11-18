# index.formatUA

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\react\UserAgent\index.tsx` (lines 13-44)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(result: UAParser.IResult | undefined) => {
    if (!result) {
      return "";
    }
    let text = result.ua + "\n";
    if (result.browser.name) {
      text += `\n- ${t("tool.userAgent.result.browser")}: ${
        result.browser.name
      } ${result.browser.version}`;
    }
    if (result.device.type) {
      text += `\n- ${t("tool.userAgent.result.device")}: ${
        result.device.type
      } / ${result.device.vendor} / ${result.device.model}`;
    }
    if (result.os.name) {
      text += `\n- ${t("tool.userAgent.result.os")}: ${result.os.name} / ${
        result.os.version
      }`;
    }
    if (result.engine.name) {
      text += `\n- ${t("tool.userAgent.result.engine")}: ${
        result.engine.name
      } / ${result.engine.version}`;
    }
    if (result.cpu.architecture) {
      text += `\n- ${t("tool.userAgent.result.cpu")}: ${
        result.cpu.architecture
      }`;
    }
    return text;
  }
```

## Docstring

_No docstring provided._

## Source

```
  const formatUA = (result: UAParser.IResult | undefined) => {
    if (!result) {
      return "";
    }
    let text = result.ua + "\n";
    if (result.browser.name) {
      text += `\n- ${t("tool.userAgent.result.browser")}: ${
        result.browser.name
      } ${result.browser.version}`;
    }
    if (result.device.type) {
      text += `\n- ${t("tool.userAgent.result.device")}: ${
        result.device.type
      } / ${result.device.vendor} / ${result.device.model}`;
    }
    if (result.os.name) {
      text += `\n- ${t("tool.userAgent.result.os")}: ${result.os.name} / ${
        result.os.version
      }`;
    }
    if (result.engine.name) {
      text += `\n- ${t("tool.userAgent.result.engine")}: ${
        result.engine.name
      } / ${result.engine.version}`;
    }
    if (result.cpu.architecture) {
      text += `\n- ${t("tool.userAgent.result.cpu")}: ${
        result.cpu.architecture
      }`;
    }
    return text;
  };
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
