export async function getWorkspace() {
  const response = await fetch("http://localhost:3001/api/workspaces", {
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
  const response = await fetch("http://localhost:3001/api/workspaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const res = await response.json();

  return res;
}