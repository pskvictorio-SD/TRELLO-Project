export const addMember = async (boardId, email, role) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: email,
        role: role,
      }),
    },
  );
  const res = await response.json();

  return res;
};
