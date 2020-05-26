import styled from "styled-components";
import { Container } from "../style";

export const StyledContainer = styled(Container)`
  padding: 2rem;

  text-align: center;
`;

export const Heading = styled.div`
  margin-top: 3rem;
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
`;

export const Inputs = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
`;
