import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import {
  getTasks,
  moveTask,
  createTask,
  updateTask,
  deleteTask,
  assignTask,
} from "../services/task.service.js";
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

  const handleCreateTasks = async (listId, task) => {
    const data = await createTask(boardId, listId, task);
  };

  const handleUpdateTasks = async (listId, taskId, task) => {
    const data = await updateTask(boardId, listId, taskId, task);
  };

  const handleMoveTasks = async (listId, taskId, newPosition, reorder) => {
    const data = await moveTask(boardId, listId, taskId, newPosition, reorder);
  };

  const handleDeleteTasks = async (listId, taskId) => {
    const data = await deleteTask(boardId, listId, taskId);
  };

  const handleAssignTask = async (listId, taskId, assignedTo) => {
    const data = await assignTask(boardId, listId, taskId, assignedTo);
  };

  return {
    fetchTasks,
    handleMoveTasks,
    handleCreateTasks,
    handleUpdateTasks,
    handleDeleteTasks,
    handleAssignTask,
  };
}
