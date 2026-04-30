import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import trash_svg from "../../public/trash.svg";
import calender_svg from "../../public/calender.svg";
import pencil_svg from "../../public/pencil.svg";
import books_svg from "../../public/books.svg";
import Button from "../ui/Button.jsx";

import { IoMdPersonAdd } from "react-icons/io";
import { useState } from "react";
import useModal from "../../hooks/useModal.js";
import ModalRenderer from "../../utils/ModalRenderer.jsx";

export default function BoardCard({ board }) {
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <Card size="sm" className="hover:scale-105 cursor-pointer">
        <div className="flex items-center justify-between gap-10">
          <img
            className="w-20 h-16 rounded-md"
            src={board.image ? board.image : books_svg}
            alt="Imagen descriptiva de board"
          />
          <div className="flex flex-col gap-5 w-full">
            <h2 className="text-xl font-bold">{board.title}</h2>
            <p
              className="truncate line-clamp-2 text-sm"
              title={board.description}
            >
              {board.description}
            </p>
          </div>
          <button onClick={() => openModal("addMember", board.id)} className="p-2 text-2xl cursor-pointer rounded-md hover:bg-blue-100 hover:scale-110 transition-all">
            <IoMdPersonAdd />
          </button>
        </div>

        <hr />

        <div className="flex items-center justify-between">
          <Badge
            variant="info"
            className="flex items-center gap-2 text-xs px-2 py-1"
          >
            <img
              className="h-4 w-4 opacity-70"
              src={calender_svg}
              alt="Calendario"
            />
            <span>{board.created_at.slice(0, 10)}</span>
          </Badge>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal("deleteBoard", board.id)}
              className="p-2 cursor-pointer rounded-md hover:bg-red-100 hover:scale-110 transition-all"
              title="Eliminar tablero"
            >
              <img className="h-5 w-5" src={trash_svg} alt="Eliminar" />
            </button>

            <button
              onClick={() => openModal("editBoard", board)}
              className="p-2 cursor-pointer rounded-md hover:bg-blue-100 hover:scale-110 transition-all"
              title="Editar tablero"
            >
              <img className="h-5 w-5" src={pencil_svg} alt="Editar" />
            </button>
          </div>
        </div>
      </Card>
      <ModalRenderer
        type={modal.type}
        isOpen={modal.isOpen}
        onClose={closeModal}
        data={modal.data}
      />
    </>
  );
}
