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
    res.status(400).json({ error: "username and password are required" });

  const user = state.users.find((u) => u.name === name);
  if (!user) res.sendStatus(409);

  const match = bcrypt.compare(pw, user.pw);
  if (!match) res.sendStatus(401);

  const accessToken = jwt.sign(
    { user: { name: user.name } },
    process.env.ACCESS_TOKEN_SECRET,
    { algorithm: "HS256", expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    { user: { name: user, name } },
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
  res.status(200).json({ accessToken });
};

module.exports = { loginUser };
