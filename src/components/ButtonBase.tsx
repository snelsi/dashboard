import styled from "styled-components";

export const ButtonBase = styled.div`
  align-items: center;
  background-color: #f1f4fc;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  margin-right: 16px;

  height: 40px;
  width: 40px;

  transition: all 0.2s ease-out;

  &:hover,
  &:focus {
    background-color: #e9ecf3;
  }
  &:active {
    background-color: #d6d9e0;
  }
`;
