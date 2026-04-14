import AppLayout from "../layouts/AppLayout";
import BoardCard from "../components/board/BoardCard.jsx";
import Card from "../components/ui/Card.jsx";
import Modal from "../components/ui/Modal.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";

import useFetch from "../hooks/useFetch.js";
import { getWorkspace } from "../services/workspace.service.js";
import { createBoard } from "../services/board.service.js";
import { useState, useContext, useEffect } from "react";

import { dataContext } from "../contexts/dataContext.jsx";

export default function Workspace() {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  // Modal
  const [open, setOpen] = useState(false);

  // Context
  const { appData, setAppData } = useContext(dataContext);

  const { request, loading, error } = useFetch();

  // Leer workspace y guardarlo en context
  const fetchWorkspace = async () => {
    const resWorkspace = await request(() => getWorkspace());
    setAppData(...appData, { workspace: resWorkspace.workspace });
  };
  useEffect(() => {
    fetchWorkspace();
  }, []);

  function newBoard() {
    const workspaceId = appData.workspace.id;
    createBoard(workspaceId, boardName, boardDescription);
    setOpen(false);
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Tus Tableros</h1>

      <section className="gap-14 md:gap-2 p-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-sm p-1 min-h-full">
          <Card onClick={() => setOpen(true)} className="cursor-pointer">
            <h2 className="h-full flex items-center justify-center">
              Crear un nuevo tablero +
            </h2>
          </Card>
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <Card size="fluid">
              <h1 className="text-3xl font-bold">Tablero nuevo</h1>

              <div className="flex flex-col">
                <label htmlFor="boardName">Nombre del tablero</label>
                <Input
                  onChange={(e) => setBoardName(e.target.value)}
                  placeholder="Ingrese el nombre del tablero"
                />
                <hr />
                <label htmlFor="boardDescription">
                  Descripcion del tablero
                </label>
                <Input
                  onChange={(e) => setBoardDescription(e.target.value)}
                  placeholder="Ingrese la descripcion del tablero"
                />
              </div>

              <Button onClick={newBoard}>Crear Tablero</Button>
            </Card>
          </Modal>
        </div>
      </section>
    </AppLayout>
  );
}
