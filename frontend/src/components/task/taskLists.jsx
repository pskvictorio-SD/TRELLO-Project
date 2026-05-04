import TaskCard from "./TaskCard.jsx";
import Button from "../ui/Button.jsx";
import useLists from "../../hooks/useLists.js";
import useModal from "../../hooks/useModal.js";
import ModalRenderer from "../../utils/ModalRenderer.jsx";
import trash_svg from "../../public/trash.svg";
import { MdDragIndicator } from "react-icons/md";
import { useState } from "react";

export default function TaskLists({
  list,
  tasks,
  setDraggedItem,
  handleDrop,
  handleReorderTasks,
}) {
  const { modal, openModal, closeModal } = useModal();
  const { handleEditList, handleDeleteList } = useLists();
  const editList = () => {
    openModal("editList", { listName: list.name, listId: list.id });
  };
  return (
    <>
      <div
        className="flex flex-col justify-center bg-white p-5 rounded-sm shadow-lg w-full sm:max-w-72"
        onDragOver={(e) => {
          e.preventDefault();
          handleDrop(list.id);
        }}
      >
        <div className="flex items-center justify-between">
          <button className="p-2 cursor-grab active:cursor-grabbing rounded-md hover:bg-blue-100 hover:scale-110 transition-all">
            <MdDragIndicator />
          </button>
          <h2
            onClick={editList}
            className="text-xl font-semibold cursor-pointer"
          >
            {list.name}
          </h2>
          <button
            onClick={() => openModal("deleteList", list.id)}
            className="p-2 cursor-pointer rounded-md hover:bg-red-100 hover:scale-110 transition-all"
            title="Eliminar lista"
          >
            <img className="h-5 w-5" src={trash_svg} alt="Eliminar" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {tasks.map((task) => {
            if (task.list_id !== list.id) return null;
            return (
              <TaskCard
                key={task.id}
                task={task}
                setDraggedItem={setDraggedItem}
                handleReorderTasks={handleReorderTasks}
              />
            );
          })}
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
