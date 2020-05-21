const express = require("express");
const socket = require("socket.io");
const { Worker } = require("worker_threads");

let app = express();
let server = app.listen("4000", () => {
  console.log("listening for requests on port 4000");
});

app.use(express.static("public"));

let io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("start-scrap", (url) => {
    const graphBulder = new Worker("./graphBuilder.js", {
      workerData: url,
    });

    graphBulder.on("message", (graph) => {
      socket.emit("finish-scrap", graph);
    });

    graphBulder.on("error", (err) => console.log(err));
    graphBulder.on("exit", (code) => {
      if (code !== 0)
        console.log(new Error(`Worker stopped with exit code ${code}`));
    });
  });
});
