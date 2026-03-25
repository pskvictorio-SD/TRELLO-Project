import clsx from "clsx";

export default function Card({
  children,
  size = "md",
  className = "",
  onclick,
  ...props
}) {
  const sizes = {
    sm: "w-sm",
    md: "w-md",
    lg: "w-lg",
    fluid: "w-full",
  };

  return (
    <div
      className={clsx(
        "bg-white shadow-md rounded-lg p-6 flex flex-col gap-5",
        `${sizes[size]}`,
        `${className}`,
      )}
      onClick={onclick}
      {...props}
    >
      {children}
    </div>
  );
}
