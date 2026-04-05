import TaskLists from "../components/task/taskLists.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import { useDragAndDrop } from "../hooks/useDragAndDrop.js";

export default function Board() {
  let lists = [
    {
      id: 22,
      board_id: 9,
      name: "Pendiente",
      position: 20,
    },
    {
      id: 21,
      board_id: 9,
      name: "En proceso",
      position: 25,
    },
    {
      id: 23,
      board_id: 9,
      name: "Completado",
      position: 30,
    },
  ];

  let tasks = [
    {
      id: 10,
      list_id: 22,
      title: "Primera tarea 1",
      description: "",
      priority: "medium",
      due_date: null,
      is_completed: 0,
      created_by: 6,
      created_at: "2026-03-05T20:28:10.000Z",
    },
    {
      id: 9,
      list_id: 22,
      title: "Segunda tarea 2",
      description: "Lorem ipsum",
      priority: "high",
      due_date: null,
      is_completed: 0,
      created_by: 6,
      created_at: "2026-03-05T20:27:40.000Z",
    },
    {
      id: 11,
      list_id: 22,
      title: "Tercera tarea 3",
      description: "",
      priority: "high",
      due_date: null,
      is_completed: 0,
      created_by: 6,
      created_at: "2026-03-05T20:28:21.000Z",
    },
  ];

  // Drag & Drop Tasks
  const { draggable, setDraggedItem, handleDrop, handleReorderTasks } =
    useDragAndDrop(tasks);

  return (
    <AppLayout>
      <div className="gap-14 md:gap-2 p-3 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {lists.map((list) => (
          <TaskLists
            key={list.id}
            list={list}
            tasks={draggable}
            setDraggedItem={setDraggedItem}
            handleDrop={handleDrop}
            handleReorderTasks={handleReorderTasks}
          ></TaskLists>
        ))}
      </div>
    </AppLayout>
  );
}
