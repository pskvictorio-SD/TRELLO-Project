import AppLayout from "../layouts/AppLayout";
import BoardCard from "../components/board/BoardCard.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

import { dataContext } from "../contexts/dataContext.jsx";
import { useContext, useEffect } from "react";
import useWorkspace from "../hooks/useWorkspace.js";
import useBoards from "../hooks/useBoards.js";

import ModalRenderer from "../utils/ModalRenderer.jsx";
import useModal from "../hooks/useModal.js";

export default function Workspace() {
  const { appData } = useContext(dataContext);
  const { handleGetBoards } = useBoards();
  const { fetchWorkspaceData } = useWorkspace();
  const { modal, openModal, closeModal } = useModal();

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  const boards = appData?.workspace?.boards || [];

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Tus Tableros</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-3">
        <Card
          onClick={() => openModal("createBoard")}
          className="cursor-pointer flex items-center justify-center"
          size="sm"
        >
          <h2>Crear un nuevo tablero +</h2>
        </Card>

        <ModalRenderer
          type={modal.type}
          isOpen={modal.isOpen}
          onClose={closeModal}
          data={modal.data}
        />

        {boards.length === 0 ? (
          <div className="col-span-full text-center space-y-4">
            <h2 className="text-2xl font-bold">Aún no tienes tableros</h2>

            <Button onClick={() => openModal("createBoard")} variant="primary">
              Crear mi primer tablero +
            </Button>
          </div>
        ) : (
          boards.map((board) => <BoardCard key={board.id} board={board} />)
        )}
      </section>
    </AppLayout>
  );
}
