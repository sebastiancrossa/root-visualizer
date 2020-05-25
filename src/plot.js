import d3 from "d3";
window.d3 = d3;

const functionPlot = require("function-plot");

const root = document.querySelector("#root");

functionPlot({
  target: root,
  yAxis: { domain: [-1, 9] },
  tip: {
    renderer: function () {},
  },
  grid: true,
  data: [
    {
      fn: "x^2",
      derivative: {
        fn: "2 * x",
        updateOnMouseMove: true,
      },
    },
  ],
});
