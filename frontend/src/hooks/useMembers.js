import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import {
    addMember,
} from "../services/member.service.js";
import useFetch from "./useFetch.js";

export default function useMembers() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const workspaceId = appData?.workspace?.id;

  const handleAddMember = async (boardId, email, role) => {
    const data = await request(() => addMember(boardId, email, role));
    if (!data.ok) {
        console.log(data.error)
        throw new Error(data.error);
    }
  };

  const handleGetBoards = async (userId) => {};

  const handleChangeRole = async (board, userId) => {};

  const handleDeleteMember = async (boardId, userId) => {};

  return {
    handleAddMember,
    handleGetBoards,
    handleChangeRole,
    handleDeleteMember,
  };
}
