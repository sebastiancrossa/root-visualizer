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

  padding: 1rem;

  border: 2px solid #e0e2e4;
`;

export const Inputs = styled.div`
  display: flex;
  justify-content: space-between;

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

export const IteracionesSection = styled.div`
  max-width: 70%;
  margin: 0 auto;

  padding: 1rem;
  border-radius: 5px;

  background-color: #e2e8f0;
`;

export const Iteraciones = styled.ul`
  list-style: none;
  text-align: left;
`;
