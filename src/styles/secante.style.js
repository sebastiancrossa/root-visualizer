import styled from "styled-components";
import { Container } from "../style";

export const StyledContainer = styled(Container)`
  padding: 2rem;

  text-align: center;
`;

export const Heading = styled.div`
  margin: 3rem 0 2rem 0;
  padding: 1rem;

  h1 {
    margin: 0 0 0.3rem 0;
  }

  p {
    color: #7f8080;
    font-style: italic;
    font-size: 1.1rem;

    margin: 0 auto;
    max-width: 70%;
  }
`;

export const InputsSection = styled.div`
  max-width: 70%;
  margin: 0 auto 2rem auto;

  padding: 1.3rem;

  border: 2px solid #e0e2e4;
`;

export const Inputs = styled.div`
  display: grid;
  grid-template-areas:
    "func func func func"
    "inp1 inp2 inp3 inp4"
    "calc calc calc calc";
  grid-row-gap: 1.2rem;
  grid-column-gap: 2rem;
  justify-content: center;

  margin-bottom: 1rem;
`;

export const Resultados = styled.div`
  display: flex;
  justify-content: space-evenly;

  padding: 2rem 0;
  margin-bottom: 2rem;

  h1,
  p {
    margin: 0;
  }

  p {
    text-transform: uppercase;
  }
`;

export const IteracionesGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 1rem;

  max-width: 70%;
  margin: 0 auto;
`;

export const IteracionesSection = styled.div`
  padding: 0 1rem;
  border-radius: 5px;

  overflow-y: scroll;
  height: 25.5rem;

  background-color: #e2e8f0;
`;

export const Iteraciones = styled.ul`
  list-style: none;
  text-align: left;

  padding: 0;

  li {
    padding: 0;
  }
`;
