// Libraries
import React from "react";

// Component Imports
import { FaSquareRootAlt } from "react-icons/fa";
import { StyledContainer, Heading, ButtonsList } from "../styles/home.style";
import Layout from "../components/layout";

const Home = ({ history }) => {
  return (
    <Layout>
      <StyledContainer>
        <Heading>
          <h1>Bienvenido a</h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaSquareRootAlt size={45} style={{ marginRight: "0.5rem" }} />

            <p style={{ fontSize: "2.5rem", margin: "0" }}>
              <span style={{ fontWeight: "700" }}>ROOT</span> Visualizer
            </p>
          </div>
        </Heading>

        <div>
          <p>Selecciona el algoritmo que quieras visualizar:</p>

          <ButtonsList>
            <button onClick={() => history.push("/metodo/biseccion")}>
              Método de Bisección
            </button>
            <button onClick={() => history.push("/metodo/newton")}>
              Método de Newton-Rhapson
            </button>
            <button onClick={() => history.push("/metodo/secante")}>
              Método de Secante
            </button>
          </ButtonsList>
        </div>
      </StyledContainer>
    </Layout>
  );
};

export default Home;
