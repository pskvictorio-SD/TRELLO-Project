import { useState } from "react";
import TaskLists from "../components/task/taskLists.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

export default function Board() {
  const [lists, setLists] = useState([
    {
      id: "pending",
      name: "Pendiente",
      tasks: [
        {
          id: 1,
          name: "Task 1",
          description: "Task 1 description",
          priority: "Low",
          dueDate: "01/01/2023",
          isCompleted: false,
          createdAt: "01/01/2023",
        },
        {
          id: 2,
          name: "Task 2",
          description: "Task 2 description",
          priority: "Medium",
          dueDate: "01/01/2023",
          isCompleted: false,
          createdAt: "01/01/2023",
        },
        {
          id: 3,
          name: "Task 3",
          description: "Task 3 description",
          priority: "High",
          dueDate: "01/01/2023",
          isCompleted: false,
          createdAt: "01/01/2023",
        }
      ],
    },
    {
      id: "inProgress",
      name: "En proceso",
      tasks: [],
    },
    {
      id: "done",
      name: "Completado",
      tasks: [],
    },
  ]);

  const [draggedTask, setDraggedTask] = useState(null);

  return (
    <AppLayout>
      <div className="gap-14 md:gap-2 p-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {lists.map((list) => (
          <TaskLists
            key={list.id}
            list={list}
            lists={lists}
            setLists={setLists}
            setDraggedTask={setDraggedTask}
            draggedTask={draggedTask}
          />
        ))}
      </div>
    </AppLayout>
  );
}
