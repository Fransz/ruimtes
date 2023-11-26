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

app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
