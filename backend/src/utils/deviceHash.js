import crypto from "crypto";

export function createDeviceHash(
  req
) {
  const suppliedSession =
    String(
      req.headers[
        "x-device-id"
      ] || ""
    );

  const userAgent =
    String(
      req.headers[
        "user-agent"
      ] || ""
    );

  const source =
    `${suppliedSession}|${userAgent}`;

  return crypto
    .createHash("sha256")
    .update(source)
    .digest("hex");
}