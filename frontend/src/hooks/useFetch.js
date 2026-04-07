import { useState } from "react";

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (callback) => {
    try {
      setLoading(true);
      setError(false);

      const data = await callback();

      return data;
    } catch (error) {
      setError(true);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}

export default useFetch;
