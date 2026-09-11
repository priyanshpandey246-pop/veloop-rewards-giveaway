import crypto from "crypto";

function createRequestId() {
  return crypto.randomUUID();
}

function createTransactionId() {
  return `GTX-${crypto.randomUUID()}`;
}

export {
  createRequestId,
  createTransactionId,
};