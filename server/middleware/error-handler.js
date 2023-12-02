const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const log = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "log"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "log"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "log", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const errorHandler = (err, req, res, next) => {
  log(`${err.name}: ${err.message}`, "error.log");

  console.log("Error logged");
  console.log(err.stack);

  return res.status(500).send(err.message);
};

module.exports = errorHandler;
