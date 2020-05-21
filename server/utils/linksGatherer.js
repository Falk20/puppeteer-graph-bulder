module.exports = () => {
  let links = Array.prototype.map.call(
    document.querySelectorAll("a[href]"),
    (link) => link.href
  );
  return links;
};
