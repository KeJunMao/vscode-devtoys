<script context="module" lang="ts">
  let monaco_promise: Promise<any>;
  let _monaco: typeof import("monaco-editor");
  monaco_promise = import("./monaco");
  monaco_promise.then((mod) => {
    _monaco = mod.default;
  });
</script>

<script lang="ts">
  import { onMount } from "svelte";
  let monaco;
  let container: HTMLDivElement;
  let editor;
  onMount(() => {
    if (_monaco) {
      monaco = _monaco;
      editor = monaco.editor.create(container);
    } else {
      monaco_promise.then(async (mod) => {
        console.log(container);
        monaco = mod.default;
        editor = monaco.editor.create(container, {
          value: "",
          language: "json",
          theme: "vs-dark",
        });
      });
    }
    return () => {
      const destroyed = true;
    };
  });
</script>

<div
  class="monaco-container"
  bind:this={container}
  style="height: 200px;text-align: left"
/>
