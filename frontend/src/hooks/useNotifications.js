import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import useInvitation from "../hooks/useInvitation.js";

export default function useNotifications() {
  // Traer notificaciones
  const { appData, setAppData } = useContext(dataContext);
  const { handleFetchInvitations, handleUpdateInvitation } = useInvitation();

  // Traer notificaciones
  async function getBoardInvitations() {
    await handleFetchInvitations();
  }

  async function acceptInvitation(invitationId, boardId, role) {
    try {
      const newBoard = await handleUpdateInvitation(
        invitationId,
        "accepted",
        boardId,
        role,
      );

      // Optimistic update eliminando notification
      setAppData((prev) => ({
        ...prev,
        invitations: prev.invitations.filter(
          (invitation) => invitation.id !== invitationId,
        ),
        workspace: {
          ...prev.workspace,
          boards: [...prev.workspace.boards, newBoard],
        },
      }));
    } catch (error) {
      console.log(error);
    }
  }
  async function rejectInvitation(invitationId) {
    try {
      await handleUpdateInvitation(invitationId, "rejected");

      // Optimistic update eliminando notification
      setAppData((prev) => ({
        ...prev,
        invitations: prev.invitations.filter(
          (invitation) => invitation.id !== invitationId,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getBoardInvitations,
    acceptInvitation,
    rejectInvitation,
  };
}
