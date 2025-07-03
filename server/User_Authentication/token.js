const crypto = require("crypto");

const TOKEN_KEY = crypto.randomBytes(32).toString("hex");

module.exports = {
  TOKEN_KEY: TOKEN_KEY,
};
