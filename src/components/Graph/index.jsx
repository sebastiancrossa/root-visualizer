// Libaries
import React, { useRef } from "react";
import functionPlot from "function-plot";
window.d3 = require("d3");

const Graph = () => {
  const graphContainer = useRef(null);

  const showGraph = () => {
    functionPlot({
      target: graphContainer.current,
      disableZoom: true,
      data: [
        {
          fn: "x^2",
        },
      ],
    });
  };

  return (
    <div>
      <button onClick={() => showGraph()}>Show graph</button>
      <div id="graph" ref={graphContainer}></div>
    </div>
  );
};

export default Graph;
