// Libraries
import React, { useState } from "react";
import { derivative } from "mathjs";
import { newton } from "../utils/metodos";

// Styles
import Layout from "../components/layout";
import { Button, Input } from "../style";
import {
  StyledContainer,
  Heading,
  Inputs,
  InputsSection,
  Resultados,
} from "../styles/newton.style";

const Newton = () => {
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

    const func = new Function("x", `return ${fn}`);
    const dFunc = new Function("x", `return ${df}`);
    console.log(func, dFunc);

    const resCalculo = newton(
      func,
      dFunc,
      parseFloat(x0),
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

  console.log(formState);

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
      </StyledContainer>
    </Layout>
  );
};

export default Newton;
