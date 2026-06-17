import clsx from "clsx";

export default function Card({
  children,
  size = "md",
  className = "",
  onClick,
  bg = "white",
  ...props
}) {
  const sizes = {
    sm: "w-sm",
    md: "w-md",
    lg: "w-lg",
    fluid: "w-full",
  };

  const bgs = {
    white: "bg-white",
    gray: "bg-gray-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    red: "bg-red-100",
    yellow: "bg-yellow-100",
    indigo: "bg-indigo-100",
    purple: "bg-purple-100",
    pink: "bg-pink-100",
    dark: "bg-gray-900 text-gray-200",
    dark_light: "bg-gray-800 text-gray-200",
  };



  return (
    <div
      className={clsx(
        "shadow-md rounded-lg p-6 flex flex-col gap-5 overflow-hidden",
        `${sizes[size]}`,
        `${className}`,
        `${bgs[bg]}`,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
