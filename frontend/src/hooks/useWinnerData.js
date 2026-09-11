import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getPreviousWinners,
  getWinners,
} from "../services/giveawayApi.js";

function useWinnerData(giveawayId) {
  const [
    currentWinners,
    setCurrentWinners,
  ] = useState([]);

  const [
    previousWinners,
    setPreviousWinners,
  ] = useState([]);

  const [loading, setLoading] =
    useState(Boolean(giveawayId));

  const [error, setError] =
    useState("");

  const load =
    useCallback(async () => {
      if (!giveawayId) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [
          currentResponse,
          previousResponse,
        ] = await Promise.all([
          getWinners(giveawayId),
          getPreviousWinners(),
        ]);

        setCurrentWinners(
          currentResponse.data || []
        );

        setPreviousWinners(
          previousResponse.data || []
        );
      } catch (requestError) {
        console.error(
          "Winner loading failed:",
          requestError
        );

        setError(
          requestError?.response?.data?.message ||
            "Unable to load winner information."
        );
      } finally {
        setLoading(false);
      }
    }, [giveawayId]);

  useEffect(() => {
    if (!giveawayId) {
      return;
    }

    const startLoading = async () => {
      await load();
    };

    void startLoading();
  }, [giveawayId, load]);

  return {
    currentWinners,
    previousWinners,
    loading,
    error,
    retry: load,
  };
}

export default useWinnerData;
