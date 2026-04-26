import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";
import { useState } from "react";

export default function EditBoardModal({ isOpen, onClose, board }) {
  const [newBoardTitle, setNewBoardTitle] = useState(board.title);
  const [newBoardDescription, setNewBoardDescription] = useState(
    board.description,
  );

  const handleTitleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setNewBoardDescription(e.target.value);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-10 text-2xl font-bold">Editar tablero</h2>

        <Form size="fluid" className="gap-10">
          <fieldset>
            <label htmlFor="title">Titulo del tablero *</label>
            <Input
              value={newBoardTitle}
              onChange={handleTitleChange}
              placeholder="Ej. Plan de Marketing"
            ></Input>
          </fieldset>
          <fieldset>
            <label htmlFor="description">Descripción</label>
            <Textarea
              value={newBoardDescription}
              onChange={handleDescChange}
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
