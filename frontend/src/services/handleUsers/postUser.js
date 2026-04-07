export async function registerUser(user) {
  const response = await fetch("http://localhost:3001/api/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();

  return res;
}
