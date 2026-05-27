import { arrayMove } from "@dnd-kit/sortable";
import useReorder from "../utils/useReorder.js";

const { reorderTasks, reorderLists, moveTask } = useReorder();

export const handleDragEnd = (
  e,
  lists,
  setAppData,
  fetchLists,
  handleMoveList,
  handleMoveTasks,
) => {
  const { active, over } = e;

  // 🛑 evitar crash
  if (!over) return;

  const activeType = active.data.current.type;
  const overType = over.data.current.type;

  // mover listas
  if (activeType === "list" && overType === "list") {
    reorderLists(active, over, lists, setAppData, fetchLists, handleMoveList);
  }

  // mover tareas
  if (activeType === "task") {
    reorderTasks(active, over, lists, setAppData, handleMoveTasks);
  }

  // Mover tareas entre listas
  if (activeType === "task" && overType === "list") {
    moveTask(active, over, lists, setAppData, handleMoveTasks);
  }
};
