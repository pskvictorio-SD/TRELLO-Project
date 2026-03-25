import AppLayout from "../layouts/AppLayout";
import BoardCard from "../components/board/BoardCard.jsx";

export default function Workspace() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Tus Workspaces
      </h1>

      <section className="gap-14 md:gap-2 p-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-sm p-1">
          <BoardCard
            board={{
              name: "BoardName",
              description: "BoardDescription",
              createdAt: "00/00/0000",
            }}
          />
        </div>
        <div className="rounded-sm p-1">
          <BoardCard
            board={{
              name: "BoardName",
              description: "BoardDescription",
              createdAt: "00/00/0000",
            }}
          />
        </div>
        <div className="rounded-sm p-1">
          <BoardCard
            board={{
              name: "BoardName",
              description: "BoardDescription",
              createdAt: "00/00/0000",
            }}
          />
        </div>
        <div className="rounded-sm p-1">
          <BoardCard
            board={{
              name: "BoardName",
              description: "BoardDescription",
              createdAt: "00/00/0000",
            }}
          />
        </div>
      </section>
    </AppLayout>
  );
}
