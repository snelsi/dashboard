import * as React from "react";
import styled from "styled-components";
import type { IDesk } from "interfaces";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const Card = styled.div`
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
  color: #4d5358;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 15px;
  height: 100%;
  outline: none;
  overflow: hidden;
  position: relative;

  &:focus,
  &:hover {
    border: 1px solid #4d5358;
  }

  & > h2 {
    font-size: 24px;
    text-decoration: none;
  }
`;

const Tag = styled.div`
  bottom: -22px;
  font-weight: 700;
  font-size: 88px;
  opacity: 0.1;
  position: absolute;
  right: 20px;
  user-select: none;
  z-index: 0;
`;

interface DeskProps {
  desk: IDesk;
}

export const Desk: React.FC<DeskProps> = ({ desk }) => (
  <Draggable draggableId={String(desk.id)} index={desk.index}>
    {(provided) => (
      <Link
        to={`/desk/${desk.id}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className="deskCard"
        data-testid="deskcard"
      >
        <Card>
          <h2>{desk.name}</h2>
          <Tag>{desk.id}</Tag>
        </Card>
      </Link>
    )}
  </Draggable>
);
