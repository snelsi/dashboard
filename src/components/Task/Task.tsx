import * as React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import type { ITask } from "interfaces";
import { EditTaskModalForm, Status } from "components/Task";

interface TaskProps {
  task: ITask;
  index: number;
}

const Wrapper = styled.div`
  background-color: rgba(248, 248, 250, 1);
  border-radius: 0.25em;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.2);

  cursor: pointer;

  color: #172b4d;
  padding: 0.5em 1em;
  position: relative;
  overflow: hidden;

  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Tag = styled.div`
  bottom: 0px;
  font-weight: 700;
  font-size: 24px;
  opacity: 0.15;
  position: absolute;
  right: 16px;
  user-select: none;
  z-index: 0;
`;

export const Task: React.FC<TaskProps> = ({ task, index }) => {
  const [mode, setMode] = React.useState(false);

  return (
    <>
      <Draggable draggableId={String(task.id)} index={index}>
        {(provided) => (
          <Wrapper
            className="task"
            onClick={() => setMode(true)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Tag>{task.id}</Tag>
            <Status data-status={task.status} />
            <div>{task.description}</div>
          </Wrapper>
        )}
      </Draggable>
      <EditTaskModalForm
        isOpen={mode}
        closeModal={() => setMode(false)}
        id={task.id}
        initialDescription={task.description}
        initialStatus={task.status}
      />
    </>
  );
};
