const { workerData, parentPort } = require("worker_threads");
const puppeteer = require("puppeteer");

console.log("i scraper");

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(workerData);

  const result = await page.evaluate(() => {
    let links = Array.prototype.map.call(
      document.querySelectorAll("a[href]"),
      (link) => link.href
    );
    return links;
  });

  browser.close();
  return result;
};

scrape().then((value) => {
  parentPort.postMessage(value);
});
