import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import {
  createList,
  getLists,
  editList,
  moveList,
  deleteList,
} from "../services/list.service.js";
import useFetch from "./useFetch.js";
import { useSearchParams } from "react-router-dom";

import { getTasks } from "../services/task.service.js";

export default function useLists() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const [searchParams] = useSearchParams();

  const boardId = searchParams.get("boardId");

  const fetchLists = async () => {
    const data = await getLists(boardId);
    // Fetch tasks
    for (const list of data.lists) {
      const tasksData = await getTasks(boardId, list.id);
      list.tasks = tasksData.tasks; // Assuming the response has a 'tasks' field
    }

    setAppData((prev) => ({
      ...prev,
      currentBoard: {
        ...prev.currentBoard,
        lists: data.lists,
      },
    }));
  };

  const handleCreateList = async (listName) => {
    const data = await request(() => createList(listName, boardId));
    if (data.ok) {
      fetchLists();
    }
  };

  const handleEditList = async (listName, listId) => {
    const data = await request(() => editList(boardId, listName, listId));
    if (data.ok) {
      fetchLists();
    }
  };

  const handleMoveList = async (listId, position, reorder) => {
    const data = await request(() =>
      moveList(boardId, listId, position, reorder),
    );
  };

  const handleDeleteList = async (listId) => {
    const data = await request(() => deleteList(boardId, listId));
    if (data.ok) {
      fetchLists();
    }
  };

  return {
    fetchLists,
    handleCreateList,
    handleEditList,
    handleMoveList,
    handleDeleteList,
  };
}
