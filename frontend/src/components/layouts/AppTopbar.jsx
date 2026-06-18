import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Link from "../ui/Link.jsx";
import Notifications from "../Notifications.jsx";
import useNotifications from "../../hooks/useNotifications.js";
import { useContext } from "react";
import { dataContext } from "../../contexts/dataContext.jsx";

import { useEffect } from "react";

export default function AppTopbar() {
  const { getBoardInvitations } = useNotifications();
  useEffect(() => {
    getBoardInvitations();
  }, []);

  // Obtener el nombre del usuario para crear avatar
  const { appData, setAppData } = useContext(dataContext);
  const username = appData?.workspace?.name.split(" ")[2] || "";

  return (
    <header className="h-16 shadow-lg flex items-center justify-around text-gray-200">
      {/* Left */}
      <div className="font-semibold">Dashboard</div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Botón crear */}
        <Button variant="primary">+ Crear Tablero</Button>

        <Notifications />

        {/* Avatar */}
        <Avatar src={"https://ui-avatars.com/api/?name=" + username} />

        <Link variant="default">Logout</Link>
      </div>
    </header>
  );
}
