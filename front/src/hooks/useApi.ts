import { useCallback, useState } from "react";

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

type ApiFunction<T, P extends any[]> = (...args: P) => Promise<T>;

export function useApi<T, P extends any[]>(apiFunc: ApiFunction<T, P>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (...args: P) => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const data = await apiFunc(...args);
        setState({ data, error: null, loading: false });
        return data;
      } catch (error) {
        setState({
          data: null,
          error: (error as Error).message,
          loading: false,
        });
        throw error;
      }
    },
    [apiFunc]
  );

  return { ...state, execute };
}
