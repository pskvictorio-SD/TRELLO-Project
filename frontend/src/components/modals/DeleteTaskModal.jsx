import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";

import useLists from "../../hooks/useLists.js";
import useTasks from "../../hooks/useTasks.js";
import { useState } from "react";

export default function DeleteTaskModal({ isOpen, onClose, data }) {
  const { fetchLists } = useLists();
  const { handleDeleteTasks } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Eliminar board
    await handleDeleteTasks(data.listId, data.taskId);

    await fetchLists();

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-10 text-2xl font-bold">
          ¿Estás seguro de que deseas eliminar esta tarea?
        </h2>

        <Form onSubmit={(e) => handleSubmit(e)} size="fluid" className="gap-10">
          <Input value="Eliminar" type="submit" variant="buttonDanger" />
        </Form>
      </Modal>
    </>
  );
}
