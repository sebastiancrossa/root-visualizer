import styled from "styled-components";
import { Container } from "../style";

export const StyledContainer = styled(Container)`
  padding: 1rem;
  text-align: center;

  h1 {
    margin: 0;
  }
`;

export const Heading = styled.div`
  margin-top: 7rem;
  padding: 2rem;
`;

export const ButtonsList = styled.div`
  display: flex;
  justify-content: space-evenly;

  margin: 0 auto;
  max-width: 60%;

  button {
    border: none;
    padding: 1rem;

    cursor: pointer;

    font-size: 1rem;

    background-color: black;
    color: white;
  }
`;
