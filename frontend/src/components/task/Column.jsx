import TaskCard from "./TaskCard.jsx";

export default function Column({ list }) {
  return (
    <div className="bg-gray-100 rounded-md p-4 w-72">
      <h2 className="font-bold mb-4">{list.title}</h2>

      <div className="flex flex-col gap-2">
        {list.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}