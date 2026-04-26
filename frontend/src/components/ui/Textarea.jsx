export default function Textarea({
  className = "",
  placeholder,
  maxLength,
  value,
  onChange,
}) {
  const base =
    "ring-1 ring-gray-300 px-4 py-2 rounded w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500";
  return (
    <textarea
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={`${base} ${className}`}
      placeholder={placeholder}
    />
  );
}
