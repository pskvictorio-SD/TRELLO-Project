import TaskLists from "../components/task/taskLists.jsx";
import Card from "../components/ui/Card.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

import useModal from "../hooks/useModal.js";
import ModalRenderer from "../utils/ModalRenderer.jsx";

import { dataContext } from "../contexts/dataContext.jsx";
import { useContext, useEffect, useState } from "react";

import useLists from "../hooks/useLists.js";

import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { reorderLists } from "../utils/reorderLists.js";

export default function Board() {
  const { modal, openModal, closeModal } = useModal();
  const { appData, setAppData } = useContext(dataContext);
  const { handleMoveList, fetchLists } = useLists();

  useEffect(() => {
    fetchLists();
  }, []);

  let lists = appData?.currentBoard?.lists || [];

  let tasks = [
    {
      id: 10,
      list_id: 8,
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
      list_id: 8,
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
      list_id: 8,
      title: "Tercera tarea 3",
      description: "",
      priority: "high",
      due_date: null,
      is_completed: 0,
      created_by: 6,
      created_at: "2026-03-05T20:28:21.000Z",
    },
  ];

  return (
    <>
      <AppLayout>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(e) => {
            reorderLists(e, lists, setAppData, fetchLists, handleMoveList);
          }}
        >
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold">Tus Tableros</h1>
          </div>
          <main className="flex flex-wrap gap-5">
            <SortableContext
              items={lists}
              strategy={horizontalListSortingStrategy}
            >
              {lists.map((list) => {
                return <TaskLists key={list.id} list={list} tasks={tasks} />;
              })}
            </SortableContext>
            <Card
              onClick={() => {
                openModal("createList");
              }}
              className="flex justify-center max-h-16 max-w-72 cursor-pointer"
            >
              <h3 className="text-lg font-medium">Crear otra lista +</h3>
            </Card>
          </main>
        </DndContext>
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
