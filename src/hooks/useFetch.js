import { useCallback, useEffect, useState } from "react";

async function callApi(url, config){
    const response = await fetch(url, config);
    const dt = await response.json();
    return dt;
}

export function useFetch(initialValue, url, config =null){
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearData = () => {
    setData(null);
  }

  const requestApi = useCallback(async function requestApi() {
    try {
      setIsLoading(true);
      const dt = await callApi(url, config);
      setData(dt);
      setIsLoading(false);
    } catch (error) {
      setError(error.message ? error.message : `Something went wrong in callApi in ${url}`);
      setIsLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    if (config && config.method === 'GET') {
      requestApi();
    }
  }, [requestApi, config]);

  return {
    data,
    isLoading,
    error,
    requestApi,
    clearData
  };

}