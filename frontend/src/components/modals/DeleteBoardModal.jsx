import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";

import useBoards from "../../hooks/useBoards.js";
import { useState } from "react";

export default function DeleteBoardModal({ isOpen, onClose, boardId }) {
  const { handleDeleteBoard, handleGetBoards } = useBoards();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Eliminar board

    handleDeleteBoard(boardId);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-10 text-2xl font-bold">Estas seguro que deseas eliminar este tablero?</h2>

        <Form onSubmit={(e) => handleSubmit(e)} size="fluid" className="gap-10 p-6">
          <Input value="Eliminar" type="submit" variant="buttonDanger" />
        </Form>
      </Modal>
    </>
  );
}
