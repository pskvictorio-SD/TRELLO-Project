import Link from "../ui/Link";

export default function AuthFooter() {
  return (
    <footer className="border-t bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        {/* Información */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p>
            © {new Date().getFullYear()} (Nombre del proyecto)
          </p>

          <span className="hidden md:block">•</span>

          <p>
            Diseñado y desarrollado por <span className="font-medium text-gray-700">Victorio Paskevicius</span>
          </p>

          <span className="hidden md:block">•</span>

          <p>v0.1.0 MVP</p>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/pskvictorio-SD"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/pskvictorio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/victoriopaskevicius"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}