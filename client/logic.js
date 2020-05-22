import io from "socket.io-client";
import './style.css';
import './interactive';
import { Network } from "vis-network/peer";
import { DataSet } from "vis-data/peer";
import "vis-network/styles/vis-network.css";

let socket = io.connect("http://localhost:4000");

let graphContainer = document.querySelector("#graph");

let urlForm = document.querySelector(".url-form");
let btn = document.querySelector(".url-form button");
urlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let url = e.target["checked-url"].value;
  if (url) {
    btn.disabled = true;
    socket.emit("start-scrap", url);
  }
});

socket.on("finish-scrap", (result) => {
  btn.disabled = false;
  if (result.err) {
    console.error(`err: ${result.err}`);
  } else {


    let dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(result.edges));
    let dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "EdgeList.json");
    dlAnchorElem.classList.remove("hidden");

    let nodes = new DataSet(result.nodes);
    let edges = new DataSet(result.edges);

    var data = {
      nodes: nodes,
      edges: edges,
    };

    var options = {
      edges: {
        width: 0.15,
        color: { inherit: "from" },
        smooth: {
          type: "continuous",
        },
        arrows: {
          to: {
            enabled: true,
          },
        },
      },
      physics: {
        stabilization: false,
        barnesHut: {
          gravitationalConstant: -80000,
          springConstant: 0.001,
          springLength: 200,
        },
      },
    };
    var network = new Network(graphContainer, data, options);
  }
});
