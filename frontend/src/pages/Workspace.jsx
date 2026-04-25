import AppLayout from "../layouts/AppLayout";
import BoardCard from "../components/board/BoardCard.jsx";
import Card from "../components/ui/Card.jsx";
import { useContext, useState, useEffect } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import useWorkspace from "../hooks/useWorkspace.js";
import useBoards from "../hooks/useBoards.js";
import { CreateBoardModal } from "../components/modal/modalBoard";

export default function Workspace() {
  const { appData, setAppData } = useContext(dataContext);
  const [open, setOpen] = useState(false);

  const { handleGetWorkspace } = useWorkspace();
  const { handleGetBoards, handleCreateBoard, handleEditBoards } = useBoards();

  // Fetch a workspace
  useEffect(() => {
    handleGetWorkspace();
  }, []);
  // Fetch a boards
  useEffect(() => {
    if (appData?.workspace) {
      handleGetBoards();
    }
  }, [appData?.workspace]);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Tus Tableros</h1>

      <section className="gap-14 md:gap-2 p-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-sm p-1 min-h-full">
          <Card
            onclick={() => setOpen(true)}
            className="cursor-pointer"
            size="sm"
          >
            <h2 className="h-full flex items-center justify-center">
              Crear un nuevo tablero +
            </h2>
          </Card>

          <CreateBoardModal isOpen={open} setOpen={setOpen} />

          <div>
            {appData?.boards?.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
