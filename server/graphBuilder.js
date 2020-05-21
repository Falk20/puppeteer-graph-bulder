const { Worker, workerData, parentPort } = require("worker_threads");

console.log("i builder");

const scraper = new Worker("./scraper.js", {
  workerData: workerData,
});

scraper.on("message", (newLinks) => {
  let edges = [];
  let nodes = [];
  newLinks.forEach((link) => {
    edges.push({ from: workerData, to: link });
    if (!nodes.find((node) => node.id == link)) {
      nodes.push({ id: link, label: link });
    }
  });
  parentPort.postMessage({ edges, nodes });
});

scraper.on("error", (err) => console.log(err));
scraper.on("exit", (code) => {
  if (code !== 0)
    console.log(new Error(`Worker stopped with exit code ${code}`));
});
