// server/index.js

const express = require("express");
const users = require("./users.json");

const app = express();

const PORT = 3002;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
