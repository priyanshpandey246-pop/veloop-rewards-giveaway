import api from "./api.js";

export async function getCurrentGiveaway() {
  const response =
    await api.get(
      "/giveaways/current"
    );

  return response.data;
}

export async function getMyWinnerStatus() {
  const response =
    await api.get(
      "/giveaways/my-winner-status"
    );

  return response.data;
}

export async function getGiveaway(
  identifier
) {
  const response =
    await api.get(
      `/giveaways/${identifier}`
    );

  return response.data;
}

export async function getPreviousWinners() {
  const response =
    await api.get(
      "/giveaways/previous/winners"
    );

  return response.data;
}

export async function getPreviousGiveaways() {
  const response =
    await api.get(
      "/giveaways/previous"
    );

  return response.data;
}

export async function getWinners(
  giveawayId
) {
  const response =
    await api.get(
      `/giveaways/${giveawayId}/winners`
    );

  return response.data;
}

export async function getMyStatus(
  giveawayId
) {
  const response =
    await api.get(
      `/giveaways/${giveawayId}/my-status`
    );

  return response.data;
}

export async function joinGiveaway(
  giveawayId,
  prizeId
) {
  const idempotencyKey =
    crypto.randomUUID();

  const response =
    await api.post(
      `/giveaways/${giveawayId}/join`,
      {
        prizeId,
      },
      {
        headers: {
          "X-Idempotency-Key":
            idempotencyKey,
        },
      }
    );

  return response.data;
}

export async function submitPrizeClaim(
  giveawayId,
  claimData
) {
  const response =
    await api.post(
      `/giveaways/${giveawayId}/claim`,
      claimData
    );

  return response.data;
}

export async function getMyClaim(
  giveawayId
) {
  const response =
    await api.get(
      `/giveaways/${giveawayId}/my-claim`
    );

  return response.data;
}