const crypto = require("node:crypto");

const getHashedToken = (token) => {
  return crypto.createHash("sha512").update(token).digest("hex");
};

module.exports = {
    getHashedToken
}
