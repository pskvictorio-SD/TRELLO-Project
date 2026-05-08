import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        cursor-grab active:cursor-grabbing
        ${isDragging ? "opacity-50" : ""}
      `}
    >
      <Card
        size="fluid"
        className="hover:shadow-md transition"
      >
        <div className="flex flex-col gap-4">

          {/* Content */}
          <div>
            <h3 className="font-semibold text-lg">
              {task.title}
            </h3>

            <p className="text-sm text-gray-500">
              {task.description || "Sin descripción"}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-2">

            <Badge variant="danger">
              {task.priority || "No priority"}
            </Badge>

            <Badge variant="info">
              {task.due_date || "No due date"}
            </Badge>

          </div>

        </div>
      </Card>
    </div>
  );
}