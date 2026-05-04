import CreateBoardModal from "../components/modals/CreateBoardModal.jsx";
import EditBoardModal from "../components/modals/EditBoardModal.jsx";
import DeleteBoardModal from "../components/modals/DeleteBoardModal.jsx";
import AddMemberModal from "../components/modals/AddMemberModal.jsx";
import EditListModal from "../components/modals/EditListModal.jsx";
import CreateListModal from "../components/modals/CreateListModal.jsx";
import DeleteListModal from "../components/modals/DeleteListModal.jsx";

export default function ModalRenderer({ type, isOpen, onClose, data }) {
  if (!isOpen) return null;

  switch (type) {
    // BOARDS
    case "createBoard":
      return <CreateBoardModal isOpen={isOpen} onClose={onClose} />;

    case "editBoard":
      return <EditBoardModal isOpen={isOpen} onClose={onClose} board={data} />;

    case "deleteBoard":
      return (
        <DeleteBoardModal isOpen={isOpen} onClose={onClose} boardId={data} />
      );

    case "addMember":
      return (
        <AddMemberModal isOpen={isOpen} onClose={onClose} boardId={data} />
      );

    // LISTS
    case "createList":
      return <CreateListModal isOpen={isOpen} onClose={onClose} />;

    case "editList":
      return <EditListModal isOpen={isOpen} onClose={onClose} data={data} />;

    case "deleteList":
      return (
        <DeleteListModal isOpen={isOpen} onClose={onClose} listId={data} />
      );

    default:
      return null;
  }
}
