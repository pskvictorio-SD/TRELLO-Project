import { useState } from "react";
import CreateBoardModal from "../components/modals/CreateBoardModal.jsx";
import EditBoardModal from "../components/modals/EditBoardModal.jsx";

export default function handleModal(type, isOpen, board) {
  switch (type) {
    case "createBoard":
      return <CreateBoardModal isOpen={isOpen} />;
      break;
    case "editBoard":
      return <EditBoardModal isOpen={isOpen} board={board} />;
      break;
    default:
      return null;
  }
}
