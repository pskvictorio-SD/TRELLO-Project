import { useState, useEffect, use } from "react";
import TaskLists from "../components/task/taskLists.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

export default function Board() {
  const [lists, setLists] = useState([
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
  ]);

  const [tasks, setTasks] = useState([
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
  ]);

  const [draggedTask, setDraggedTask] = useState(null);

  const handleDrop = (listId) => {
    if (!draggedTask) return;

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === draggedTask.id) {
          return { ...task, list_id: listId };
        }
        return task;
      });
    });
  };

  const handleReorderTasks = (taskId) => {
    if (!draggedTask) return;
    if (taskId === draggedTask.id) return;

    // Funcion para reordenar tareas dentro de la misma lista
    const oldIndex = tasks.findIndex((t) => t.id === draggedTask.id);
    const newIndex = tasks.findIndex((t) => t.id === taskId);

    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(newIndex, 0, newTasks.splice(oldIndex, 1)[0]);
      return newTasks;
    });
  };

  return (
    <AppLayout>
      <div className="gap-14 md:gap-2 p-3 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {lists.map((list) => (
          <TaskLists
            key={list.id}
            list={list}
            tasks={tasks}
            setTasks={setTasks}
            setDraggedTask={setDraggedTask}
            draggedTask={draggedTask}
            handleDrop={handleDrop}
            handleReorderTasks={handleReorderTasks}
          ></TaskLists>
        ))}
      </div>
    </AppLayout>
  );
}
