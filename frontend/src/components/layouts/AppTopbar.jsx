import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Link from "../ui/Link.jsx";
import Notifications from "../Notifications.jsx";
import useNotifications from "../../hooks/useNotifications.js";

import { useEffect } from "react";

export default function AppTopbar() {

  const { getBoardInvitations } = useNotifications();
  useEffect(() => {
    getBoardInvitations();
  }, []);

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
        <Avatar src="https://i.pravatar.cc/40" />

        <Link variant="ghost">Logout</Link>
      </div>
    </header>
  );
}
