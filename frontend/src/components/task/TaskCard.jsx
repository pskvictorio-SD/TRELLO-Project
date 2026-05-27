import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";

import { CiEdit } from "react-icons/ci";
import { MdDragIndicator } from "react-icons/md";

import { useSortable } from "@dnd-kit/sortable";

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

  return (
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
      <Card style={style} size="fluid">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            {/* DRAG */}
            <button
              {...listeners}
              className="

                p-2
                rounded-md
                hover:bg-blue-100
                cursor-grab
                active:cursor-grabbing
                hover:scale-110

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
                  text-lg
                  font-medium
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
                  text-gray-600
                  text-sm
                  italic

                  line-clamp-4
                  wrap-break-word
                "
              >
                {task.description ? task.description : "No description"}
              </p>
            </div>

            {/* EDIT */}
            <button
              onClick={() => console.log(task.id)}
              className="
                p-2
                rounded-md
                hover:bg-orange-100
                hover:scale-110

                opacity-0
                translate-x-2

                group-hover:opacity-100
                group-hover:translate-x-0

                transition-all
                duration-200
              "
            >
              <CiEdit size={22} />
            </button>
          </div>

          {/* BADGES */}
          <div className="flex flex-col gap-2 items-baseline-last">
            <Badge variant="danger">
              <b>Priority:</b> {task.priority ? task.priority : "No priority"}
            </Badge>

            <Badge variant="info">
              <b>Created at:</b> {task.created_at.slice(0, 10)}
            </Badge>

            <Badge variant="info">
              <b>Due date:</b>{" "}
              {task.due_date ? task.due_date.slice(0, 10) : "No due date"}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
