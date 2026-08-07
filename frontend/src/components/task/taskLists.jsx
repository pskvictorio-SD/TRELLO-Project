import TaskCard from "./TaskCard.jsx";
import Button from "../ui/Button.jsx";
import Tooltip from "../ui/Tooltip.jsx";
import useLists from "../../hooks/useLists.js";
import useModal from "../../hooks/useModal.js";
import ModalRenderer from "../../utils/ModalRenderer.jsx";
import { MdBorderLeft, MdDragIndicator } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function TaskLists({
  list,
  tasks,
  setAppData,
  handleDragEnd,
  currentUserRole,
}) {
  // Solo admin/member pueden mover listas; viewer queda sin permiso
  const canDragList =
    currentUserRole === "admin" || currentUserRole === "member";

  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id: `list-${list.id}`,
    disabled: !canDragList,
    data: {
      type: "list",
      list,
    },
  });
  const style = {
    borderRight: isOver ? "1px solid var(--color-secondary-dark)" : "none",
  };

  const { modal, openModal, closeModal } = useModal();
  const { handleEditList, handleDeleteList } = useLists();

  const dragHandle = (
    <button
      {...(canDragList ? listeners : {})}
      disabled={!canDragList}
      className={`p-2 rounded-md transition-all ${
        canDragList
          ? "hover:bg-blue-900 hover:scale-110 cursor-grab active:cursor-grabbing"
          : "text-gray-600 cursor-not-allowed"
      }`}
    >
      <MdDragIndicator />
    </button>
  );

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        style={style}
        className="flex flex-col justify-center px-5 py-2 gap-5 rounded-sm shadow-lg min-w-72 max-w-72 h-fit bg-gray-900 text-gray-200"
      >
        <div className="flex items-center justify-between">
          {canDragList ? (
            dragHandle
          ) : (
            <Tooltip content="No tenés permisos para mover listas" delay={200}>
              {dragHandle}
            </Tooltip>
          )}
          <h2
            onClick={() =>
              openModal("editList", {
                listName: list.name,
                listId: list.id,
              })
            }
            className="text-xl font-semibold hover:text-blue-500 line-clamp-4 wrap-break-word max-w-36"
          >
            {list.name}
          </h2>
          <button
            onClick={() => openModal("deleteList", list.id)}
            className="p-2 rounded-md hover:bg-blue-900 hover:scale-110 transition-all"
            title="Eliminar lista"
          >
            <AiOutlineDelete size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <SortableContext
            items={tasks.map((task) => `task-${task.id}`)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => {
              if (task.list_id !== list.id) return null;
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  currentUserRole={currentUserRole}
                />
              );
            })}
          </SortableContext>
        </div>

        <div>
          <Button
            onClick={() => openModal("createTask", list.id)}
            variant=""
            title="Crear tarea"
          >
            <div className="flex items-center gap-2 text-lg text-gray-200 hover:text-blue-500">
              <IoAddCircleOutline size={22} />
              <span>Crear tarea</span>
            </div>
          </Button>
        </div>
      </div>
      <ModalRenderer
        type={modal.type}
        isOpen={modal.isOpen}
        onClose={closeModal}
        data={modal.data}
      />
    </>
  );
}
