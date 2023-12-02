const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userFile = path.join(__dirname, "..", "models", "users.json");

const state = {
  users: require(userFile),
  setUsers(es) {
    this.users = es;
  },
};

const loginUser = async (req, res) => {
  const { name, pw } = req.body;

  if (!name || !pw)
    return res
      .status(400)
      .json({ error: "username and password are required" });

  const user = state.users.find((u) => u.name === name);
  if (!user) return res.sendStatus(401);

  const match = bcrypt.compare(pw, user.pw);
  if (!match) return res.sendStatus(401);

  const accessToken = jwt.sign(
    { user: { name: user.name } },
    process.env.ACCESS_TOKEN_SECRET,
    { algorithm: "HS256", expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    { user: { name: user.name } },
    process.env.REFRESH_TOKEN_SECRET,
    { algorithm: "HS256", expiresIn: "1d" }
  );

  const others = state.users.filter((u) => u.name !== name);
  state.setUsers([...others, { ...user, refreshToken }]);

  await fsPromises.writeFile(userFile, JSON.stringify(state.users));
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 86400,
  });
  return res.status(200).json({ accessToken });
};

const refreshTokens = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = state.users.find((u) => (u.refreshToken = refreshToken));
  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err || user.name !== decoded.user.name) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { user: { name: user.name } },
        process.env.ACCESS_TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "1m" }
      );
      return res.status(200).json({ accessToken });
    }
  );
};

module.exports = { loginUser, refreshTokens };
