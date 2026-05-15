import { arrayMove } from "@dnd-kit/sortable";

export const reorderLists = async (
  e,
  lists,
  setAppData,
  fetchLists,
  handleMoveList,
) => {
  const { active, over } = e;
  // 🛑 evitar crash
  if (!over) return;

  // misma lista
  if (active.id === over.id) return;

  // indices
  const oldIndex = lists.findIndex((list) => list.id === active.id);

  const newIndex = lists.findIndex((list) => list.id === over.id);

  // 🟢 optimistic update
  const updatedLists = arrayMove(lists, oldIndex, newIndex);

  setAppData((prev) => ({
    ...prev,
    currentBoard: {
      ...prev.currentBoard,
      lists: updatedLists,
    },
  }));

  // lista movida
  const movedList = lists.find((list) => list.id === active.id);

  // lista destino
  const targetList = lists.find((list) => list.id === over.id);

  if (!movedList || !targetList) return;

  // posiciones vecinas
  const before = updatedLists[newIndex - 1];
  const after = updatedLists[newIndex + 1];

  let newPosition;

  // mover al inicio
  if (!before) {
    newPosition = targetList.position / 2;
  }
  // mover al final
  else if (!after) {
    newPosition = targetList.position + 10;
  }
  // mover en medio
  else {
    newPosition = (before.position + after.position) / 2;
  }

  // detectar colisión cuando la posicion sea 1 mayor o 1 menor
  const reorder = updatedLists.some(
    (list) =>
      list.position === newPosition + 1 || list.position === newPosition - 1,
  );

  // persistir backend
  await handleMoveList(active.id, newPosition, reorder);

  // refrescar backend
  await fetchLists();
};
