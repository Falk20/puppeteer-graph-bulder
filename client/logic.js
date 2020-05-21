import io from "socket.io-client";
import { Network } from "vis-network/peer";
import { DataSet } from "vis-data/peer";
import "vis-network/styles/vis-network.css";

let socket = io.connect("http://localhost:4000");

let graphContainer = document.querySelector("#graph");

let urlForm = document.querySelector(".url-form");
urlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // let url = e.target["checked-url"].value;
  let url = "https://metanit.com/";
  if (url) {
    socket.emit("start-scrap", url);
  }
});

socket.on("finish-scrap", (result) => {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(result.edges));
  var dlAnchorElem = document.getElementById("downloadAnchorElem");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "EdgeList.json");
  dlAnchorElem.classList.remove("hidden");

  let nodes = new DataSet(result.nodes);
  let edges = new DataSet(result.edges);

  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  var network = new Network(graphContainer, data, options);
});
