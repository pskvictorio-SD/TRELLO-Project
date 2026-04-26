import { useContext } from "react";
import { dataContext } from "../contexts/dataContext.jsx";
import useFetch from "./useFetch.js";
import {
  getWorkspace,
  createWorkspace,
} from "../services/workspace.service.js";

export default function useWorkspace() {
  const { appData, setAppData } = useContext(dataContext);
  const { request, loading, error } = useFetch();

  const handleGetWorkspace = async () => {
    const res = await request(() => getWorkspace());
    if (!res.ok) {
      console.error("Error fetching workspace:", res.error);
      return;
    }
    setAppData((prevData) => ({
      ...prevData,
      workspace: res.workspace,
    }));
  };

  const handleCreateWorkspace = async (user) => {
    const res = request(createWorkspace());
    if (!res.ok) {
      return console.log("Error al crear el workspace", res.message);
    }
    return res;
  };

  return {
    handleGetWorkspace,
  };
}
