import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";

import { useState } from "react";
import useLists from "../../hooks/useLists.js";

export default function EditListModal({ isOpen, onClose, data }) {
  const [newListName, setNewListName] = useState(data.listName);

  const handleNameChange = (e) => {
    setNewListName(e.target.value);
  };

  const { handleEditList } = useLists();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Subir board nuevo
    handleEditList(newListName, data.listId);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-10 text-2xl font-bold">Editar lista</h2>

        <Form
          onSubmit={(e) => handleSubmit(e)}
          size="fluid"
          className="gap-10 p-6"
        >
          <fieldset>
            <label htmlFor="title">nombre de lista *</label>
            <Input
              placeholder="Ej. Backlog"
              value={newListName}
              onChange={handleNameChange}
            ></Input>
          </fieldset>

          <Input type="submit" variant="button" />
        </Form>
      </Modal>
    </>
  );
}
