// Libraries
import React, { useState } from "react";
import { biseccion } from "../utils/metodos";

// Styles
import Layout from "../components/layout";
import {
  StyledContainer,
  Heading,
  Inputs,
  InputsSection,
} from "../styles/biseccion.style";

const Biseccion = () => {
  const [res, setRes] = useState();
  const [formState, setFormState] = useState({
    fn: "",
    limite_inf: "",
    limite_sup: "",
    tol: "",
    iter_max: "",
  });

  const calcularMetodo = () => {};

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
              <label for="fn">Funcion: </label> <br />
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
              <label for="limite_inf">Limite inferior: </label> <br />
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
              <label for="limite_sup">Limite superior: </label> <br />
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
              <label for="tol">Tolerancia: </label> <br />
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
              <label for="iter_max">Iteracion maxima: </label> <br />
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

          <button>Calcular</button>
        </InputsSection>

        <h1>{res ? res : "No res"}</h1>
      </StyledContainer>
    </Layout>
  );
};

export default Biseccion;
