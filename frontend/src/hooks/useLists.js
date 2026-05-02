import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import {} from "../services/list.service.js";
import useFetch from "./useFetch.js";

export default function useLists() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const workspaceId = appData?.workspace?.id;

  const handleGetLists = async () => {};

  const handleCreateList = async (boardName, boardDescription) => {};

  const handleEditList = async (board) => {};

  const handleDeleteList = async (boardId) => {};

  return {};
}
