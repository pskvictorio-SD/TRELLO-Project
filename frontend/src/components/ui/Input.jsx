export default function Input({
  type = "text",
  placeholder,
  onChange,
  className = "",
  ...props
}) {
  const base =
    "bg-gray-300 px-4 py-2 rounded w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className={`${base} ${className}`}
      {...props}
    />
  );
}
