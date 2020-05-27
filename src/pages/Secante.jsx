// Libraries
import React, { useState, useRef } from "react";
import { useToast, Tooltip } from "@chakra-ui/core";
import { secante } from "../utils/metodos";
import functionPlot from "function-plot";

// Styles
import Layout from "../components/layout";
import { Button, Input } from "../style";
import {
  StyledContainer,
  Heading,
  InputsSection,
  Inputs,
  Resultados,
  IteracionesGrid,
  IteracionesSection,
  Appendice,
  Iteraciones,
} from "../styles/secante.style";

window.d3 = require("d3");

const Secante = () => {
  const toast = useToast();
  const graphContainer = useRef(null);

  const [res, setRes] = useState();
  const [iterationList, setIterationList] = useState([]);
  const [formState, setFormState] = useState({
    fn: "x ** 5 + 7 * x - 6",
    limite_inf: "0.0",
    limite_sup: "3.0",
    tol: "0.001",
    iter_max: "100",
  });

  const calcularMetodo = () => {
    const { fn, limite_inf, limite_sup, tol, iter_max } = formState;
    let parsedFn = fn;

    try {
      if (
        isNaN(Number(limite_inf)) ||
        isNaN(Number(limite_sup)) ||
        isNaN(Number(tol)) ||
        isNaN(Number(iter_max))
      ) {
        throw new Error(
          "Los valores introducidos no son puntos enteros o flotantes"
        );
      }

      if (fn.includes("^")) {
        parsedFn = fn.split("^").join("**");
      }

      // eslint-disable-next-line
      const func = new Function("x", `return ${parsedFn}`);

      const resCalculo = secante(
        func,
        parseFloat(limite_inf),
        parseFloat(limite_sup),
        parseFloat(tol),
        parseFloat(iter_max)
      );

      resCalculo &&
        resCalculo[3].map((it, i) => {
          setTimeout(() => {
            //console.log(it);
            setRes([it[1], it[0], true, resCalculo[3]]);
            setIterationList((prevState) => [...prevState, resCalculo[3][i]]);
            //console.log(res);

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
      xAxis: {
        domain: [formState.limite_inf - 0.5, formState.limite_sup + 1],
      },
      data: [
        {
          fn: parsedFn ? parsedFn : "x^2",
        },
        {
          points: [[x, 0]],
          fnType: "points",
          graphType: "scatter",
        },
      ],
      annotations: [
        {
          x: formState.limite_inf,
          text: `x = ${formState.limite_inf}`,
        },
        {
          x: formState.limite_sup,
          text: `x = ${formState.limite_sup}`,
        },
      ],
    });
  };

  return (
    <Layout>
      <StyledContainer>
        <Heading>
          <h1>Método de Secante</h1>
          <p>
            "Método similar a la Falsa Posición, que también se basa en la
            secante. La diferencia con el método la falsa posición, radica en
            que en los dos valores iniciales no tiene que existir una raíz"
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
              <label htmlFor="limite_inf">Valor "x" primario: </label> <br />
              <Input
                type="text"
                id="limite_inf"
                name="limite_inf"
                value={formState.limite_inf}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ gridArea: "inp2" }}>
              <label htmlFor="limite_sup">Valor "x" secundario: </label> <br />
              <Input
                type="text"
                id="limite_sup"
                name="limite_sup"
                value={formState.limite_sup}
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
              formState.limite_inf === "" ||
              formState.limite_sup === "" ||
              formState.tol === "" ||
              formState.iter_max === ""
            }
            aria-busy={
              formState.fn === "" ||
              formState.limite_inf === "" ||
              formState.limite_sup === "" ||
              formState.tol === "" ||
              formState.iter_max === ""
            }
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
                  label="Aproximación a la raiz (Limite superior menos el inferior entre 2)"
                  placement="top"
                >
                  <p>x</p>
                </Tooltip>

                <Tooltip
                  hasArrow
                  label=" La funcion original evaluada con el valor de x"
                  placement="top"
                >
                  <p>fx</p>
                </Tooltip>

                <Tooltip
                  hasArrow
                  label="El cambio o la diferencia entre el valor aproximado (x) a los limites"
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
                      x={it[1]} | fx= {it[2]} | dx= {it[3]}
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

export default Secante;
