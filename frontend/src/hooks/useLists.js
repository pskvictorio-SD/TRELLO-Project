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

  const handleEditList = async (board) => {};

  const handleDeleteList = async (boardId) => {};

  return {
    fetchLists,
    handleCreateList,
    handleEditList,
    handleDeleteList,
  };
}
