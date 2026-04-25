import Modal from "../ui/Modal.jsx";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

import { useEffect, useState, useContext } from "react";
import useModal from "../../hooks/useModal.js";

import { dataContext } from "../../contexts/dataContext.jsx";

export const CreateBoardModal = ({ isOpen, setOpen }) => {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const { handleCreateNewBoard } = useModal();
  const { appData, setAppData } = useContext(dataContext);

  useEffect(() => {
    setOpen(false);
    setBoardName("");
    setBoardDescription("");
  }, [appData.boards]);

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <Card size="fluid">
        <h1 className="text-3xl font-bold">Crear tablero</h1>

        <div className="flex flex-col">
          <label htmlFor="boardName">Nombre del tablero</label>
          <Input
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Ingrese el nombre del tablero"
          />
          <hr />
          <label htmlFor="boardDescription">Descripcion del tablero</label>
          <Input
            maxLength={60}
            onChange={(e) => setBoardDescription(e.target.value)}
            placeholder="Maximo 60 caracteres"
          />
        </div>
        <Button
          onClick={() => handleCreateNewBoard(boardName, boardDescription)}
        >
          Crear +
        </Button>
      </Card>
    </Modal>
  );
};

export const EditBoardModal = (boardId) => {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const { handleEditNewBoard } = useModal();
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <Card size="fluid">
        <h1 className="text-3xl font-bold">Crear tablero</h1>

        <div className="flex flex-col">
          <label htmlFor="boardName">Nombre del tablero</label>
          <Input
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Ingrese el nombre del tablero"
          />
          <hr />
          <label htmlFor="boardDescription">Descripcion del tablero</label>
          <Input
            maxLength={60}
            onChange={(e) => setBoardDescription(e.target.value)}
            placeholder="Maximo 60 caracteres"
          />
        </div>
        <Button
          onClick={() =>
            handleEditNewBoard(boardId, boardName, boardDescription)
          }
        >
          Crear +
        </Button>
      </Card>
    </Modal>
  );
};
