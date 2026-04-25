import clsx from "clsx";

function Badge({ children, onClick, variant = "default", size = "sm", className = "" }) {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-200 text-green-800",
    warning: "bg-yellow-200 text-yellow-800",
    danger: "bg-red-200 text-red-800",
    info: "bg-blue-200 text-blue-800",
    purple: "bg-purple-200 text-purple-800",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  };

  return (
    <span
    onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-1 rounded-full font-medium",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
