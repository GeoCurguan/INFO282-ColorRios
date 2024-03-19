const decodeToken = (token) => {
  if (!token) {
    return null;
  }

  const [, payloadBase64] = token.split(".");

  if (!payloadBase64) {
    throw new Error("Invalid token format");
  }

  const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");

  try {
    return JSON.parse(decodedPayload);
  } catch (error) {
    throw new Error("Error parsing token payload");
  }
};

export { decodeToken };
