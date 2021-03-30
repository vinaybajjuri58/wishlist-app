import { useState, useEffect } from "react";
import axios from "axios";
export const useAxios = (dataUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(dataUrl);
        setData(response);
      } catch (err) {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [dataUrl]);
  return { data, loading, loadError };
};
