import * as React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border-radius: 4px;
  border: 1px dashed #878d96;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #000;
  cursor: pointer;
  outline: none;
  padding: 1em 0.5em;
  height: fit-content;

  &:hover,
  &:focus {
    border: 1px solid #4d5358;
    background: rgba(200, 200, 200, 0.2);
  }

  &:active {
    background: rgba(200, 200, 200, 0.4);
  }

  width: 280px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const CreateGroupCard: React.FC<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = (props) => <Button {...props}>+ Добавить новую группу</Button>;
