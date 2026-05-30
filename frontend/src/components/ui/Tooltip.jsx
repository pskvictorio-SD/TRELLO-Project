import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Tooltip({ children, content, delay }) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timeout;

    if (showTooltip) {
      timeout = setTimeout(() => {
        setShowTooltip("visible");
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [showTooltip]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      <div
        className={`
          p-1
          absolute
          left-1/2
          top-full
          mt-2

          -translate-x-1/2

          rounded-md
          bg-gray-900

          text-sm
          text-white

          shadow-lg

          transition-all
          duration-200

          pointer-events-none
          z-50

          max-w-xs
          whitespace-normal
          break-words

          ${showTooltip === "visible" ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        {content}

        <div
          className="
            absolute
            bottom-full
            left-1/2
            -translate-x-1/2

            border-8
            border-transparent
            border-b-gray-900
          "
        />
      </div>
    </div>
  );
}
