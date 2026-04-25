import { useState } from "react";
import useBoards from "../hooks/useBoards.js";

export default function useModal() {
  const { handleCreateBoard, handleEditBoards } = useBoards();

  const handleCreateNewBoard = async (boardName, boardDescription) => {
    if (!boardName.trim()) {
      console.error("Debes ingresar un nombre para el tablero");
      return;
    }
    await handleCreateBoard(boardName, boardDescription);
  };

  const handleEditNewBoard = async (boardId, boardName, boardDescription) => {
    const res = await handleEditBoards(boardId, boardName, boardDescription);
    if (!res.ok) {
      console.error("Error al actualizar el board");
      return;
    }
  };

  return {
    handleCreateNewBoard,
    handleEditNewBoard,
  };
}
