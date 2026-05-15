export const createTask = async () => {};

export const getTasks = async (boardId, listId) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/lists/${listId}/tasks`,
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

export const editTask = async () => {};

export const moveTask = async (
  boardId,
  listId,
  taskId,
  newPosition,
  reorder,
) => {
  const response = await fetch(
    `http://localhost:3001/api/boards/${boardId}/lists/${listId}/tasks/${taskId}/move`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        position: newPosition,
        reorder: reorder,
      }),
    },
  );
  const res = await response.json();

  return res;
};

export const deleteTask = async () => {};
