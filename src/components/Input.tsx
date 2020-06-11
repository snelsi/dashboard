import styled from "styled-components";

export const Input = styled.input`
  border: none;
  color: #172b4d;

  font-size: 16px;
  font-weight: 700;
  padding: 4px 8px;

  &:hover,
  &:focus-within {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:focus-within {
    border: 1px solid #0079bf;
  }

  &[data-size="big"] {
    font-size: 28px;
  }
`;
