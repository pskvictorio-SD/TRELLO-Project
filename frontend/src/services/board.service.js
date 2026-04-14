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
