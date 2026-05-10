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
  arrayMove,
} from "@dnd-kit/sortable";

export default function Board() {
  const { modal, openModal, closeModal } = useModal();
  const { appData, setAppData } = useContext(dataContext);
  const { fetchLists } = useLists();

  const handleDragEnd = (e) => {
    const { active, over } = e;

    const oldIndex = lists.findIndex((list) => list.id === active.id);
    const newIndex = lists.findIndex((list) => list.id === over.id);

    const newList = arrayMove(lists, oldIndex, newIndex);
    setAppData({
      ...appData,
      currentBoard: { ...appData.currentBoard, lists: newList },
    });
  };

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

  return (
    <>
      <AppLayout>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(e) => {
            handleDragEnd(e);
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

      {/* <AppLayout>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <main className="flex flex-wrap gap-5">
            <SortableContext
              items={lists}
              strategy={horizontalListSortingStrategy}
            >
              {lists.map((list) => {
                return <TaskLists key={list.id} list={list} tasks={tasks} />;
              })}
            </SortableContext>
          </main>
        </DndContext>
      </AppLayout> */}

      <ModalRenderer
        type={modal.type}
        isOpen={modal.isOpen}
        onClose={closeModal}
        data={modal.data}
      />
    </>
  );
}
