import TaskCard from "./TaskCard.jsx";

import trash_svg from "../../public/trash.svg";

import { MdDragIndicator } from "react-icons/md";

export default function TaskLists({
  list,
  tasks,
  openModal,
}) {
  const handleEditList = () => {
    openModal("editList", {
      listId: list.id,
      listName: list.name,
    });
  };

  const handleDeleteList = () => {
    openModal("deleteList", list.id);
  };

  return (
    <section className="bg-white rounded-md shadow-md p-4 min-w-72 flex flex-col gap-4">

      {/* Header */}
      <header className="flex items-center justify-between">

        <button
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <MdDragIndicator className="text-xl" />
        </button>

        <h2
          onClick={handleEditList}
          className="font-semibold text-lg cursor-pointer hover:text-blue-500 transition"
        >
          {list.name}
        </h2>

        <button
          onClick={handleDeleteList}
          className="p-2 rounded-md hover:bg-red-100 transition"
        >
          <img
            className="h-4 w-4"
            src={trash_svg}
            alt="Eliminar lista"
          />
        </button>
      </header>

      {/* Tasks */}
      <div className="flex flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p className="text-sm text-gray-400">
            No hay tareas
          </p>
        )}
      </div>
    </section>
  );
}