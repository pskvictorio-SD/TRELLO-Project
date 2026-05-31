import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import useFetch from "./useFetch.js";

import { getWorkspace } from "../services/workspace.service.js";
import { getBoardsOfUser } from "../services/board.service.js";

export default function useWorkspace() {
  const { setAppData } = useContext(dataContext);
  const { request, loading, error } = useFetch();

  const fetchWorkspaceData = async () => {
    try {
      // Traer workspace
      const workspaceRes = await request(() => getWorkspace());
      const workspace = workspaceRes.workspace;

      // Traer boards usando el id
      const boardsRes = await request(() => getBoardsOfUser(workspace.id));

      // Unificar estado
      setAppData((prev) => ({
        ...prev,
        workspace: {
          ...workspace,
          boards: boardsRes.boards,
        },
      }));
    } catch (err) {
      console.error("Error cargando workspace completo", err);
    }
  };

  return {
    fetchWorkspaceData,
    loading,
    error,
  };
}
