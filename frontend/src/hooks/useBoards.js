import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import useFetch from "./useFetch.js";
import {
  getBoardsOfUser,
  createBoard,
  editBoard,
} from "../services/board.service.js";

export default function useBoards() {
  const { appData, setAppData } = useContext(dataContext);
  const { request, loading, error } = useFetch();

  const workspaceId = appData?.workspace?.id;

  const handleGetBoards = async () => {
    const res = await request(() => getBoardsOfUser());
    if (!res.ok) {
      console.error("Error fetching boards:", res.error);
      return;
    }
    setAppData((prevData) => ({
      ...prevData,
      boards: res.boards,
    }));
  };
  const handleCreateBoard = async (boardName, boardDescription) => {
    const res = await request(() =>
      createBoard(workspaceId, boardName, boardDescription),
    );
    if (!res.ok) {
      console.error("Error creating board:", res.error);
      return;
    }
    handleGetBoards();
  };
  const handleEditBoards = async (board) => {
    const res = request(editBoard(workspaceId, board));
    console.log(res);
    if (!res.ok) {
      return console.log("Error al actualizar el board");
    }
    return res;
  };

  return { handleGetBoards, handleCreateBoard, handleEditBoards };
}
