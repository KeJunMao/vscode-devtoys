export default class {
  constructor(worker: () => void) {
    const code = worker.toString();
    const blob = new Blob([`(${code})()`], { type: "application/javascript" });
    return new Worker(URL.createObjectURL(blob));
  }
}
