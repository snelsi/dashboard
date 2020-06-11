import * as React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { ITask } from "interfaces";

import { useDesk, useTaskIndex, useTaskGroupId } from "utils/hooks";
import {
  compareIndex,
  insertIntoArray,
  moveElementInArray,
} from "utils/scripts";

interface DeskDragContextProps {
  id: number;
}

export const DeskDragContext: React.FC<DeskDragContextProps> = ({
  id,
  children,
}) => {
  const { data } = useDesk(id);
  const [setTaskIndex] = useTaskIndex();
  const [setTaskGroupId] = useTaskGroupId();

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;

    // If source and destination are the same, skip
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let tasksWithWrongIndex = [];
    let wrongGroup;

    // Moved in one group
    if (destination.droppableId === source.droppableId) {
      // Get array of desks after reorder
      const endArray = moveElementInArray(
        Array.from(
          data.desk.groups.find(
            (group) => String(group.id) === source.droppableId
          ).tasks
        ).sort(compareIndex),
        source.index,
        destination.index
      );

      // Found tasks with wrong index
      tasksWithWrongIndex = endArray
        .map((task, i) => ({ ...task, index: i + 1 }))
        .filter((task, i) => task.index !== endArray[i].index);
    }
    // Moved from one group to another
    else {
      const fromArrayStart = data.desk.groups.find(
        (group) => String(group.id) === source.droppableId
      ).tasks;

      //  Moved element
      const element = fromArrayStart.find(
        (task) => String(task.id) === draggableId
      );

      const fromArrayEnd = fromArrayStart
        .filter((task) => String(task.id) !== draggableId)
        .sort(compareIndex);

      const wrongInFrom = fromArrayEnd
        .map((task, i) => ({ ...task, index: i + 1 }))
        .filter((task, i) => task.index !== fromArrayEnd[i].index);

      const toArrayStart = Array.from(
        data.desk.groups.find(
          (group) => String(group.id) === destination.droppableId
        ).tasks
      ).sort(compareIndex);

      const toArrayEnd = insertIntoArray<ITask>(
        toArrayStart,
        Number(destination.index),
        element
      );

      const wrongInTo = toArrayEnd
        .map((task, i) => ({ ...task, index: i + 1 }))
        .filter((task, i) => task.index !== toArrayEnd[i].index);

      // Tasks with wrong index
      tasksWithWrongIndex = [...wrongInFrom, ...wrongInTo];

      wrongGroup = {
        id: Number(draggableId),
        group_id: Number(destination.droppableId),
      };
    }

    // For each task with wrong index, update index
    for (let task of tasksWithWrongIndex) {
      setTaskIndex({
        variables: { id: task.id, index: task.index },
        optimisticResponse: {
          update_task: {
            id: task.id,
            index: task.index,
          },
        },
      });
    }

    // If element was moved between groups, update group_id
    if (wrongGroup) {
      setTaskGroupId({
        ...wrongGroup,
        old_group_id: source.droppableId,
      });
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
