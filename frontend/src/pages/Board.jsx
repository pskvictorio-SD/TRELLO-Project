import TaskLists from "../components/task/taskLists.jsx";
import Card from "../components/ui/Card.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

import useModal from "../hooks/useModal.js";
import ModalRenderer from "../utils/ModalRenderer.jsx";

import { dataContext } from "../contexts/dataContext.jsx";
import { useContext, useEffect } from "react";

import { useState } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop.js";
import useLists from "../hooks/useLists.js";

export default function Board() {
  const { modal, openModal, closeModal } = useModal();
  const { appData, setAppData } = useContext(dataContext);
  const { fetchLists } = useLists();

  useEffect(() => {
    fetchLists();
  }, []);

  let lists = appData?.currentBoard?.lists || [];

  let tasks = [
    {
      id: 10,
      list_id: 2,
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
      list_id: 4,
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
      list_id: 5,
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
    <>
      <AppLayout>
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">Tus Tableros</h1>
        </div>
        <main className="flex flex-wrap gap-5">
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
          <Card
            onClick={() => {
              openModal("createList");
            }}
            className="flex justify-center max-h-16 max-w-72 cursor-pointer"
          >
            <h3 className="text-lg font-medium">Crear otra lista +</h3>
          </Card>
        </main>
      </AppLayout>
      <ModalRenderer
        type={modal.type}
        isOpen={modal.isOpen}
        onClose={closeModal}
        data={modal.data}
      />
    </>
  );
}
