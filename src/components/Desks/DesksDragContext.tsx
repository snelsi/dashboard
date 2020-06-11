import * as React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { useDesks, useDeskIndex } from "utils/hooks";
import { compareIndex, moveElementInArray } from "utils/scripts";

interface DesksDragContextProps {}

export const DesksDragContext: React.FC<DesksDragContextProps> = ({
  children,
}) => {
  const { data } = useDesks();
  const [setDeskIndex] = useDeskIndex();

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    // If source and destination are the same, skip
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get array of desks after reorder
    const endArray = moveElementInArray(
      Array.from(data.desks).sort(compareIndex),
      source.index - 1,
      destination.index - 1
    );

    // Found desks with wrong index
    const desksWithWrongIndex = endArray
      .map((desk, i) => ({ ...desk, index: i + 1 }))
      .filter((desk, i) => desk.index !== endArray[i].index);

    // For each desk with wrong index, update index
    for (let desk of desksWithWrongIndex) {
      setDeskIndex({
        variables: { id: desk.id, index: desk.index },
        optimisticResponse: {
          update_desk: {
            id: desk.id,
            index: desk.index,
          },
        },
      });
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
