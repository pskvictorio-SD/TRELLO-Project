import { useState } from "react";

export const useDragAndDrop = (initialDraggable) => {
  const [draggable, setDraggable] = useState(initialDraggable);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDrop = (droppableId) => {
    if (!draggedItem) return;

    setDraggable((prevDraggable) => {
      return prevDraggable.map((draggableItem) => {
        if (draggableItem.id === draggedItem.id) {
          return { ...draggableItem, list_id: droppableId };
        }
        return draggableItem;
      });
    });
  };

  const handleReorderTasks = (draggableId) => {
    if (!draggedItem) return;
    if (draggableId === draggedItem.id) return;

    const oldIndex = draggable.findIndex(
      (dragItem) => dragItem.id === draggedItem.id,
    );
    const newIndex = draggable.findIndex(
      (dragItem) => dragItem.id === draggableId,
    );

    setDraggable((prevDraggable) => {
      const newDraggable = [...prevDraggable];
      newDraggable.splice(newIndex, 0, newDraggable.splice(oldIndex, 1)[0]);
      return newDraggable;
    });
  };

  return {
    draggable,
    setDraggedItem,
    handleDrop,
    handleReorderTasks,
  };
};
