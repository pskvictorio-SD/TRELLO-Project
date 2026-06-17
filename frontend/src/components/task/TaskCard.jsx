import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Tooltip from "../ui/Tooltip.jsx";

import { CiEdit } from "react-icons/ci";
import { MdDragIndicator } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

import { useSortable } from "@dnd-kit/sortable";

import useModal from "../../hooks/useModal.js";
import ModalRenderer from "../../utils/ModalRenderer.jsx";

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id: `task-${task.id}`,
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
              <button
                {...listeners}
                className="

                p-2
                rounded-md
                hover:bg-blue-900
                cursor-grab
                active:cursor-grabbing

                mr-2

                opacity-0
                -translate-x-2

                group-hover:opacity-100
                group-hover:translate-x-0

                transition-all
                duration-200
              "
              >
                <MdDragIndicator />
              </button>

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
              <Badge variant="danger">
                <b>Priority:</b> {task.priority ? task.priority : null}
              </Badge>

              <Badge variant="info">
                <b>Created at:</b> {task.created_at.slice(0, 10)}
              </Badge>

              {task.due_date ? (
                <Badge variant="info">
                  <p>
                    <b>Due date:</b> {task.due_date.slice(0, 10)}
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
