// Libraries
import React from "react";
import { withRouter } from "react-router-dom";

// Styles
import { Container } from "../../../style";
import { StyledContainer, Background, LinksList } from "./navbar.style";

// Component Imports
import { FaSquareRootAlt } from "react-icons/fa";

const Navbar = ({ history }) => {
  return (
    <Background>
      <StyledContainer>
        <div style={{ display: "inherit", alignItems: "center" }}>
          <FaSquareRootAlt size={25} style={{}} />
          <button
            onClick={() => history.push("/")}
            style={{ cursor: "pointer !important" }}
          >
            <p>
              <span style={{ fontWeight: "700" }}>ROOT</span> Visualizer
            </p>
          </button>
        </div>

        <LinksList>
          <button onClick={() => history.push("/metodo/biseccion")}>
            Bisección
          </button>
          <button onClick={() => history.push("/metodo/newton")}>Newton</button>
          <button onClick={() => history.push("/metodo/secante")}>
            Secante
          </button>
        </LinksList>
      </StyledContainer>
    </Background>
  );
};

export default withRouter(Navbar);
