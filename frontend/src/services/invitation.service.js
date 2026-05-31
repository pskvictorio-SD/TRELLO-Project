export const createInvitation = async (boardId, email) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/invitations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    },
  );
  const res = await response.json();

  return res;
};

export const fetchInvitations = async () => {
  const response = await fetch(
    `http://localhost:3001/api/workspaces/invitations`,
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

export const updateInvitation = async (boardId, invitationId, role) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/invitations/${invitationId}`,
    {
      method: "PUT",
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

export const deleteInvitation = async (boardId, invitationId) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/invitations/${invitationId}`,
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
