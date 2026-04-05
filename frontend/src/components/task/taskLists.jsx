import TaskCard from "./TaskCard.jsx";

export default function TaskLists({
  list,
  tasks,
  setDraggedItem,
  handleDrop,
  handleReorderTasks,
}) {

  return (
    <div
      className="bg-gray-100 p-5 rounded-sm shadow-lg"
      onDragOver={(e) => {
        e.preventDefault();
        handleDrop(list.id);
      }}
    >
      
      <h2 className="text-center mb-3 text-xl font-semibold">{list.name}</h2>

      <div className="flex flex-col gap-5">
        {tasks.map((task) => {
          if (task.list_id !== list.id) return null;
          return (
            <TaskCard
              key={task.id}
              task={task}
              setDraggedItem={setDraggedItem}
              handleReorderTasks={handleReorderTasks}
            />
          );
        })}
      </div>
    </div>
  );
}
