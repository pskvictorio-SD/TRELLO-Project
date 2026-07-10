

export async function registerUser(user) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();

  return res;
}

export async function loginUser(user) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();

  return res;
}