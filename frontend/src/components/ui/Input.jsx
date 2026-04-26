import clsx from "clsx";

export default function Input({
  type = "text",
  name,
  variant = "base",
  placeholder,
  onChange,
  className = "",
  maxLength,
  ...props
}) {
  const variants = {
    base: "ring-1 ring-gray-300 px-4 py-2 rounded w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500",
    button:
      "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 px-6 py-2 rounded font-medium transition cursor-pointer",
  };

  return (
    <input
      className={clsx(`${variants[variant]}`)}
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      {...props}
    />
  );
}
