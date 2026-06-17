import clsx  from "clsx";

export default function Form({
  children,
  size = "md",
  className = "",
  onSubmit,
  bg = "dark",
  ...props
}) {

  const sizes = {
    sm: "w-sm",
    md: "w-md",
    lg: "w-lg",
    fluid: "w-full",
  };

  const bgs = {
    white: "bg-white text-gray-900",
    gray: "bg-gray-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    red: "bg-red-100",
    yellow: "bg-yellow-100",
    indigo: "bg-indigo-100",
    purple: "bg-purple-100",
    pink: "bg-pink-100",
    dark: "bg-gray-800 text-gray-200",
  };

  return (
    <form
      className={clsx(
        "shadow-md rounded-lg flex flex-col gap-5 overflow-hidden",
        `${sizes[size]}`,
        `${className}`,
        `${bgs[bg]}`,
      )}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  );
};
