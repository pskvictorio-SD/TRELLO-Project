import TaskLists from "../components/task/taskLists.jsx";
import Card from "../components/ui/Card.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

import useModal from "../hooks/useModal.js";
import ModalRenderer from "../utils/ModalRenderer.jsx";

import { dataContext } from "../contexts/dataContext.jsx";
import { use, useContext, useEffect, useState } from "react";

import useLists from "../hooks/useLists.js";

import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { handleDragEnd } from "../utils/handleDragEnd.js";
import useTasks from "../hooks/useTasks.js";

export default function Board() {
  const { modal, openModal, closeModal } = useModal();
  const { appData, setAppData } = useContext(dataContext);
  const { handleMoveList, fetchLists } = useLists();
  const { handleMoveTasks } = useTasks();

  useEffect(() => {
    fetchLists();
  }, []);

  let lists = appData?.currentBoard?.lists || [];

  return (
    <>
      <AppLayout>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(e) =>
            handleDragEnd(
              e,
              lists,
              setAppData,
              fetchLists,
              handleMoveList,
              handleMoveTasks,
            )
          }
        >
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold">Tus Tableros</h1>
          </div>
          <section className="flex overflow-x-auto gap-5 h-full">
            <SortableContext
              items={lists.map((list) => `list-${list.id}`)}
              strategy={horizontalListSortingStrategy}
            >
              {lists.map((list) => {
                return (
                  <TaskLists
                    key={list.id}
                    list={list}
                    tasks={list.tasks}
                    setAppData={setAppData}
                    handleDragEnd={handleDragEnd}
                  />
                );
              })}
            </SortableContext>
            <Card
              onClick={() => {
                openModal("createList");
              }}
              className="flex justify-center max-h-16 min-w-72 max-w-72 cursor-pointer"
              bg="dark"
            >
              <h3 className="text-lg font-medium">Crear otra lista +</h3>
            </Card>
          </section>
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
