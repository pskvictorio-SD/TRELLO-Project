import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import {
  getBoardsOfUser,
  createBoard,
  editBoard,
  deleteBoard,
} from "../services/board.service.js";
import useFetch from "./useFetch.js";

export default function useBoards() {
  const { request, loading, error } = useFetch();
  const { appData, setAppData } = useContext(dataContext);
  const workspaceId = appData?.workspace?.id;

  const handleGetBoards = async () => {
    const data = await getBoardsOfUser(workspaceId);

    setAppData((prevData) => ({
      ...prevData,
      workspace: {
        ...(prevData.workspace || {}),
        boards: data.boards,
      },
    }));
  };

  const handleCreateBoard = async (boardName, boardDescription) => {
    const data = await request(() =>
      createBoard(workspaceId, boardName, boardDescription),
    );
    if (data.ok) {
      handleGetBoards();
    }
  };

  const handleEditBoard = async (board) => {
    const data = await request(() =>
      editBoard(workspaceId, board.id, board.title, board.description),
    );

    console.log(data);
    if (data.ok) {
      handleGetBoards();
    }
  };

  const handleDeleteBoard = async (boardId) => {
    const data = await request(() => deleteBoard(workspaceId, boardId));
    if (data.ok) {
      handleGetBoards();
    }
  };

  return {
    handleGetBoards,
    handleCreateBoard,
    handleEditBoard,
    handleDeleteBoard,
  };
}
