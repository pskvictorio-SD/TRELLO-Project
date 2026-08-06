import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";

import calender_svg from "../../public/calender.svg";

import { LuUsers } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

import { useState, useEffect, useRef } from "react";

import useModal from "../../hooks/useModal.js";
import useMembers from "../../hooks/useMembers.js";
import ModalRenderer from "../../utils/ModalRenderer.jsx";

import { useNavigate } from "react-router-dom";

export default function BoardCard({ board }) {
  const { modal, openModal, closeModal } = useModal();
  const { handleGetMembersOfBoard } = useMembers();
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMembersOpen, setMenuMembersOpen] = useState(false);

  const openBoard = () => {
    navigate(`/boards?boardId=${board.id}`);
  };

  const handleAction = (action, data) => {
    openModal(action, data);
    setMenuOpen(false);
    setMenuMembersOpen(false);
  };

  const handleToggleMembers = async (e) => {
    e.stopPropagation();

    if (!menuMembersOpen && members.length === 0) {
      try {
        const data = await handleGetMembersOfBoard(board.id);
        setMembers(data.members);
      } catch (err) {
        console.error(err);
      }
    }

    setMenuMembersOpen((prev) => !prev);
  };

  const membersRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (membersRef.current && !membersRef.current.contains(e.target)) {
        setMenuMembersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Card
        size="sm"
        bg="dark"
        className="hover:scale-105 overflow-visible text-gray-200 border-2 border-gray-700"
      >
        <div className="flex items-start justify-between gap-4">
          <div
            onClick={openBoard}
            className="flex flex-col gap-3 flex-1 cursor-pointer"
          >
            <h2 className="text-xl font-bold">{board.title}</h2>

            <p className="text-sm" title={board.description}>
              {board.description}
            </p>
          </div>

          {/* VER MIEMBROS */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div ref={membersRef}>
                <button
                  onClick={handleToggleMembers}
                  className="flex items-center rounded-md hover:bg-blue-900 px-2 py-1 transition-all"
                  title="Ver miembros"
                >
                  <LuUsers size={20} />
                </button>
              </div>

              {menuMembersOpen && (
                <div className="absolute right-0 top-12 w-72 bg-gray-800 border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b">
                    <h3 className="font-semibold">
                      Miembros ({members.length})
                    </h3>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {members.length === 0 ? (
                      <div className="p-4 text-sm text-gray-500">
                        No hay miembros
                      </div>
                    ) : (
                      members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                member.avatar ||
                                "https://ui-avatars.com/api/?name=" +
                                  member.username
                              }
                              alt={member.username}
                              className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>
                              <p className="font-medium text-sm">
                                {member.username}
                              </p>

                              <p className="text-xs text-gray-500">
                                {member.email}
                              </p>
                            </div>
                          </div>

                          <Badge
                            variant={
                              member.role === "admin" ? "success" : "info"
                            }
                          >
                            {member.role}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MENU DE ACCIONES */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                className="p-2 rounded-md hover:bg-blue-900 transition-all"
                title="Acciones"
              >
                <BsThreeDotsVertical />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-10 w-48 bg-gray-800 border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={() => handleAction("addMember", board.id)}
                    className="w-full px-4 py-3 text-left cursor-pointer hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <LuUsersRound size={22} /> Añadir miembro
                    </div>
                  </button>

                  <button
                    onClick={() => handleAction("editBoard", board)}
                    className="w-full px-4 py-3 text-left cursor-pointer hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <CiEdit size={22} /> Editar tablero
                    </div>
                  </button>

                  <button
                    onClick={() => handleAction("deleteBoard", board.id)}
                    className="w-full px-4 py-3 text-left text-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <AiOutlineDelete size={22} /> Eliminar tablero
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

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
