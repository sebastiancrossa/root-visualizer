// Libraries
import React from "react";

// Styles
import Layout from "../components/layout";
import { StyledContainer, Heading } from "../styles/newton.style";

const Newton = () => {
  return (
    <Layout>
      <StyledContainer>
        <Heading>
          <h1>Metodo de Newton</h1>
          <p>
            "A partir de una aproximación inicial, se evalúa en la función y se
            traza una recta tangente, cuya intersección con el eje x produce una
            nueva aproximación a la raíz. El proceso se repite hasta alcanzar la
            precisión deseada o hasta alcanzar el número máximo de iteraciones"
          </p>
        </Heading>
      </StyledContainer>
    </Layout>
  );
};

export default Newton;
