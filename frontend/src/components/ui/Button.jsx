import clsx from "clsx";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    secondary: "bg-gray-300 text-black hover:bg-gray-400 active:bg-gray-500",
    edit: "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700",
    delete: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-6 py-2 rounded text-sm font-medium transition cursor-pointer",
        `${variants[variant]}`,
        `${className}`,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
