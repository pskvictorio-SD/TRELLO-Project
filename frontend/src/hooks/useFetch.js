import { useState } from "react";

async function useFetch(URL, method, body, headers, redirect) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  try {
    setLoading(true);
    const response = await fetch(URL, {
      method: method,
      body: body,
      headers: headers,
      redirect: redirect,
    });

    if (!response.ok) {
      throw new Error("Algo ha salido mal");
    }

    const data = await response.json();
    setData(data);
    setLoading(false);

  } catch (err) {
    setError(true);
    setLoading(false);
    console.error(err);
  }

  return { data, loading, error };
}

export default useFetch;
