export const createList = async (listName, boardId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/boards/${boardId}/lists`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: listName,
      }),
    },
  );
  const res = await response.json();

  return res;
};

export const getLists = async (boardId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/boards/${boardId}/lists`,
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

export const editList = async (boardId, listName, listId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/boards/${boardId}/lists/${listId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: listName,
      }),
    },
  );

  const res = await response.json();

  return res;
};

export const moveList = async (boardId, listId, position, reorder) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/boards/${boardId}/lists/${listId}/move`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        position: position,
        reorder: reorder,
      }),
    },
  );
  const res = await response.json();

  return res;
};

export const deleteList = async (boardId, listId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/boards/${boardId}/lists/${listId}`,
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
