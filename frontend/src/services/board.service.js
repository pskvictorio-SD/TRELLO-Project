export const createBoard = async (board) => {
  const response = await fetch(
    "http://localhost:3001/api/workspaces/23/boards/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(board),
    },
  );
  const res = await response.json();

  return res;
};
