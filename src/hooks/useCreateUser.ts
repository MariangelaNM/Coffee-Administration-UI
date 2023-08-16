import { useState, useCallback } from "react";

type UpdateResult<T> = {
  create: (data: T, errorMessage?: string) => Promise<void>;
  status: Status;
  error: Error | undefined;
};

type Status = "success" | "loading" | undefined;

export function useCreate<T, ResponseType>(
  createFunction: (data: T) => Promise<ResponseType>
): UpdateResult<T> {
  const [status, setStatus] = useState<Status>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const create = useCallback(
    async (data: T, errorMessage?: string) => {
      if (errorMessage) {
        setError(new Error(errorMessage));
        return;
      }
      setStatus("loading");
      try {
        await createFunction(data);
        setError(undefined);
        setStatus("success");
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(err.description));
        }
        setStatus(undefined);
      }
    },
    [createFunction]
  );

  return { create, status, error };
}
