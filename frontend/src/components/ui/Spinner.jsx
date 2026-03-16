export default function Spinner({ className = "" }) {
  return (
    <div
      className={`size-7 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin ${className}`}
    />
  );
}
