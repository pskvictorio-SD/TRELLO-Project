export default function AuthFooter() {
  return (
    <footer className="h-full flex border-t bg-white">
      <div className="w-full mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-around gap-2 text-sm text-gray-500">
        {/* Left */}
        <p>
          © {new Date().getFullYear()} TrelloClone. Todos los derechos
          reservados.
        </p>

        {/* Right */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-blue-500">
            Privacidad
          </a>

          <a href="#" className="hover:text-blue-500">
            Términos
          </a>

          <a href="#" className="hover:text-blue-500">
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
}
