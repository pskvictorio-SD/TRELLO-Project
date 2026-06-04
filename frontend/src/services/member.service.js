export const addMember = async (boardId, role) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        role: role,
      }),
    },
  );
  const res = await response.json();

  return res;
};

export const getMembers = async (boardId) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/members`,
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
