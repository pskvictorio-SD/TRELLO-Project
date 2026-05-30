import { useState, useRef, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Button from "./ui/Button.jsx";

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "Proyecto Frontend",
      message: "Juan te invitó a un tablero",
    },
    {
      id: 2,
      title: "Proyecto Backend",
      message: "María te invitó a un tablero",
    },
    {
      id: 3,
      title: "Proyecto Frontend",
      message: "Juan te invitó a un tablero",
    },
    {
      id: 4,
      title: "Proyecto Backend",
      message: "María te invitó a un tablero",
    },
    {
      id: 5,
      title: "Proyecto Frontend",
      message: "Juan te invitó a un tablero",
    },
    {
      id: 6,
      title: "Proyecto Backend",
      message: "María te invitó a un tablero",
    },
  ];

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
            <h3 className="font-semibold text-gray-800">
              Notificaciones
            </h3>
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
                  <h4 className="font-medium text-gray-800">
                    {notification.title}
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    {notification.message}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <Button>
                      Aceptar
                    </Button>

                    <Button variant="secondary">
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