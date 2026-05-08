import AppLayout from "../layouts/AppLayout.jsx";
import Card from "../components/ui/Card.jsx";
import TaskLists from "../components/task/taskLists.jsx";

import ModalRenderer from "../utils/ModalRenderer.jsx";

import useModal from "../hooks/useModal.js";
import useLists from "../hooks/useLists.js";

import { dataContext } from "../contexts/dataContext.jsx";

import { useContext, useEffect } from "react";

export default function Board() {
  const { appData } = useContext(dataContext);

  const { modal, openModal, closeModal } = useModal();
  const { fetchLists } = useLists();

  const lists = appData?.currentBoard?.lists || [];
  const tasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Task 1 description",
      priority: "High",
      due_date: "2023-01-01",
      created_at: "2023-01-01",
      list_id: 2,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Task 2 description",
      priority: "Medium",
      due_date: "2023-02-01",
      created_at: "2023-02-01",
      list_id: 4,
    },
    {
      id: 3,
      title: "Task 2",
      description: "Task 2 description",
      priority: "Medium",
      due_date: "2023-02-01",
      created_at: "2023-02-01",
      list_id: 5,
    },
  ];

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <>
      <AppLayout>
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {appData?.currentBoard?.title || "Board"}
          </h1>
        </header>

        {/* Lists */}
        <main className="flex gap-5 overflow-x-auto pb-4">
          {lists.map((list) => {
            const listTasks = tasks.filter((task) => task.list_id === list.id);

            return (
              <TaskLists
                key={list.id}
                list={list}
                tasks={listTasks}
                openModal={openModal}
              />
            );
          })}

          {/* Create List */}
          <Card
            onClick={() => openModal("createList")}
            className="min-w-72 h-16 flex items-center justify-center cursor-pointer hover:shadow-md transition"
          >
            <h3 className="font-medium">Crear otra lista +</h3>
          </Card>
        </main>
      </AppLayout>

      {/* Global Modal */}
      <ModalRenderer
        type={modal.type}
        isOpen={modal.isOpen}
        onClose={closeModal}
        data={modal.data}
      />
    </>
  );
}
