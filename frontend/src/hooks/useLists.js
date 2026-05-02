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

export default function useLists() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const boardId = appData?.currentBoard?.id;

  const handleGetLists = async () => {
    const data = await getLists(boardId);
    console.log(data);
  };

  const handleCreateList = async (listName) => {
    const data = await request(() => createList(listName, boardId));
    if (data.ok) {
      handleGetLists();
    }
  };

  const handleEditList = async (board) => {};

  const handleDeleteList = async (boardId) => {};

  return {
    handleGetLists,
    handleCreateList,
    handleEditList,
    handleDeleteList,
  };
}
