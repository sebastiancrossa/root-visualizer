// Libraries
import React, { useState, useRef } from "react";
import { useToast } from "@chakra-ui/core";
import { newton } from "../utils/metodos";
import functionPlot from "function-plot";

// Styles
import Layout from "../components/layout";
import { Button, Input } from "../style";
import {
  StyledContainer,
  Heading,
  Inputs,
  InputsSection,
  Resultados,
  IteracionesGrid,
  IteracionesSection,
  Iteraciones,
} from "../styles/newton.style";

window.d3 = require("d3");

const Newton = () => {
  const toast = useToast();
  const graphContainer = useRef(null);

  const [res, setRes] = useState();
  const [formState, setFormState] = useState({
    fn: "4 * x ** 3 + x - 10",
    df: "12 * x + 1",
    x0: "1",
    tol: "0.001",
    iter_max: "100",
  });

  const calcularMetodo = () => {
    const { fn, df, x0, tol, iter_max } = formState;
    let parsedFn = fn;
    let parsedDf = df;

    try {
      if (isNaN(Number(x0)) || isNaN(Number(tol)) || isNaN(Number(iter_max))) {
        throw new Error(
          "Los valores introducidos no son puntos enteros o flotantes"
        );
      }

      if (fn.includes("^")) {
        parsedFn = fn.split("^").join("**");
      }

      if (df.includes("^")) {
        parsedDf = df.split("^").join("**");
      }

      // eslint-disable-next-line
      const func = new Function("x", `return ${parsedFn}`);

      // eslint-disable-next-line
      const dFunc = new Function("x", `return ${parsedDf}`);

      const resCalculo = newton(
        func,
        dFunc,
        parseFloat(x0),
        parseFloat(tol),
        parseFloat(iter_max)
      );

      setRes(resCalculo);
      showGraph(resCalculo[0]);
    } catch (err) {
      if (err.name === "SyntaxError") {
        toast({
          title: "Error",
          description:
            "Asegurate de no incluir letras alfabeticas y/o separar los números de las variables con un *",
          status: "error",
          duration: 4000,
          isClosable: false,
        });
      } else {
        toast({
          title: "Error",
          description: `${err.message}`,
          status: "error",
          duration: 4000,
          isClosable: false,
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const showGraph = (x) => {
    let parsedFn = formState.fn;

    // Parses our function so it makes sure that it uses ^ to represent an exponent
    // This is needed since the graph library doesn't accept **
    if (formState.fn.includes("**")) {
      parsedFn = formState.fn.split("**").join("^");
    }

    functionPlot({
      target: graphContainer.current,
      tip: {
        xLine: true, // dashed line parallel to y = 0
        yLine: true,
      },
      width: 480,
      height: 400,
      data: [
        {
          fn: parsedFn ? parsedFn : "x^2",
        },
        {
          fn: `${formState.x0} - x`,
          fnType: "implicit",
        },
        {
          points: [[x, 0]],
          fnType: "points",
          graphType: "scatter",
        },
      ],
      annotations: [
        {
          x: formState.x0,
          text: `x = ${formState.x0}`,
        },
      ],
    });
  };

  return (
    <Layout>
      <StyledContainer>
        <Heading>
          <h1>Método de Newton</h1>
          <p>
            "A partir de una aproximación inicial, se evalúa en la función y se
            traza una recta tangente, cuya intersección con el eje x produce una
            nueva aproximación a la raíz. El proceso se repite hasta alcanzar la
            precisión deseada o hasta alcanzar el número máximo de iteraciones"
          </p>
        </Heading>

        <InputsSection>
          <Inputs>
            <div style={{ gridArea: "func" }}>
              <label htmlFor="fn">Función: </label> <br />
              <Input
                type="text"
                id="fn"
                name="fn"
                value={formState.fn}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ gridArea: "inp1" }}>
              <label htmlFor="df">Derivada: </label> <br />
              <Input
                type="text"
                id="df"
                name="df"
                value={formState.df}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ gridArea: "inp2" }}>
              <label htmlFor="x0">Valor "x" inicial: </label> <br />
              <Input
                type="text"
                id="x0"
                name="x0"
                value={formState.x0}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ gridArea: "inp3" }}>
              <label htmlFor="tol">Tolerancia: </label> <br />
              <Input
                type="text"
                id="tol"
                name="tol"
                value={formState.tol}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ gridArea: "inp4" }}>
              <label htmlFor="iter_max">Iteración máxima: </label> <br />
              <Input
                type="text"
                id="iter_max"
                name="iter_max"
                value={formState.iter_max}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>
          </Inputs>

          <Button
            disabled={
              formState.fn === "" ||
              formState.df === "" ||
              formState.x0 === "" ||
              formState.tol === "" ||
              formState.iter_max === ""
            }
            aria-busy={
              formState.fn === "" ||
              formState.df === "" ||
              formState.x0 === "" ||
              formState.tol === "" ||
              formState.iter_max === ""
            }
            onClick={() => {
              calcularMetodo();
            }}
            style={{ gridArea: "calc" }}
          >
            Calcular
          </Button>
        </InputsSection>

        <Resultados>
          <div>
            <p>Raíz</p>
            <h1>{res ? (res[2] ? res[0] : "No converge") : "Sin calculos"}</h1>
          </div>

          <div>
            <p>Iteración</p>
            <h1>{res ? res[1] : "Sin calculos"}</h1>
          </div>

          <div>
            <p>Converge</p>
            <h1>{res ? (res[2] ? "Sí" : "No") : "Sin calculos"}</h1>
          </div>
        </Resultados>

        <IteracionesGrid>
          <IteracionesSection>
            <Iteraciones>
              {res ? (
                res[3].map((it) => (
                  <li key={it[0]}>
                    <span style={{ fontWeight: "700" }}>
                      Iteración {it[0]}:
                    </span>{" "}
                    x={it[1]} | fx= {it[2]} | dx= {it[3]}
                  </li>
                ))
              ) : (
                <li>Sin calculos</li>
              )}
            </Iteraciones>
          </IteracionesSection>

          <div
            id="graph"
            ref={graphContainer}
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "0.3rem",
              border: "2px solid #e2e8f0",
            }}
          >
            Graph
          </div>
        </IteracionesGrid>
      </StyledContainer>
    </Layout>
  );
};

export default Newton;
