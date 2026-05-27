import { arrayMove } from "@dnd-kit/sortable";

function useReorder() {
  const reorderTasks = async (
    active,
    over,
    lists,
    setAppData,
    handleMoveTasks,
  ) => {
    // 🛑 evitar crash
    if (!over) return;

    // 🛑 evitar reorder si es el mismo elemento
    if (active.id === over.id) return;

    // Lista contenedora de tareas
    const list = lists.find((list) =>
      list.tasks.some((task) => task.id == active.id.slice(5)),
    );
    // indices
    const oldIndex = list.tasks.findIndex(
      (task) => task.id == active.id.slice(5),
    );
    const newIndex = list.tasks.findIndex(
      (task) => task.id == over.id.slice(5),
    );

    // 🟢 optimistic update
    const updatedTasks = arrayMove(list.tasks, oldIndex, newIndex);

    setAppData((prev) => ({
      ...prev,
      currentBoard: {
        ...prev.currentBoard,
        lists: lists.map((list) => {
          if (list.id === prev.currentBoard.lists[0].id) {
            return {
              ...list,
              tasks: updatedTasks,
            };
          }
          return list;
        }),
      },
    }));

    // Tarea movida
    const movedTask = list.tasks.find((task) => task.id == active.id.slice(5));
    // tarea destino
    const targetTask = list.tasks.find((task) => task.id == over.id.slice(5));

    if (!movedTask || !targetTask) return;

    // posiciones vecinas
    const before = updatedTasks[newIndex - 1];
    const after = updatedTasks[newIndex + 1];

    let newPosition;

    // mover al inicio
    if (!before) {
      newPosition = targetTask.position / 2;
    }
    // mover al final
    else if (!after) {
      newPosition = targetTask.position + 10;
    }
    // mover en medio
    else {
      newPosition = (before.position + after.position) / 2;
    }

    // detectar colisión cuando la posicion sea 1 mayor o 1 menor
    const reorder = updatedTasks.some(
      (task) =>
        task.position === newPosition + 1 || task.position === newPosition - 1,
    );

    // persistir backend
    await handleMoveTasks(list.id, active.id.slice(5), newPosition, reorder);

    // refrescar backend
    // await fetchTasks();
  };

  const moveTask = async (active, over, lists, setAppData, handleMoveTasks) => {
    const taskId = active.id.slice(5);
    const listId = over.id.slice(5);

    // 🛑 evitar crash
    if (!over) return;

    // Lista de origen
    const sourceList = lists.find((list) =>
      list.tasks.some((task) => task.id == taskId),
    );
    // tarea a mover
    const targetTask = sourceList.tasks.filter((task) => task.id == taskId)[0];
    // Cambiar id de tarea
    targetTask.list_id = Number(listId);

    // Eliminar tarea de la lista de origen
    sourceList.tasks = sourceList.tasks.filter((task) => task.id != taskId);

    // Lista de destino
    const targetList = lists.find((list) => list.id == listId);

    const newLists = lists.map((list) => {
      if (list.id === targetList.id) {
        return {
          ...list,
          tasks: [...list.tasks, targetTask],
        };
      }
      return list;
    });

    setAppData((prev) => ({
      ...prev,
      currentBoard: {
        ...prev.currentBoard,
        lists: newLists,
      },
    }));

    // Hacer fetch de la tarea movida
    await handleMoveTasks(listId, taskId, targetTask.position, false);
  };

  const reorderLists = async (
    active,
    over,
    lists,
    setAppData,
    fetchLists,
    handleMoveList,
  ) => {
    // 🛑 evitar crash
    if (!over) return;

    // misma lista
    if (active.id === over.id) return;

    // indices
    const oldIndex = lists.findIndex((list) => list.id == active.id.slice(5));
    const newIndex = lists.findIndex((list) => list.id == over.id.slice(5));

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
    const movedList = lists.find((list) => list.id == active.id.slice(5));
    // lista destino
    const targetList = lists.find((list) => list.id == over.id.slice(5));

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
    await handleMoveList(active.id.slice(5), newPosition, reorder);

    // refrescar backend
    await fetchLists();
  };

  return { reorderTasks, reorderLists, moveTask };
}

export default useReorder;
