import AuditLog from "../models/AuditLog.js";

export async function createAuditLog({
  userId = null,
  action,
  giveawayId = null,
  prizeId = null,
  currency = null,
  amount = null,
  result,
  requestId = null,
  metadata = {},
}) {
  try {
    await AuditLog.create({
      userId,
      action,
      giveawayId,
      prizeId,
      currency,
      amount,
      result,
      requestId,
      metadata,
    });
  } catch (error) {
    console.error(
      "Audit logging failed:",
      error.message
    );
  }
}