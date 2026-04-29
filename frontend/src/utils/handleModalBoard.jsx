import CreateBoardModal from "../components/modals/CreateBoardModal.jsx";
import EditBoardModal from "../components/modals/EditBoardModal.jsx";

export default function ModalRenderer({ type, isOpen, onClose, data }) {
  if (!isOpen) return null;

  switch (type) {
    case "createBoard":
      return <CreateBoardModal isOpen={isOpen} onClose={onClose} />;

    case "editBoard":
      return <EditBoardModal isOpen={isOpen} onClose={onClose} board={data} />;

    default:
      return null;
  }
}
