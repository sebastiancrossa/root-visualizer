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
