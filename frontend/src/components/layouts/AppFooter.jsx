import Link from "../ui/Link";

export default function AppFooter() {
  return (
    <footer className="h-full flex shadow-xl border-b bg-white">
      <div className="w-full mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-around gap-2 text-sm text-gray-500">
        {/* Left */}
        <p className="">
          © {new Date().getFullYear()} TrelloClone. Todos los derechos
          reservados.
        </p>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link to="#" variant="default">Privacidad</Link>

          <Link to="#" variant="default">Términos</Link>

          <Link to="#" variant="default">Soporte</Link>
        </div>
      </div>
    </footer>
  );
}