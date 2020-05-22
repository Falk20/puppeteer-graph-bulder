const { workerData, parentPort } = require("worker_threads");
const puppeteer = require("puppeteer");
const linksGatherer = require("./utils/linksGatherer");
const CheckedNode = require('./utils/CheckedNode');
console.log("i scraper");



let scrape = async (url, checkingNodeCount) => {
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

    if (!queue.length) {
      checkedCount = checkingNodeCount;
    }
  };

  while (checkedCount < checkingNodeCount) {

    let checkingNode = queue.shift();

    if (checkingNode) {

      checkedNodes.push(new CheckedNode(checkingNode));

      let newLinks;

      try {
        await page.goto(checkingNode, { waitUntil: 'networkidle0' });
        newLinks = await page.evaluate(linksGatherer);
      } catch (err) {
        return { nodes: checkedNodes, edges: edges, err: 'failed to parse the link' };
      }

      checkedCount++;
      console.log(checkedCount);

      generateEdges(checkingNode, newLinks);
    }
  }

  browser.close();
  checkedNodes[0].color = 'red';
  return { nodes: checkedNodes, edges: edges };
};

scrape(workerData, 20).then((graph) => {
  parentPort.postMessage(graph);
});
