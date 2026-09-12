import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  createDemoSession,
} from "../services/authApi.js";

import {
  getMyWinnerStatus,
} from "../services/giveawayApi.js";

function useMyWinnerStatus() {
  const [winner, setWinner] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const load =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        await createDemoSession();

        const response =
          await getMyWinnerStatus();

        setWinner(
          response.data || null
        );
      } catch (requestError) {
        console.error(
          "Winner status loading failed:",
          requestError
        );

        setWinner(null);

        setError(
          requestError?.response
            ?.data?.message ||
            "Unable to load your winner status."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    const timerId =
      setTimeout(() => {
        void load();
      }, 0);

    return () => {
      clearTimeout(timerId);
    };
  }, [load]);

  return {
    winner,
    setWinner,
    loading,
    error,
    retry: load,
  };
}

export default useMyWinnerStatus;