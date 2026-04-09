import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";

export default function Link({
  to,
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const variants = {
    default: "text-gray-600 hover:text-blue-500",
    primary: "text-blue-500 hover:text-blue-700",
    muted: "text-gray-500 hover:text-gray-700",
    underline: "text-gray-600 hover:underline",
  };

  return (
    <RouterLink
      to={to}
      className={clsx(
        "text-md font-medium",
        `${variants[variant]}`,
        `${className}`,
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
