import Link from "../ui/Link.jsx";
import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";

export default function AppSidebar({ className = "" }) {
  return (
    <aside className={`flex flex-col ${className}`}>
      {/* Logo {{  }}*/}
      <div className="h-16 flex items-center px-6 font-bold text-lg border-b border-gray-800">
        Nombre del workspace
      </div>

      {/* Navegación */}
      <nav className="flex-1 flex flex-col px-4 py-4 space-y-2">
        {/* Dropdown workspaces */}
        <Dropdown title="Workspaces">
          <ul className="flex flex-col gap-2">
            <Link to="#">
              <Button className="w-full" variant="secondary">
                Workspace 1
              </Button>
            </Link>
            <Link to="#">
              <Button className="w-full" variant="secondary">
                Workspace 2
              </Button>
            </Link>
          </ul>
        </Dropdown>

        {/* Dropdown boards */}
        <Dropdown title="Boards">
          <ul className="flex flex-col gap-2">
            <Link to="#">
              <Button className="w-full" variant="secondary">
                Board 1
              </Button>
            </Link>
            <Link to="#">
              <Button className="w-full" variant="secondary">
                Board 2
              </Button>
            </Link>
          </ul>
        </Dropdown>

        {/* Dropdown tasks to do */}
        <Dropdown title="Tasks to do">
          <ul className="flex flex-col gap-2">
            <Link to="#">
              <Button className="w-full" variant="secondary">
                Task 1
              </Button>
            </Link>
            <Link to="#">
              <Button className="w-full" variant="secondary">
                Task 2
              </Button>
            </Link>
          </ul>
        </Dropdown>

        <hr />

        <ul className="px-5">
          <li className="">
            <Link to="/components">Settings</Link>
          </li>
          <li className="">
            <Link to="/components">Logout</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
