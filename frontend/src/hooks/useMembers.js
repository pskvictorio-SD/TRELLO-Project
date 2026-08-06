import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import { addMember, getMembers } from "../services/member.service.js";
import useFetch from "./useFetch.js";
import useBoards from "./useBoards.js";

export default function useMembers() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const workspaceId = appData?.workspace?.id;

  const { handleFetchBoards } = useBoards();

  const handleAddMember = async (boardId, role) => {
    const data = await request(() => addMember(boardId, role));

    if (data === false) {
      throw new Error("Error al agregar miembro");
    }

    return data.board;
  };

  const handleGetMembersOfBoard = async (boardId) => {
    const data = await request(() => getMembers(boardId));

    if (data === false) {
      throw new Error("Error al obtener miembros");
    }

    return {
      members: data.members,
      currentUserRole: data.currentUserRole,
    };
  };

  const handleChangeRole = async (board, userId) => {};

  const handleDeleteMember = async (boardId, userId) => {};

  return {
    handleAddMember,
    handleGetMembersOfBoard,
    handleChangeRole,
    handleDeleteMember,
  };
}
