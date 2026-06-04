import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import {
  createInvitation,
  fetchInvitations,
  updateInvitation,
} from "../services/invitation.service.js";
import useMembers from "./useMembers.js";
import useFetch from "./useFetch.js";
import { useSearchParams } from "react-router-dom";

export default function useInvitation() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const [searchParams] = useSearchParams();

  const { handleAddMember } = useMembers();

  const handleCreateInvitation = async (boardId, email, role) => {
    const data = await createInvitation(boardId, email, role);
  };

  const handleFetchInvitations = async () => {
    const data = await fetchInvitations();

    setAppData((prev) => ({
      ...prev,
      invitations: data.invitations,
    }));
  };

  const handleUpdateInvitation = async (
    invitationId,
    status,
    boardId,
    role,
  ) => {
    try {
      const data = await updateInvitation(invitationId, status);

      if (status === "accepted" && data.ok) {
        const newBoard = await handleAddMember(boardId, role);
        return newBoard;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteInvitations = async () => {};

  return {
    handleCreateInvitation,
    handleFetchInvitations,
    handleUpdateInvitation,
  };
}
