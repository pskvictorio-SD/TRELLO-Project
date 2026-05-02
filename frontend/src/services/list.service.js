export const createList = async (listName, boardId) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/lists`,
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
    `http://localhost:3001/api/boards/${boardId}/lists`,
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

export const editList = async (boardId, listName) => {};

export const moveList = async (boardId, listId, position) => {};

export const deleteList = async (boardId, listId) => {};
