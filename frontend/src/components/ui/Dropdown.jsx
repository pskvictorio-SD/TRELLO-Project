import { useState, useRef, useEffect } from "react";

export default function Dropdown({ title, children }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  // cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {title}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200 p-4">
          {children}
        </div>
      )}
    </div>
  );
}
