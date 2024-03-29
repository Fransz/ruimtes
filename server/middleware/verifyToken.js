const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization || req.header.Authorization;
  if (!header) return res.sendStatus(401);

  const token = header.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.user;
    next();
  });
};

module.exports = verifyToken;
