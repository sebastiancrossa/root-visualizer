// Libraries
import React, { useState, useRef } from "react";
import { biseccion } from "../utils/metodos";
import functionPlot from "function-plot";

// Styles
import Layout from "../components/layout";
import {
  StyledContainer,
  Heading,
  Inputs,
  InputsSection,
  Resultados,
  IteracionesGrid,
  IteracionesSection,
  Iteraciones,
} from "../styles/biseccion.style";

window.d3 = require("d3");

const Biseccion = () => {
  const graphContainer = useRef(null);

  const [res, setRes] = useState();
  const [formState, setFormState] = useState({
    fn: "4 * x ^ 3 + x - 10",
    limite_inf: "1.0",
    limite_sup: "2.0",
    tol: "10**-5",
    iter_max: "100",
  });

  const calcularMetodo = () => {
    const { fn, limite_inf, limite_sup, tol, iter_max } = formState;

    const func = new Function("x", `return ${fn}`);

    console.log(func);

    const resCalculo = biseccion(
      func,
      parseFloat(limite_inf),
      parseFloat(limite_sup),
      parseFloat(tol),
      parseFloat(iter_max)
    );

    console.log(resCalculo);
    setRes(resCalculo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const showGraph = () => {
    functionPlot({
      target: graphContainer.current,
      width: 480,
      height: 400,
      data: [
        {
          fn: formState ? formState.fn : "x^2",
        },
      ],
    });
  };

  return (
    <Layout>
      <StyledContainer>
        <Heading>
          <h1>Metodo de Bisección</h1>
          <p>
            "Método que identifica inicialmente un intervalo en el que existe
            una raíz, divide el intervalo a la mitad y selecciona el
            subintervalo en el que se encuentra la raíz, repitiéndose el proceso
            hasta encontrar la raíz con la precisión deseada"
          </p>
        </Heading>

        <InputsSection>
          <Inputs>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="fn">Funcion: </label> <br />
              <input
                type="text"
                id="fn"
                name="fn"
                value={formState.fn}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ textAlign: "left" }}>
              <label htmlFor="limite_inf">Limite inferior: </label> <br />
              <input
                type="text"
                id="limite_inf"
                name="limite_inf"
                value={formState.limite_inf}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ textAlign: "left" }}>
              <label htmlFor="limite_sup">Limite superior: </label> <br />
              <input
                type="text"
                id="limite_sup"
                name="limite_sup"
                value={formState.limite_sup}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ textAlign: "left" }}>
              <label htmlFor="tol">Tolerancia: </label> <br />
              <input
                type="text"
                id="tol"
                name="tol"
                value={formState.tol}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>

            <div style={{ textAlign: "left" }}>
              <label htmlFor="iter_max">Iteracion maxima: </label> <br />
              <input
                type="text"
                id="iter_max"
                name="iter_max"
                value={formState.iter_max}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <br />
            </div>
          </Inputs>

          <button
            onClick={() => {
              calcularMetodo();
              showGraph();
            }}
          >
            Calcular
          </button>
        </InputsSection>

        <Resultados>
          <div>
            <p>Raiz</p>
            <h1>{res ? (res[2] ? res[0] : "No converge") : "Sin calculos"}</h1>
          </div>

          <div>
            <p>Iteracion</p>
            <h1>{res ? res[1] : "Sin calculos"}</h1>
          </div>

          <div>
            <p>Converge</p>
            <h1>{res ? (res[2] ? "Si" : "No") : "Sin calculos"}</h1>
          </div>
        </Resultados>

        <IteracionesGrid>
          <IteracionesSection>
            <Iteraciones>
              {res ? (
                res[3].map((it) => (
                  <li>
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
              backgroundColor: "#EDF2F7",
              borderRadius: "5px",
              padding: "0.3rem",
            }}
          >
            Graph
          </div>
        </IteracionesGrid>
      </StyledContainer>
    </Layout>
  );
};

export default Biseccion;
