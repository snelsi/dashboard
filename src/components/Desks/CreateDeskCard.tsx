import * as React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border-radius: 12px;
  border: 1px dashed #878d96;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #4d5358;
  cursor: pointer;
  outline: none;

  &:focus,
  &:hover {
    border: 1px solid #4d5358;
  }
`;

export const CreateDeskCard: React.FC<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = (props) => (
  <Button {...props}>
    <div>
      <div>
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none">
          <path d="M12 12v9H9v-9H1v-2h8V1h3v9h8v2h-8z" fill="#4D5358" />
        </svg>
      </div>
      <div>Добавить новую доску</div>
    </div>
  </Button>
);
