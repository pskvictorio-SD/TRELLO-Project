import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Tooltip from "../ui/Tooltip.jsx";
import Button from "../ui/Button.jsx";

import { CiEdit } from "react-icons/ci";
import { MdDragIndicator } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

import { useSortable } from "@dnd-kit/sortable";

import useModal from "../../hooks/useModal.js";
import ModalRenderer from "../../utils/ModalRenderer.jsx";
import useMembers from "../../hooks/useMembers.js";
import useTasks from "../../hooks/useTasks.js";
import useLists from "../../hooks/useLists.js";
import Dropdown from "../ui/Dropdown.jsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function TaskCard({ task, currentUserRole }) {
  const [members, setMembers] = useState([]);
  const { handleGetMembersOfBoard } = useMembers();
  const { handleAssignTask } = useTasks();
  const { fetchLists } = useLists();
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");

  useEffect(() => {
    if (currentUserRole === "admin" && boardId) {
      handleGetMembersOfBoard(boardId)
        .then((data) => setMembers(data.members))
        .catch(() => setMembers([]));
    }
  }, [currentUserRole, boardId]);

  const handleQuickAssign = async (memberId) => {
    await handleAssignTask(task.list_id, task.id, memberId || null);
    await fetchLists();
  };

  // Solo admin/member pueden mover tareas; viewer queda sin permiso
  const canDragTask =
    currentUserRole === "admin" || currentUserRole === "member";

  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id: `task-${task.id}`,
    disabled: !canDragTask,
    data: {
      type: "task",
      task,
      listId: task.list_id,
    },
  });

  const style = {
    borderRight: isOver ? "1px solid var(--color-secondary-dark)" : "none",
  };

  const { modal, openModal, closeModal } = useModal();

  const dragHandle = (
    <button
      {...(canDragTask ? listeners : {})}
      disabled={!canDragTask}
      className={`

        p-2
        rounded-md
        ${canDragTask ? "hover:bg-blue-900 text-inherit" : "text-gray-600"}

        mr-2

        opacity-0
        -translate-x-2

        group-hover:opacity-100
        group-hover:translate-x-0

        transition-all
        duration-200

        ${canDragTask ? "cursor-grab active:cursor-grabbing" : "cursor-not-allowed"}
      `}
    >
      <MdDragIndicator />
    </button>
  );

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        className="
        group
        transition-all
        duration-300
        hover:shadow-lg
      "
      >
        <Card style={style} size="fluid" bg="dark_light">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              {/* DRAG */}
              {canDragTask ? (
                dragHandle
              ) : (
                <Tooltip
                  content="No tenés permisos para mover tareas"
                  delay={200}
                >
                  {dragHandle}
                </Tooltip>
              )}

              {/* CONTENIDO */}
              <div
                className="
                flex-1
                min-w-0

                transition-all
                duration-200

                -translate-x-10
                group-hover:-translate-x-3
              "
              >
                <h3
                  title={task.title}
                  className="
                  text-md
                  font-semibold
                  line-clamp-4
                  wrap-break-word
                  w-32
                "
                >
                  {task.title}
                </h3>
                <p
                  title={task.description}
                  className="
                  text-gray-400
                  text-sm
                  italic

                  line-clamp-4
                  wrap-break-word
                "
                >
                  {task.description ? task.description : null}
                </p>
              </div>

              {/* EDIT */}
              <div className="flex flex-col">
                <button
                  onClick={() =>
                    openModal("editTask", {
                      taskId: task.id,
                      listId: task.list_id,
                      title: task.title,
                      description: task.description,
                      priority: task.priority,
                      dueDate: task.due_date,
                      assignedTo: task.assigned_to?.id || "",
                    })
                  }
                  className="
                p-2
                rounded-md
                hover:bg-blue-900
                hover:scale-110

                opacity-0
                translate-x-2

                group-hover:opacity-100
                group-hover:translate-x-0
              "
                >
                  <CiEdit size={22} />
                </button>
                <button
                  onClick={() =>
                    openModal("deleteTask", {
                      taskId: task.id,
                      listId: task.list_id,
                    })
                  }
                  className="
                p-2
                rounded-md
                hover:bg-blue-900
                hover:scale-110

                opacity-0
                translate-x-2

                group-hover:opacity-100
                group-hover:translate-x-0
              "
                >
                  <AiOutlineDelete size={22} />
                </button>
              </div>
            </div>

            {/* BADGES */}
            <div className="flex flex-col gap-2 items-baseline-last">
              {task.assigned_to ? (
                <Badge variant="success">
                  <p>
                    <strong>Asignado a: </strong> {task.assigned_to.username}
                  </p>
                </Badge>
              ) : null}

              {currentUserRole === "admin" && (
                <Dropdown
                  title={
                    <span className="flex items-center gap-1">
                      <FaUserPlus /> Asignar
                    </span>
                  }
                  variant="outline"
                >
                  <ul className="flex flex-col gap-2">
                    <Button
                      type="button"
                      className="w-full"
                      variant="outline"
                      onClick={() => handleQuickAssign("")}
                    >
                      Sin asignar
                    </Button>
                    {members.map((member) => (
                      <Button
                        key={member.id}
                        type="button"
                        className="w-full"
                        variant="outline"
                        onClick={() => handleQuickAssign(member.id)}
                      >
                        {member.username}
                      </Button>
                    ))}
                  </ul>
                </Dropdown>
              )}

              <Badge variant="danger">
                <b>Prioridad:</b> {task.priority ? task.priority : null}
              </Badge>

              <Badge variant="info">
                <b>Creado:</b> {task.created_at.slice(0, 10)}
              </Badge>

              {task.due_date ? (
                <Badge variant="info">
                  <p>
                    <b>Fecha límite:</b> {task.due_date.slice(0, 10)}
                  </p>
                </Badge>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
      <ModalRenderer
        type={modal.type}
        isOpen={modal.isOpen}
        onClose={closeModal}
        data={modal.data}
      />
    </>
  );
}
