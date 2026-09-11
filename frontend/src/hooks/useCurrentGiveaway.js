import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getCurrentGiveaway,
} from "../services/giveawayApi.js";

function useCurrentGiveaway() {
  const [giveaway, setGiveaway] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadGiveaway =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getCurrentGiveaway();

        setGiveaway(response.data);
      } catch (requestError) {
        console.error(
          "Giveaway loading failed:",
          requestError
        );

        setGiveaway(null);

        setError(
          requestError?.response?.data?.message ||
            "Unable to load giveaway information."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    const startLoading = async () => {
      await loadGiveaway();
    };

    void startLoading();
  }, [loadGiveaway]);

  return {
    giveaway,
    loading,
    error,
    retry: loadGiveaway,
  };
}

export default useCurrentGiveaway;