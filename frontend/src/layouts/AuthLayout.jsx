import AuthHeader from "../components/layouts/AuthHeader";
import AuthFooter from "../components/layouts/AuthFooter";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Header */}
      <header className="h-full">
        <AuthHeader />
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-full">
        <AuthFooter />
      </footer>
    </div>
  );
}
