import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";
import Dropdown from "../ui/Dropdown.jsx";

import { useState } from "react";
import useTasks from "../../hooks/useTasks.js";

export default function CreateTaskModal({ isOpen, onClose, listId }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("high");
  const [taskDueDate, setTaskDueDate] = useState("");

  const { handleCreateTasks } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Subir board nuevo
    handleCreateTasks(listId, {
      title: taskName,
      description: taskDescription,
      priority: taskPriority,
      dueDate: taskDueDate,
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-8 text-2xl font-bold">Crear una nueva tarea</h2>

        <Form onSubmit={handleSubmit} size="lg" className="p-4">
          <fieldset className="flex flex-col gap-6">
            {/* TITULO */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Título de la tarea*</label>

              <Input
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Ej. Crear un componente de tareas"
                required
              />
            </div>

            {/* DESCRIPCION */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Descripción de la tarea</label>

              <Input
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Ej. Crear un componente de tareas que..."
              />
            </div>

            {/* PRIORIDAD */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Prioridad de la tarea</label>

              <Dropdown title={taskPriority} variant="input">
                <ul className="flex flex-col gap-2">
                  <Button
                    onClick={(e) => setTaskPriority("high")}
                    className="w-full"
                  >
                    Alta
                  </Button>

                  <Button
                    onClick={(e) => setTaskPriority("medium")}
                    className="w-full"
                  >
                    Media
                  </Button>

                  <Button
                    onClick={(e) => setTaskPriority("low")}
                    className="w-full"
                  >
                    Baja
                  </Button>
                </ul>
              </Dropdown>
            </div>

            {/* FECHA */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Fecha de entrega</label>

              <Input
                type="date"
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>

            {/* SUBMIT */}
            <Input type="submit" variant="button" value="Crear tarea" />
          </fieldset>
        </Form>
      </Modal>
    </>
  );
}
