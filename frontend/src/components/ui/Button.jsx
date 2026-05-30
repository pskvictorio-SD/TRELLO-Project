import clsx from "clsx";

export default function Button({
  type = "button",
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    secondary: "bg-gray-300 text-black hover:bg-gray-400 active:bg-gray-500",
    success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
    edit: "bg-yellow-400 text-white hover:bg-yellow-600 active:bg-yellow-700",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
    transparent:
      "bg-transparent text-black hover:bg-gray-50 active:bg-gray-100",

    outline: "border border-gray-300 text-gray-900 hover:bg-gray-50 active:bg-gray-100 active:ring-2 active:ring-blue-500 hover:border-gray-400 active:border-gray-500",
  };

  return (
    <button
      type={type}
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
