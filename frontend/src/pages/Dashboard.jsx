import AppLayout from "../layouts/AppLayout";
import Button from "../components/ui/Button";
import WorkspaceCard from "../components/workspace/WorkspaceCard.jsx";

export default function Dashboard() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Tus Workspaces</h1>

      <section className="gap-14 md:gap-2 p-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-sm p-1">
          <WorkspaceCard
            workspace={{
              name: "WorkspaceName",
              description: "WorkspaceDescription",
              creator: "Creater",
              createdAt: "00/00/0000",
            }}
          />
        </div>
        <div className="rounded-sm p-1">
          <WorkspaceCard
            workspace={{
              name: "WorkspaceName",
              description: "WorkspaceDescription",
              creator: "Creater",
              createdAt: "00/00/0000",
            }}
          />
        </div>
        <div className="rounded-sm p-1">
          <WorkspaceCard
            workspace={{
              name: "WorkspaceName",
              description: "WorkspaceDescription",
              creator: "Creater",
              createdAt: "00/00/0000",
            }}
          />
        </div>
        <div className="rounded-sm p-1">
          <WorkspaceCard
            workspace={{
              name: "WorkspaceName",
              description: "WorkspaceDescription",
              creator: "Creater",
              createdAt: "00/00/0000",
            }}
          />
        </div>
      </section>
    </AppLayout>
  );
}
