import AppLayout from "../layouts/AppLayout";
import BoardCard from "../components/board/BoardCard.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import EditBoardModal from "../components/modals/EditBoardModal.jsx";

import { useContext, useState, useEffect, use } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import useWorkspace from "../hooks/useWorkspace.js";
import useBoards from "../hooks/useBoards.js";

import handleModal from "../utils/handleModalBoard.jsx";
import useModal from "../hooks/useModal.js";

export default function Workspace() {
  const { appData, setAppData } = useContext(dataContext);
  const { handleGetBoards } = useBoards();
  const { handleGetWorkspace } = useWorkspace();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    handleGetWorkspace();
  }, []);

  useEffect(() => {
    if (appData?.workspace) {
      handleGetBoards();
    }
  }, [appData.workspace]);


  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Tus Tableros</h1>

      <section className="gap-14 md:gap-2 p-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-sm p-1 min-h-full w-full">
          <Card onclick={openModal} className="cursor-pointer" size="sm">
            <h2 className="h-full flex items-center justify-center">
              Crear un nuevo tablero +
            </h2>
          </Card>

          {handleModal("createBoard", isOpen, closeModal)}

          {appData?.workspace && appData?.boards?.length === 0 ? (
            <>
              <h2 className="text-2xl font-bold">
                Aun no tienes tableros. Crea uno
              </h2>
              <Button variant="primary" className="font-medium">
                Crear mi primer tablero +
              </Button>
            </>
          ) : (
            <div>
              {appData?.boards?.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
