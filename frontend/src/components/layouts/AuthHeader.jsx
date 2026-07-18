import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button.jsx";

export default function AuthHeader() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="h-full flex shadow-xl border-b bg-white">
      <div className="w-full mx-auto px-6 py-4 flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-around">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <p className="text-3xl font-extrabold tracking-[0.2em] uppercase bg-gradient-to-r from-black via-slate-800 to-blue-600 bg-clip-text text-transparent">
            TU EQUIPO
          </p>
          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-black to-blue-600"></div>
        </div>
        {/* Navegación */}
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/">
            {isActive("/") ? (
              <Button>Login</Button>
            ) : (
              <Button variant="secondary">Login</Button>
            )}
          </Link>

          <Link to="/auth/register">
            {isActive("/auth/register") ? (
              <Button>Register</Button>
            ) : (
              <Button variant="secondary">Register</Button>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
