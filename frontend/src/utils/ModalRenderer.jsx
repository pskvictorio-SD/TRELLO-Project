import CreateBoardModal from "../components/modals/CreateBoardModal.jsx";
import EditBoardModal from "../components/modals/EditBoardModal.jsx";
import DeleteBoardModal from "../components/modals/DeleteBoardModal.jsx";

export default function ModalRenderer({ type, isOpen, onClose, data }) {
  if (!isOpen) return null;

  switch (type) {
    case "createBoard":
      return <CreateBoardModal isOpen={isOpen} onClose={onClose} />;

    case "editBoard":
      return <EditBoardModal isOpen={isOpen} onClose={onClose} board={data} />;

    case "deleteBoard":
      return <DeleteBoardModal isOpen={isOpen} onClose={onClose} boardId={data} />;

    default:
      return null;
  }
}
