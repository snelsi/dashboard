import * as React from "react";
import styled from "styled-components";

const AddButton = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #172b4d;
  font-size: 15px;
  padding: 0.5em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.15);
  }
  & > .plus {
    font-size: 18px;
    width: 20px;
    margin-right: 4px;
  }
`;

export const CreateTaskButton: React.FC<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = (props) => (
  <AddButton {...props}>
    <span className="plus">+</span> Добавить ещё одну задачу
  </AddButton>
);
