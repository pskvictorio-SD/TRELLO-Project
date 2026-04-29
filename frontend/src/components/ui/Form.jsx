import clsx  from "clsx";

export default function Form({
  children,
  size = "md",
  className = "",
  onSubmit,
  ...props
}) {

  const sizes = {
    sm: "w-sm",
    md: "w-md",
    lg: "w-lg",
    fluid: "w-full",
  };

  return (
    <form
      className={clsx(
        "bg-white shadow-md rounded-lg flex flex-col gap-5 overflow-hidden",
        `${sizes[size]}`,
        `${className}`,
      )}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  );
};
