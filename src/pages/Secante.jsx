// Libraries
import React from "react";

// Styles
import Layout from "../components/layout";
import { StyledContainer, Heading } from "../styles/secante.style";

const Secante = () => {
  return (
    <Layout>
      <StyledContainer>
        <Heading>
          <h1>Metodo de Secante</h1>
          <p>
            "Método similar a la Falsa Posición, que también se basa en la
            secante. La diferencia con el método la falsa posición, radica en
            que en los dos valores iniciales no tiene que existir una raíz"
          </p>
        </Heading>
      </StyledContainer>
    </Layout>
  );
};

export default Secante;
