import * as React from "react";
import styled from "styled-components";
import { useMedia } from "react-use";
import { Droppable } from "react-beautiful-dnd";

import { CreateDesk } from "components/Desks";

const Catalog = styled.div`
  display: flex;
  padding: 32px;
  height: fit-content;
  width: fit-content;

  & > * {
    height: 200px;
    width: 300px;
  }

  & > a {
    margin-right: 16px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 16px;
    width: 100%;

    & > a {
      margin-right: 0;
      margin-bottom: 16px;
    }

    & > * {
      width: 100%;
    }
  }
`;

interface DesksCatalogProps {
  numberOfDesks: number;
}

export const DesksCatalog: React.FC<DesksCatalogProps> = ({
  children,
  numberOfDesks,
}) => {
  const isMobile = useMedia("(max-width: 600px)");

  return (
    <Droppable
      droppableId="Desks-Catalog"
      direction={isMobile ? "vertical" : "horizontal"}
    >
      {(provided) => (
        <Catalog
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="desksCatalog"
          data-testid="deskscatalog"
        >
          {children}
          {provided.placeholder}
          <CreateDesk index={numberOfDesks} />
        </Catalog>
      )}
    </Droppable>
  );
};
