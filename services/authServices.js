const db = require("../prisma/db.client");
const { getHashedToken } = require("../utils/hash-token");

const addRefreshToketToWhiteList = async ({ refreshToken, userId }) => {
  return await db.refreshToken.create({
    data: {
      hashed_token: getHashedToken(refreshToken),
      userId: userId,
      expire_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });
};

const findRefreshToken = async (refreshToken) => {
  return await db.refreshToken.findUnique({
    where: {
      hashed_token: getHashedToken(refreshToken),
    },
  });
};

const makeTokenInvalid = async (refreshTokenId) => {
  return await db.refreshToken.update({
    where: {
      id: refreshTokenId,
    },
    data: {
      revoked: true,
    },
  });
};

const deleteAllRefreshTokens = async (refreshToken) => {
  return await db.refreshToken.deleteMany({
    where: { userId: refreshToken.userId },
  });
};

module.exports = {
  addRefreshToketToWhiteList,
  findRefreshToken,
  makeTokenInvalid,
  deleteAllRefreshTokens,
};
