import { useState } from "react";

export default function useDragAndDrop(pushColumns, columns) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppableItem, setDroppableItem] = useState(null);

  const handleDragStart = (e, draggableId) => {
    setDraggedItem(draggableId);
  };

  const handleDragOver = (e, listId) => {
    e.preventDefault();
    setDroppableItem(listId);
    handleReorderColumns();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDroppableItem(null);
    setDraggedItem(null);
  };

  const handleReorderColumns = () => {
    const draggedItemIndex = columns.findIndex(
      (column) => column.id === draggedItem,
    );
    const droppableItemIndex = columns.findIndex(
      (column) => column.id === droppableItem,
    );

    if (draggedItemIndex === -1 || droppableItemIndex === -1) return;
    if (draggedItemIndex === droppableItemIndex) return;

    let newColumns = [...columns];
    const [draggedColumn] = newColumns.splice(draggedItemIndex, 1);
    newColumns.splice(droppableItemIndex, 0, draggedColumn);

    pushColumns(newColumns);
  };
  const handleReorderItems = () => {};

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleReorderColumns,
  };
}
