import AppTopbar from "../components/layouts/AppTopbar.jsx";
import AppSidebar from "../components/layouts/AppSidebar.jsx";
import AppFooter from "../components/layouts/AppFooter.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Contenido principal */}
      <div className="min-h-screen w-full relative">
        {/* Dark Dot Matrix */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundColor: "#0a0a0a",
            backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
            backgroundSize: "10px 10px",
            imageRendering: "pixelated",
          }}
        />
        {/* Topbar */}
        <AppTopbar />

        <div className="flex flex-1 gap-5 min-h-screen">
          {/* Sidebar */}
          {/* <aside
            style={{
              backgroundColor: "#0a0a0a",
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
                radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
              `,
              backgroundSize: "10px 10px",
              imageRendering: "pixelated",
            }}
            className="w-52 xl:w-72 hidden md:flex px-3 py-6 m-5 rounded text-gray-300"
          >
            <AppSidebar />
          </aside> */}

          {/* Main */}
          <main
            style={{
              backgroundColor: "#0a0a0a",
              backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
              backgroundSize: "10px 10px",
              imageRendering: "pixelated",
            }}
            className="w-full flex flex-col gap-5 sm:p-6 m-5 rounded"
          >
            {children}
          </main>
        </div>
        {/* Footer */}
        <AppFooter />
      </div>
    </div>
  );
}
