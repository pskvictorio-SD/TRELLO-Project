import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      {...listeners}
      className="cursor-grab active:cursor-grabbing hover:shadow-lg"
    >
      <Card style={style} size="fluid">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-medium">{task.title}</h3>
            <p className="text-gray-600 text-sm">
              {task.description ? task.description : "No description"}
            </p>
          </div>
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
