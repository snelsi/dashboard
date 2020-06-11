import * as React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { useDesk, useTaskIndex } from "utils/hooks";
import { compareIndex, moveElementInArray } from "utils/scripts";

interface DeskDragContextProps {
  id: number;
}

export const DeskDragContext: React.FC<DeskDragContextProps> = ({
  id,
  children,
}) => {
  const { data } = useDesk(id);
  const [setTaskIndex] = useTaskIndex();

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    // If source and destination are the same, skip
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

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
      const tasksWithWrongIndex = endArray
        .map((task, i) => ({ ...task, index: i + 1 }))
        .filter((task, i) => task.index !== endArray[i].index);

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
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
