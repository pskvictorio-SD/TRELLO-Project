export async function getWorkspace() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/workspaces`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const res = await response.json();

  return res;
}

export async function createWorkspace() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const res = await response.json();

  return res;
}