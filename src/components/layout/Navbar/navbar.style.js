import styled from "styled-components";
import { Container } from "../../../style";

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;

  padding: 0.6rem;

  button {
    background: none;
    border: none;
    outline: none;

    font-size: 1rem;

    cursor: pointer;
  }
`;

export const Background = styled.div`
  border-bottom: 2px solid #e0e2e4;
`;

export const LinksList = styled.div`
  display: inherit;

  p {
    margin-left: 0.8rem;
  }
`;
