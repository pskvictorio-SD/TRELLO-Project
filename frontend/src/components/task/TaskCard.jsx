import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";

export default function TaskCard({ task }) {
  return (
    <div draggable className="cursor-grab active:cursor-grabbing">
      <Card
        size="fluid"
        className="hover:shadow-md transition"
      >
        <div className="flex flex-col gap-4">

          <div>
            <h3 className="font-semibold text-lg">
              {task.title}
            </h3>

            <p className="text-sm text-gray-500">
              {task.description || "Sin descripción"}
            </p>
          </div>

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