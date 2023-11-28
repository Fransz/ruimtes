const express = require("express");
const controller = require("../controllers/loginController");

const router = express.Router();

router.post("", controller.refreshTokens);

module.exports = router


