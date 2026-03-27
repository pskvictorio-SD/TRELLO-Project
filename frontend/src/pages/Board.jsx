import AppLayout from "../layouts/AppLayout";
import TaskLists from "../components/task/taskLists";

export default function Board() {
  const lists = [
    {
      id: 1,
      name: "Pendientes",
      tasks: [
        {
          id: 1,
          name: "Task name",
          description: "Task description",
          priority: "High",
          dueDate: "2023-01-01",
          isCompleted: true,
          createdAt: "2023-01-01",
        },
        {
          id: 2,
          name: "Task name",
          description: "Task description",
          priority: "High",
          dueDate: "2023-01-01",
          isCompleted: true,
          createdAt: "2023-01-01",
        },
      ],
    },
    {
      id: 2,
      name: "En progreso",
      tasks: [
        {
          id: 3,
          name: "Task name",
          description: "Task description",
          priority: "High",
          dueDate: "2023-01-01",
          isCompleted: true,
          createdAt: "2023-01-01",
        },
        {
          id: 4,
          name: "Task name",
          description: "Task description",
          priority: "High",
          dueDate: "2023-01-01",
          isCompleted: true,
          createdAt: "2023-01-01",
        },
        {
          id: 7,
          name: "Task name",
          description: "Task description",
          priority: "High",
          dueDate: "2023-01-01",
          isCompleted: true,
          createdAt: "2023-01-01",
        },
      ],
    },
    {
      id: 3,
      name: "Completadas",
      tasks: [
        {
          id: 5,
          name: "Task name",
          description: "Task description",
          priority: "High",
          dueDate: "2023-01-01",
          isCompleted: true,
          createdAt: "2023-01-01",
        },
        {
          id: 6,
          name: "Task name",
          description: "Task description",
          priority: "High",
          dueDate: "2023-01-01",
          isCompleted: true,
          createdAt: "2023-01-01",
        },
      ],
    },
  ];

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Tus tareas</h1>
      <section className="gap-14 md:gap-5 p-3 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {lists.map((list) => (
          <TaskLists key={list.id} name={list.name} tasks={list.tasks} />
        ))}
      </section>
    </AppLayout>
  );
}
