import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((resp) => resp.json())
      .then((returnedData) => setData(returnedData))
      .catch((err) => setError(err));
  }, [url]);
  return { data, setData, error };
};
