export default function Avatar({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`size-12 rounded-full ${className}`}
    />
  );
}