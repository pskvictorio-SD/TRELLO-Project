import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";

import useLists from "../../hooks/useLists.js";
import { useState } from "react";

export default function CreateListModal({ isOpen, onClose }) {
  const { handleCreateList } = useLists();
  const [listName, setListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Subir board nuevo
    handleCreateList(listName);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-10 text-2xl font-bold">Crear una lista nueva</h2>

        <Form onSubmit={handleSubmit} size="fluid" className="gap-5 p-6">
          <fieldset>
            <label>Nombre de la lista</label>
            <Input
              onChange={(e) => setListName(e.target.value)}
              placeholder="Ej. Backlog"
              required
            />
          </fieldset>
          <Input type="submit" variant="button" />
        </Form>
      </Modal>
    </>
  );
}
