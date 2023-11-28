const express = require("express");
const controller = require("../controllers/loginController");

const router = express.Router();

router.post("", controller.loginUser);

module.exports = router;
