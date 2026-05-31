import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import { fetchInvitations } from "../services/invitation.service.js";

export default function useNotifications() {
  // Traer notificaciones
  const { appData, setAppData } = useContext(dataContext);

  // Traer notificaciones
  async function getBoardInvitations() {
    const invitations = await fetchInvitations();
    setAppData((prev) => ({
      ...prev,
      invitations: invitations.invitations,
    }));
  }

  return {
    getBoardInvitations,
  };
}
