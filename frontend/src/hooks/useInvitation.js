import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import {
  createInvitation,
  fetchInvitations,
  updateInvitation
} from "../services/invitation.service.js";
import useFetch from "./useFetch.js";
import { useSearchParams } from "react-router-dom";

export default function useInvitation() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const [searchParams] = useSearchParams();

  const handleCreateInvitation = async (boardId, email) => {
    const data = await createInvitation(boardId, email);
  };

  const handleFetchInvitations = async () => {
    const data = await fetchInvitations();

    setAppData((prev) => ({
      ...prev,
      invitations: data.invitations,
    }));
  };

  const handleUpdateInvitation = async (invitationId, status) => {
    await updateInvitation(invitationId, status);
  };

  const handleDeleteInvitations = async () => {};

  return {
    handleCreateInvitation,
    handleFetchInvitations,
    handleUpdateInvitation,
  };
}
