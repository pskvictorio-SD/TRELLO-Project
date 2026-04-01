import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import { motion } from "motion/react";

export default function TaskCard({ task, setDraggedTask, handleReorderTasks }) {
  return (
    <div
      draggable
      onDragStart={() => setDraggedTask(task)}
      onDragOver={(e) => {
        e.preventDefault();
        handleReorderTasks(task.id);
      }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card size="fluid">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-medium">{task.title}</h3>
            <p className="text-gray-600 text-sm">
              {task.description ? task.description : "No description"}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-baseline-last">
            <Badge variant="danger">
              <b>priority:</b> {task.priority ? task.priority : "No priority"}
            </Badge>
            <Badge variant="info">
              <b>due date:</b> {task.due_date ? task.due_date : "No due date"}
            </Badge>
            <Badge variant="info">
              <b>Created at:</b> {task.created_at}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
