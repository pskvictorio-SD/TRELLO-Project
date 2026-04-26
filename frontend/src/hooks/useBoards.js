import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import { getBoardsOfUser, createBoard } from "../services/board.service.js";

export default function useBoards() {
  const { appData, setAppData } = useContext(dataContext);
  const workspaceId = appData?.workspace?.id;

  const handleGetBoards = async () => {
    const data = await getBoardsOfUser(workspaceId);
    setAppData((prevData) => ({
      ...prevData,
      boards: data.boards,
    }));
  };

  const handleCreateBoard = async (
    workspaceId,
    boardName,
    boardDescription,
  ) => {
    const data = await createBoard(workspaceId, boardName, boardDescription);
    setAppData((prevData) => ({
      ...prevData,
      boards: [...prevData.boards, data.board],
    }));
  };

  return {
    handleGetBoards,
    handleCreateBoard,
  };
}
