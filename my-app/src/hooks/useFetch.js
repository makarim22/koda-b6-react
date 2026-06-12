import { useState, useEffect, useCallback } from "react";
import http from "../lib/http";

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Destructure options for dependencies to avoid infinite loops if options object reference changes
  const method = options.method || "GET";
  const token = options.token;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await http(endpoint, {}, { method, token });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      // Handle the common { success, message, data } response format from backend
      if (result && result.success !== undefined && !result.success) {
        throw new Error(result.message || "Failed to fetch data");
      }
      
      if (result === null) {
        setData([]);
      } else {
        setData(result.data || result); // Some endpoints might return data directly
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, method, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
