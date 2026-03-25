import AppTopbar from "../components/layouts/AppTopbar.jsx";
import AppSidebar from "../components/layouts/AppSidebar.jsx";
import AppFooter from "../components/layouts/AppFooter.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Topbar */}
      <AppTopbar />

      {/* Contenido principal */}
      <div className="flex flex-1 gap-5">

        {/* Sidebar */}
        <aside className="w-52 xl:w-72 hidden md:flex px-3 py-6 m-5 rounded App">
          <AppSidebar />
        </aside>

        {/* Main */}
        <main className="flex-1 px-6 py-6 m-5 rounded App">
          {children}
        </main>

      </div>

      {/* Footer */}
      <AppFooter />

    </div>
  );
}