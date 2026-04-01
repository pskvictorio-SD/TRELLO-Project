import { useState } from "react";

export const useDragAndDrop = () => {
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

  return {
    lists,
    tasks,
    draggedTask,
    setDraggedTask,
    handleDrop,
    handleReorderTasks,
  }
};
