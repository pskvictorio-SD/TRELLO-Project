import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";
import Dropdown from "../ui/Dropdown.jsx";

import { useState, useEffect } from "react";
import useTasks from "../../hooks/useTasks.js";
import useLists from "../../hooks/useLists.js";
import useMembers from "../../hooks/useMembers.js";
import { useSearchParams } from "react-router-dom";

export default function CreateTaskModal({ isOpen, onClose, listId }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("high");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [members, setMembers] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  const { handleCreateTasks } = useTasks();
  const { fetchLists } = useLists();
  const { handleGetMembersOfBoard } = useMembers();
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");

  useEffect(() => {
    if (isOpen && boardId) {
      handleGetMembersOfBoard(boardId)
        .then((data) => {
          setMembers(data.members);
          setCurrentUserRole(data.currentUserRole);
        })
        .catch(() => {
          setMembers([]);
          setCurrentUserRole(null);
        });
    }
  }, [isOpen, boardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Subir board nuevo
    await handleCreateTasks(listId, {
      title: taskName,
      description: taskDescription,
      priority: taskPriority,
      dueDate: taskDueDate,
      assignedTo: assignedTo || null,
    });

    // Cargar listas
    await fetchLists();

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

            {/* ASIGNADO A (solo admin) */}
            {currentUserRole === "admin" && (
              <div className="flex flex-col gap-2">
                <label className="font-medium">Asignar a</label>

                <Dropdown
                  title={
                    members.find((m) => m.id === Number(assignedTo))
                      ?.username || "Selecciona un miembro"
                  }
                  variant="input"
                >
                  <ul className="flex flex-col gap-2">
                    <Button
                      type="button"
                      className="w-full"
                      variant="outline"
                      onClick={() => setAssignedTo("")}
                    >
                      Sin asignar
                    </Button>
                    {members.map((member) => (
                      <Button
                        key={member.id}
                        type="button"
                        className="w-full"
                        variant="outline"
                        onClick={() => setAssignedTo(member.id)}
                      >
                        {member.username}
                      </Button>
                    ))}
                  </ul>
                </Dropdown>
              </div>
            )}

            {/* PRIORIDAD */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Prioridad de la tarea</label>

              <Dropdown title={taskPriority} variant="input">
                <ul className="flex flex-col gap-2">
                  <Button
                    onClick={() => setTaskPriority("high")}
                    className="w-full"
                  >
                    Alta
                  </Button>

                  <Button
                    onClick={() => setTaskPriority("medium")}
                    className="w-full"
                  >
                    Media
                  </Button>

                  <Button
                    onClick={() => setTaskPriority("low")}
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
