export const createBoard = async (workspaceId, boardName, boardDescription) => {
  const response = await fetch(
    `http://localhost:3001/api/workspaces/${workspaceId}/boards/`,
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
    `http://localhost:3001/api/workspaces/${workspaceId}/boards`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  const res = await response.json();

  if (res.status === 404) {
    return console.log(res.message);
  }

  return res;
};

export const editBoard = async (
  workspaceId,
  boardId,
  boardName,
  boardDescription,
) => {
  const response = await fetch(
    `http://localhost:3001/api/workspaces/${workspaceId}/boards/${boardId}`,
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

export const deleteBoard = async () => {};
