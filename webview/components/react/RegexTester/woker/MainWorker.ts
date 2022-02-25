export default () => {
  self.onmessage = (message) => {
    const {
      regex,
      text,
    }: {
      regex: RegExp;
      text: string;
    } = message.data;
    let matches;
    if (regex.flags.includes("g")) {
      matches = [...text.matchAll(regex)];
    } else {
      // if matches? add to array else empty []
      matches = text.match(regex) ? [text.match(regex)] : [];
    }
    postMessage(matches);
  };
};
