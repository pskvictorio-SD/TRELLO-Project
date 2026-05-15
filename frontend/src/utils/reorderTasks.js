import { arrayMove } from "@dnd-kit/sortable";

export const reorderTasks = async (e, tasks, setTasks) => {
  const { active, over } = e;
  // Reordenar tareas
  const oldIndex = tasks.findIndex((task) => task.id === active.id);
  const newIndex = tasks.findIndex((task) => task.id === over.id);
  const updatedTasks = arrayMove(tasks, oldIndex, newIndex);
  setTasks(updatedTasks);
};
