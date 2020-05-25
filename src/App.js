// Libraries
import React, { useRef } from "react";
import functionPlot from "function-plot";
window.d3 = require("d3");

function App() {
  const graphContainer = useRef(null);
  const displayGraph = document.querySelector("#graph");

  const showGraph = () => {
    functionPlot({
      target: graphContainer.current,
      data: [
        {
          fn: "x^2",
        },
      ],
    });
  };

  return (
    <div>
      <h1>Square Root Visualizer</h1>
      <button onClick={() => showGraph()}>Show graph</button>
      <div id="graph" ref={graphContainer}></div>
    </div>
  );
}

export default App;
