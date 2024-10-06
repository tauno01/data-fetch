import { useRef, useState, useEffect } from "react";

const useAbortableFetch = (url) => {
  const [json, setJson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef();

  useEffect(() => {
    if (!url) return;

    getData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [url]);

  const getData = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { signal });
      const data = await response.json();
      setJson(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { json, loading, error };
};

export default useAbortableFetch;