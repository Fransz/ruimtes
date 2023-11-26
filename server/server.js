// server/index.js

const path = require("path");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const users = require("./users.json");
const errorHandler = require("./middleware/error-handler");

const app = express();

const PORT = 3002;

const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
