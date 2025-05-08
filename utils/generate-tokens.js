const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = () => {
  return crypto.randomUUID().toString("base64url");
};

const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
