const { users } = require("../db/models");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
async function getUserByToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await users.findOne({ where: { id: decoded.id } });
    return user;
  } catch (error) {
    return null;
  }
}
module.exports = { getUserByToken };
