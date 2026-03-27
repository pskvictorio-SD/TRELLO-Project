import TaskCard from "./TaskCard.jsx";

export default function TaskLists({ name, tasks }) {
  return (
    <div className="App h-fit px-2 py-5">
      <h2 className="text-center mb-5 text-2xl font-medium">{name}</h2>
      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
