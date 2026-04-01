import TaskLists from "../components/task/taskLists.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import { useDragAndDrop } from "../hooks/useDragAndDrop.js";

export default function Board() {
  const { lists, tasks, setDraggedTask, handleDrop, handleReorderTasks } = useDragAndDrop();

  return (
    <AppLayout>
      <div className="gap-14 md:gap-2 p-3 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {lists.map((list) => (
          <TaskLists
            key={(list.id)}
            list={list}
            tasks={tasks}
            setDraggedTask={setDraggedTask}
            handleDrop={handleDrop}
            handleReorderTasks={handleReorderTasks}
          ></TaskLists>
        ))}
      </div>
    </AppLayout>
  );
}
