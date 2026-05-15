import TaskCard from "./TaskCard.jsx";
import Button from "../ui/Button.jsx";
import useLists from "../../hooks/useLists.js";
import useModal from "../../hooks/useModal.js";
import ModalRenderer from "../../utils/ModalRenderer.jsx";
import trash_svg from "../../public/trash.svg";
import { MdBorderLeft, MdDragIndicator } from "react-icons/md";
import { useState } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { reorderTasks } from "../../utils/reorderTasks.js";
import useTasks from "../../hooks/useTasks.js";

export default function TaskLists({ list, tasks, setAppData }) {
  const [tareas, setTareas] = useState(tasks);

  const { fetchTasks, handleMoveTasks } = useTasks();

  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id: list.id,
  });
  const style = {
    borderRight: isOver ? "1px solid var(--color-secondary-dark)" : "none",
  };

  const { modal, openModal, closeModal } = useModal();
  const { handleEditList, handleDeleteList } = useLists();

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(e) => reorderTasks(e, tareas, setTareas, list, fetchTasks, handleMoveTasks)}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        style={style}
        className="flex flex-col justify-center bg-white p-5 rounded-sm shadow-lg w-full sm:max-w-72"
      >
        <div className="flex items-center justify-between">
          <button
            {...listeners}
            className="p-2 cursor-grab active:cursor-grabbing rounded-md hover:bg-blue-100 hover:scale-110 transition-all"
          >
            <MdDragIndicator />
          </button>
          <h2
            onClick={() =>
              openModal("editList", {
                listName: list.name,
                listId: list.id,
              })
            }
            className="text-xl font-semibold hover:text-blue-500"
          >
            {list.name}
          </h2>
          <button
            onClick={() => openModal("deleteList", list.id)}
            className="p-2 rounded-md hover:bg-red-100 hover:scale-110 transition-all"
            title="Eliminar lista"
          >
            <img className="h-5 w-5" src={trash_svg} alt="Eliminar" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <SortableContext
            items={tareas}
            strategy={verticalListSortingStrategy}
          >
            {tareas.map((task) => {
              if (task.list_id !== list.id) return null;
              return <TaskCard key={task.id} task={task} />;
            })}
          </SortableContext>
        </div>
      </div>
      <ModalRenderer
        type={modal.type}
        isOpen={modal.isOpen}
        onClose={closeModal}
        data={modal.data}
      />
    </DndContext>
  );
}
