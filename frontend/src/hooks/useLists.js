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

export default function useLists() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const [searchParams] = useSearchParams();

  const boardId = searchParams.get("boardId");

  const fetchLists = async () => {
    const data = await getLists(boardId);

    setAppData((prev) => ({
      ...prev,
      currentBoard: {
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
