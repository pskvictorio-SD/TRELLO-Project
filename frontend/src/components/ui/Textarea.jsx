export default function Textarea({ className = "", children }) {
  return (
    <textarea
      className={`bg-gray-300 px-6 py-2 rounded w-full shadow hover:shadow-lg ${className}`}
      placeholder={children}
    />
  );
}
