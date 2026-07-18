import Link from "../ui/Link";

export default function AppFooter() {
  return (
    <footer className="flex items-center justify-around text-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Información */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p>© {new Date().getFullYear()} TU EQUIPO</p>

          <span className="hidden md:block">•</span>

          <p>
            Diseñado y desarrollado por{" "}
            <span className="font-medium">Victorio Paskevicius</span>
          </p>

          <span className="hidden md:block">•</span>

          <p>v1.0.0 MVP</p>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/pskvictorio-SD"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-500"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/pskvictorio/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-500"
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/victoriopaskevicius"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-500"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
