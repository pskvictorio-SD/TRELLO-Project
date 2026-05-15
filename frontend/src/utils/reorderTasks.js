import { arrayMove } from "@dnd-kit/sortable";

export const reorderTasks = async (
  e,
  tasks,
  setTasks,
  list,
  fetchTasks,
  handleMoveTasks,
) => {
  const { active, over } = e;

  // 🛑 evitar crash
  if (!over) return;

  // misma lista
  if (active.id === over.id) return;

  // indices
  const oldIndex = tasks.findIndex((task) => task.id === active.id);

  const newIndex = tasks.findIndex((task) => task.id === over.id);

  // 🟢 optimistic update
  const updatedTasks = arrayMove(tasks, oldIndex, newIndex);

  setTasks(updatedTasks);

  // Tarea movida
  const movedTask = tasks.find((task) => task.id === active.id);

  // tarea destino
  const targetTask = tasks.find((task) => task.id === over.id);

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
  await handleMoveTasks(list.id, active.id, newPosition, reorder);

  // refrescar backend
  // await fetchTasks();
};
