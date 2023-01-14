//Custom hook

import { useCallback, useEffect, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const cleanError = useCallback(() => setError(null), []);

  useEffect( ( ) => { 
    if(error) {alert(error)
      setError(null)}
   }, [error])

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
      
        if (body &&! ( body instanceof FormData)) {
          
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
         url = process.env.REACT_APP_SERVER_URL + url;
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        setLoading(false)
        let jsonResponse;
        if (response.status!==204) {jsonResponse = await response.json();}
        if (!response.ok && response.status!==401) {
          setError(jsonResponse.message)
          throw new Error(jsonResponse.message || 'Unknown error')
        }
        return jsonResponse;
      } catch (e) {
        setLoading(false)
        setError(e.message)
        console.log(error);
        throw e
      }
    },
    []
  );





  return { loading, request, error, cleanError };
};
