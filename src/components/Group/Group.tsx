import * as React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import type { IGroup } from "interfaces";
import { compareIndex } from "utils";

import { Task, CreateTask } from "components/Task";
import { Header } from "components/Group";

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
  border-radius: 4px;
  border: none;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0.5em;

  & > div.task {
    margin-bottom: 12px;
  }

  & .trashButton {
    opacity: 0;
  }
  &:hover .trashButton {
    opacity: 1;
  }

  margin-right: 16px;
  width: 280px;

  @media (max-width: 600px) {
    margin-right: 0px;
    margin-bottom: 16px;
    width: 100%;
  }
`;

interface GroupProps {
  group: IGroup;
}

export const Group: React.FC<GroupProps> = ({ group }) => (
  <Droppable droppableId={String(group.id)}>
    {(provided) => (
      <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
        <Header group={group} />
        {Array.from(group.tasks)
          .sort(compareIndex)
          .map((task, index) => (
            <Task task={task} key={task.id} index={index} />
          ))}
        {provided.placeholder}
        <CreateTask group_id={group.id} index={group.tasks.length} />
      </Wrapper>
    )}
  </Droppable>
);
