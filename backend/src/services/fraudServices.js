import FraudEvent from "../models/FraudEvent.js";

export function getRiskLevel(
  score
) {
  if (score >= 80) {
    return "CRITICAL";
  }

  if (score >= 60) {
    return "HIGH";
  }

  if (score >= 30) {
    return "MEDIUM";
  }

  return "LOW";
}

export async function recordFraudEvent({
  userId,
  giveawayId,
  deviceHash,
  riskScore,
  reason,
  signals = [],
  action,
  requestId = null,
}) {
  return FraudEvent.create({
    userId,
    giveawayId,
    deviceHash,

    riskScore,

    riskLevel:
      getRiskLevel(
        riskScore
      ),

    reason,
    signals,
    action,
    requestId,
  });
}