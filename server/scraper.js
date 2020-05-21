const { workerData, parentPort } = require("worker_threads");
const puppeteer = require("puppeteer");
const linksGatherer = require("./utils/linksGatherer");
const CheckedNode = require('./utils/CheckedNode');
console.log("i scraper");



let scrape = async (url) => {
  let domain = new URL(url).hostname;
  const queue = [];
  const checkedNodes = [];
  const edges = [];
  let checkedCount = 0;
  queue.push(url);

  const browser = await puppeteer.launch();

  const page = await browser.newPage();




  let generateEdges = (from, newLinks) => {
    newLinks.forEach((link) => {
      try {
        let linkObj = new URL(link);

        edges.push({ from: from, to: link });
        if (!checkedNodes.find((node) => node.id == link)) {

          if (linkObj.hostname !== domain) {
            checkedNodes.push(new CheckedNode(link, false));
          } else {
            if (!queue.find((url) => url == link)) queue.push(link);
          }
        }
      } catch (err) {
        console.log(err);
      }

    });
  };

  while (checkedCount < 50) {

    let checkingNode = queue.shift();

    if (checkingNode) {

      checkedNodes.push(new CheckedNode(checkingNode));

      await page.goto(checkingNode);
      const newLinks = await page.evaluate(linksGatherer);

      checkedCount++;
      console.log(checkedCount);

      generateEdges(checkingNode, newLinks);
    }
  }

  browser.close();
  checkedNodes[0].color = 'red';
  return { nodes: checkedNodes, edges: edges };
};

scrape(workerData).then((graph) => {
  parentPort.postMessage(graph);
});
