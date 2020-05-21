module.exports = class CheckedNode {
  constructor(url, isInternal = true) {
    this.id = url;
    let urlObj = new URL(url);
    let label = isInternal
      ? urlObj.pathname == "/"
        ? urlObj.hostname
        : urlObj.pathname
      : urlObj.hostname;
    this.label = label;
    this.title = url;
    this.color = isInternal ? 'blue' : 'green';
  }
}