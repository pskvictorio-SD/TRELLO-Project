import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export default function Dropdown({ title, children, variant }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    success: "bg-green-500 text-white",
    outline: "border border-gray-300 text-gray-900",
    input: "ring-1 ring-gray-300 px-4 py-2 rounded w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500",
  };

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
        type="button"
        onClick={toggleDropdown}
        className={clsx(
          "flex w-full items-center justify-between px-4 py-2 rounded-sm text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
          variants[variant],
        )}
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
        <div className="mt-2 w-full rounded-lg bg-white flex flex-col shadow-lg border border-gray-200 p-4">
          {children}
        </div>
      )}
    </div>
  );
}
