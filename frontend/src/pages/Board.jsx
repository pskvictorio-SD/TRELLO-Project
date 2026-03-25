import AppLayout from "../layouts/AppLayout";
import TaskCard from "../components/task/TaskCard";

export default function Board() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Tus tareas</h1>
      <section className="">
        <div className="">
          <TaskCard
            task={{
              name: "TaskName",
              description: "TaskDescription",
              priority: "High",
              dueDate: "00/00/0000",
              isCompleted: "TaskIsCompleted",
              createdAt: "00/00/0000",
            }}
          />
        </div>
        <div className="">
          <TaskCard
            task={{
              name: "TaskName",
              description: "TaskDescription",
              priority: "Low",
              dueDate: "00/00/0000",
              isCompleted: "TaskIsCompleted",
              createdAt: "00/00/0000",
            }}
          />
        </div>
      </section>
    </AppLayout>
  );
}
