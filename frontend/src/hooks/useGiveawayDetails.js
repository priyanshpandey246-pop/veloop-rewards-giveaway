import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getGiveaway,
} from "../services/giveawayApi.js";

import {
  mapBackendPrizes,
} from "../utils/mapGiveawayData.js";

function useGiveawayDetails(slug) {
  const [giveaway, setGiveaway] =
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
        const response =
          await getGiveaway(slug);

        const event = response.data;

        const prizes =
          mapBackendPrizes(event);

        const selectedPrize =
          prizes.find(
            (prize) =>
              prize.slug === slug
          );

        if (!selectedPrize) {
          throw new Error(
            "Prize not found."
          );
        }

        setGiveaway(selectedPrize);
      } catch (requestError) {
        console.error(
          "Giveaway details loading failed:",
          requestError
        );

        setGiveaway(null);

        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Unable to load this giveaway."
        );
      } finally {
        setLoading(false);
      }
    }, [slug]);

  useEffect(() => {
    const startLoading = async () => {
      await load();
    };

    void startLoading();
  }, [load]);

  return {
    giveaway,
    loading,
    error,
    retry: load,
  };
}

export default useGiveawayDetails;