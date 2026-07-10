export const createBoard = async (workspaceId, boardName, boardDescription) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}/boards/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: boardName,
        description: boardDescription,
      }),
    },
  );
  const res = await response.json();

  return res;
};

export const getBoardsOfUser = async (workspaceId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}/boards`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  const res = await response.json();

  return res;
};

export const editBoard = async (
  workspaceId,
  boardId,
  boardName,
  boardDescription,
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}/boards/${boardId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: boardName,
        description: boardDescription,
      }),
    },
  );
  const res = await response.json();

  return res;
};

export const deleteBoard = async (workspaceId, boardId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}/boards/${boardId}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  const res = await response.json();

  return res;
};
