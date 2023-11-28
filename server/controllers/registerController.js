const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");

const userFile = path.join(__dirname, "..", "models", "users.json");

const state = {
  users: require(userFile),
  setUsers(es) {
    this.users = es;
  },
};

const registerUser = async (req, res) => {
  const { name, pw } = req.body;

  if (!name || !pw)
    res.status(400).json({ error: "username and password are required" });

  const dup = state.users.find((u) => u.name === name);
  if (dup) res.sendStatus(409);

  try {
    const hashed = await bcrypt.hash(pw, 10);
    const nw = {
      name,
      pw: hashed,
      roles: { user: 2001 },
    };
    state.setUsers([...state.users, nw]);

    await fsPromises.writeFile(userFile, JSON.stringify(state.users));
    res.status(201).json({ status: "succes" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

module.exports = { registerUser };
