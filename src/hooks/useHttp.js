import { useCallback, useState } from "react";

const useHttp = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback( async (requestConfig, applyData) => {

    setIsLoading(true);

    setError(false);

    try {

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {}
      });

      if (!response.ok) {
       const err = await response.json();
    
      throw new Error(err.error.message)
      }

      const data = await response.json();

      if(applyData){

        applyData(data);
      
      }
      
    } catch (error) {
      setError(error.message||"Something went wrong!");
    }

    setIsLoading(false);

  },[]);

  return {
    sendRequest,
    error,
    isLoading,
  };
};

export default useHttp;
