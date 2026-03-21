import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button.jsx";

export default function AuthHeader() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;  

  return (
    <header className="h-full flex shadow-xl border-b bg-white">
      <div className="w-full mx-auto px-6 py-4 flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-around">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          TrelloClone
        </Link>

        {/* Navegación */}
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/login">
            {isActive("/login") ? (
              <Button>Login</Button>
            ) : (
              <Button variant="secondary">Login</Button>
            )}
          </Link>

          <Link to="/register">
            {isActive("/register") ? (
              <Button>Register</Button>
            ) : (
              <Button variant="secondary">Register</Button>
            )}
          </Link>
        </nav>

        <Link to="/register">
          <Button>Empezar gratis</Button>
        </Link>
      </div>
    </header>
  );
}
