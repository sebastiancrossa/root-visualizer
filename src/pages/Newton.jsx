// Libraries
import React, { useState, useRef } from "react";
import { useToast, Tooltip, List, ListItem, ListIcon } from "@chakra-ui/core";
import { newton } from "../utils/metodos";
import functionPlot from "function-plot";

// Styles
import Layout from "../components/layout";
import { Button, Input } from "../style";
import {
  StyledContainer,
  Heading,
  Description,
  Inputs,
  InputsSection,
  Resultados,
  IteracionesGrid,
  IteracionesSection,
  Appendice,
  Iteraciones,
} from "../styles/newton.style";

window.d3 = require("d3");

const Newton = () => {
  const toast = useToast();
  const graphContainer = useRef(null);

  const [descInfo] = useState({
    pros: [
      "Método más conocido y eficiente para la resolución del problema de búsqueda de raíces",
      "Converge rápidamente",
      "Alta precisión con el resultado dado",
    ],
    cons: [
      "Convergencia lenta",
      "Tiene que calcular y utilizar la derivada de la función dada",
      "Existen situaciones en las que no se alcanza la convergencia, por lo que se debe indicar un número máximo de iteraciónes",
      "Puede darse el caso en el que regrese una falsa raíz, por lo quese debe indicar una tolerancia también",
    ],
  });

  const [res, setRes] = useState();
  const [iterationList, setIterationList] = useState([]);
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

      resCalculo &&
        resCalculo[3].map((it, i) => {
          setTimeout(() => {
            setRes([it[1], it[0], true, resCalculo[3]]);
            setIterationList((prevState) => [...prevState, resCalculo[3][i]]);

            showGraph(it[1]);
          }, i * 800);
        });

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

  const isDisabled =
    formState.fn === "" ||
    formState.df === "" ||
    formState.x0 === "" ||
    formState.tol === "" ||
    formState.iter_max === "";

  return (
    <Layout>
      <StyledContainer>
        <Heading>
          <h1>Método de Newton-Raphson</h1>
          <p>
            "A partir de una aproximación inicial, se evalúa en la función y se
            traza una recta tangente, cuya intersección con el eje x produce una
            nueva aproximación a la raíz. El proceso se repite hasta alcanzar la
            precisión deseada o hasta alcanzar el número máximo de iteraciones"
          </p>
        </Heading>

        <Description>
          <div>
            <h1>Pros</h1>

            <List spacing={3} style={{ textAlign: "left" }}>
              {descInfo.pros.map((it) => (
                <ListItem>
                  <ListIcon icon="check-circle" color="green.400" />
                  {it}
                </ListItem>
              ))}
            </List>
          </div>

          <div>
            <h1>Contras</h1>

            <List spacing={3} style={{ textAlign: "left" }}>
              {descInfo.cons.map((it) => (
                <ListItem>
                  <ListIcon icon="warning" color="red.400" />
                  {it}
                </ListItem>
              ))}
            </List>
          </div>
        </Description>

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
            disabled={isDisabled}
            aria-busy={isDisabled}
            onClick={() => {
              // Reset iteration list
              setIterationList([]);

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
          <div>
            <Appendice>
              <p>
                ¿Qué significa cada valor?{" "}
                <span style={{ fontStyle: "italic" }}>(hover)</span>
              </p>

              <div>
                <Tooltip
                  hasArrow
                  label="Aproximación a la raiz"
                  placement="top"
                >
                  <p>x</p>
                </Tooltip>

                <Tooltip
                  hasArrow
                  label="Valor de x evaluado en la funcion derivada"
                  placement="top"
                >
                  <p>df</p>
                </Tooltip>

                <Tooltip
                  hasArrow
                  label="La funcion original evaluada con el valor de x"
                  placement="top"
                >
                  <p>fx</p>
                </Tooltip>

                <Tooltip
                  hasArrow
                  label="Resta da la X de la iteración anterior menos la x actual"
                  placement="top"
                >
                  <p>dx</p>
                </Tooltip>
              </div>
            </Appendice>

            <IteracionesSection>
              <Iteraciones>
                {iterationList ? (
                  iterationList.map((it) => (
                    <li key={it[0]}>
                      <span style={{ fontWeight: "700" }}>
                        Iteración {it[0]}:
                      </span>{" "}
                      x={it[1]} | df={it[2]} | fx= {it[3]} | dx= {it[4]}
                    </li>
                  ))
                ) : (
                  <li>Sin calculos</li>
                )}
              </Iteraciones>
            </IteracionesSection>
          </div>

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
