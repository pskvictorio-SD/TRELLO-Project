import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import { getTasks, moveTask } from "../services/task.service.js";
import useFetch from "./useFetch.js";
import { useSearchParams } from "react-router-dom";

export default function useTasks() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const [searchParams] = useSearchParams();

  const boardId = searchParams.get("boardId");

  const fetchTasks = async () => {
    const data = await getTasks(boardId);
  };

  const handleCreateTasks = async () => {};

  const handleEditTasks = async () => {};

  const handleMoveTasks = async (listId, taskId, newPosition, reorder) => {
    const data = await moveTask(boardId, listId, taskId, newPosition, reorder);
  };

  const handleDeleteTasks = async () => {};

  return {
    fetchTasks,
    handleMoveTasks,
  };
}
