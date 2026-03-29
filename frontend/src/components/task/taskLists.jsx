import TaskCard from "./TaskCard.jsx";
import Card from "../ui/Card.jsx";

export default function TaskLists({
  list,
  lists,
  setLists,
  draggedTask,
  setDraggedTask,
}) {
  const handleDrop = () => {
    if (!draggedTask) return;

    const newLists = lists.map((l) => {
      // eliminar de lista origen
      const filteredTasks = l.tasks.filter((t) => t.id !== draggedTask.id);

      return {
        ...l,
        tasks: filteredTasks,
      };
    });

    // agregar a lista destino
    const updatedLists = newLists.map((l) => {
      if (l.id === list.id) {
        return {
          ...l,
          tasks: [...l.tasks, draggedTask],
        };
      }
      return l;
    });

    setLists(updatedLists);
    setDraggedTask(null);
  };

  return (
    <div className="bg-gray-100 p-5 rounded-sm shadow-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-center mb-2 text-xl font-semibold">{list.name}</h2>

      <div className="flex flex-col gap-5">
        {list.tasks.map((task) => (
          <TaskCard key={task.id} task={task} setDraggedTask={setDraggedTask} />
        ))}
      </div>
    </div>
  );
}
