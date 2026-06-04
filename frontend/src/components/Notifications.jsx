import { useState, useRef, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Button from "./ui/Button.jsx";

import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";

import useNotifications from "../hooks/useNotifications.js";

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { appData, setAppData } = useContext(dataContext);

  const { acceptInvitation, rejectInvitation } = useNotifications();

  const notifications = appData?.invitations || [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition"
      >
        <IoMdNotificationsOutline size={24} />

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-semibold">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Notificaciones</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">
                No tienes notificaciones
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <h4 className="font-bold text-lg text-gray-800">
                    {notification.boardTitle}
                  </h4>

                  <p className=" text-gray-500 mt-1">
                    <strong>{notification.senderName}</strong> te ha invitado a
                    unirte a este tablero
                  </p>

                  <div className="flex gap-2 mt-3 justify-end">
                    <Button
                      onClick={() =>
                        acceptInvitation(
                          notification.id,
                          notification.board_id,
                          notification.role,
                        )
                      }
                    >
                      Aceptar
                    </Button>
                    <Button
                      onClick={() => rejectInvitation(notification.id)}
                      variant="secondary"
                    >
                      Rechazar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
