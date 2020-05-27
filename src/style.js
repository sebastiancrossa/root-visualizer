import styled from "styled-components";

export const Container = styled.div`
  max-width: 85rem;
  margin: 0 auto;
`;

export const Button = styled.button`
  border: none;

  font-size: 1.1rem;

  cursor: pointer;

  padding: 0.5rem 4rem;
  background-color: black;
  color: white;

  &:disabled {
    cursor: inherit;

    color: black;
    background-color: white;

    -webkit-box-shadow: inset 0px 0px 0px 2px black;
    -moz-box-shadow: inset 0px 0px 0px 2px black;
    box-shadow: inset 0px 0px 0px 2px black;
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;

  font-size: 0.8rem;

  padding: 0.5rem;
  border-bottom: 2px solid black;
`;
