// Libraries
import React from "react";
import functionPlot from "function-plot";

function App() {
  const displayGraph = document.querySelector("#graph");

  functionPlot({
    target: "#graph",
    data: [
      {
        fn: "x^2",
      },
    ],
  });

  return (
    <div>
      <h1>Square Root Visualizer</h1>
      <div id="graph"></div>
    </div>
  );
}

export default App;
