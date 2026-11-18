# public-key-download.httpGet

- **Type:** function
- **Language:** typescript
- **File:** `\webview\components\vue\Jwt\public-key-download.ts` (lines 3-25)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function httpGet(url: string, cache = true): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject({
            status: request.status,
            response: request.responseText,
          });
        }
      }
    };

    request.open("GET", url);
    if (!cache) {
      request.setRequestHeader("Cache-Control", "no-cache");
    }
    request.send();
  });
}
```

## Docstring

_No docstring provided._

## Source

```
export function httpGet(url: string, cache = true): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject({
            status: request.status,
            response: request.responseText,
          });
        }
      }
    };

    request.open("GET", url);
    if (!cache) {
      request.setRequestHeader("Cache-Control", "no-cache");
    }
    request.send();
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
