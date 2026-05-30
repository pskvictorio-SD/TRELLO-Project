import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";
import Dropdown from "../ui/Dropdown.jsx";

import { useState } from "react";
import useTasks from "../../hooks/useTasks.js";
import useLists from "../../hooks/useLists.js";

export default function EditTaskModal({ isOpen, onClose, data }) {
  const date = data.dueDate == null ? null : data.dueDate.split("T")[0];
  const [taskName, setTaskName] = useState(data.title);
  const [taskDescription, setTaskDescription] = useState(data.description);
  const [taskPriority, setTaskPriority] = useState(data.priority);
  const [taskDueDate, setTaskDueDate] = useState(date);

  const { handleUpdateTasks } = useTasks();
  const { fetchLists } = useLists();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Subir tarea editada

    await handleUpdateTasks(data.listId, data.taskId, {
      title: taskName,
      description: taskDescription,
      priority: taskPriority,
      dueDate: taskDueDate,
    });

    // Cargar listas
    await fetchLists();

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-8 text-2xl font-bold">Editar tarea</h2>

        <Form onSubmit={handleSubmit} size="lg" className="p-4">
          <fieldset className="flex flex-col gap-6">
            {/* TITULO */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Título de la tarea</label>

              <Input
                onChange={(e) => setTaskName(e.target.value)}
                value={taskName}
                placeholder="Ej. Crear un componente de tareas"
                required
              />
            </div>

            {/* DESCRIPCION */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Descripción de la tarea</label>

              <Input
                onChange={(e) => setTaskDescription(e.target.value)}
                value={taskDescription}
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
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>

            {/* SUBMIT */}
            <Input type="submit" variant="button" value="Guardar" />
          </fieldset>
        </Form>
      </Modal>
    </>
  );
}
