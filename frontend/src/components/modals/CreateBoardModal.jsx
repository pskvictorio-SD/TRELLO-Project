import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";

import useBoards from "../../hooks/useBoards.js";
import { useState } from "react";

export default function CreateBoardModal({ isOpen, onClose }) {
  const { handleCreateBoard, handleGetBoards } = useBoards();
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Subir board nuevo
    handleCreateBoard(boardName, boardDescription);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-10 text-2xl font-bold">Crear un nuevo tablero</h2>

        <Form onSubmit={handleSubmit} size="fluid" className="gap-10 p-6">
          <fieldset>
            <label htmlFor="title">Titulo del tablero *</label>
            <Input
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Ej. Plan de Marketing"
            ></Input>
          </fieldset>
          <fieldset>
            <label htmlFor="description">Descripción</label>
            <Textarea
              onChange={(e) => setBoardDescription(e.target.value)}
              maxLength={130}
              placeholder="Describe berevemente el propósito de este tablero..."
            ></Textarea>
          </fieldset>

          <hr />

          <Input type="submit" variant="button" />
        </Form>
      </Modal>
    </>
  );
}
