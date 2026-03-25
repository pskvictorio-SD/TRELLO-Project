import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";

export default function TaskCard({ task }) {
  return (
    <Card size="fluid" className="">
      <div
        className="flex flex-col gap-5"
      >
        <div className="">
          <h3>{task.name}</h3>
          <p>{task.description}</p>
        </div>
        <div className="flex flex-col gap-2 items-start">
            <Badge variant="danger"><b>priority:</b> {task.priority}</Badge>
            <Badge variant="info"><b>due date:</b> {task.dueDate}</Badge>
            <Badge variant="info"><b>Is completed:</b> {task.isCompleted}</Badge>
            <Badge variant="info"><b>Created at:</b> {task.createdAt}</Badge>
        </div>
      </div>
    </Card>
  );
}
