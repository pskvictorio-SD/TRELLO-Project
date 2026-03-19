export default function Textarea({ className = "", placeholder }) {
  const base =
    "bg-gray-300 px-4 py-2 rounded w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500";
  return (
    <textarea
      className={`${base} ${className}`}
      placeholder={placeholder}
    />
  );
}
