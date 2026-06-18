import AppLayout from "../layouts/AppLayout";
import BoardCard from "../components/board/BoardCard.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

import { dataContext } from "../contexts/dataContext.jsx";
import { useContext, useEffect } from "react";
import useWorkspace from "../hooks/useWorkspace.js";

import ModalRenderer from "../utils/ModalRenderer.jsx";
import useModal from "../hooks/useModal.js";
import useInvitation from "../hooks/useInvitation.js";

export default function Workspace() {
  const { appData, setAppData } = useContext(dataContext);
  const { fetchWorkspaceData } = useWorkspace();
  const { modal, openModal, closeModal } = useModal();

  useEffect(() => {
    setAppData(null);
    fetchWorkspaceData();
  }, []);

  const boards = appData?.workspace?.boards || [];

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Tus Tableros</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-3">
        <Card
          onClick={() => openModal("createBoard")}
          className="hover:scale-105 overflow-hidden cursor-pointer text-gray-200 border-2 border-dashed border-gray-700 h-fit max-w-fit"
          size="sm"
          bg="dark"
        >
          <h2 className="max-w-max">Crear un nuevo tablero +</h2>
        </Card>

        <ModalRenderer
          type={modal.type}
          isOpen={modal.isOpen}
          onClose={closeModal}
          data={modal.data}
        />

        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </section>
    </AppLayout>
  );
}
