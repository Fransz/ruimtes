const express = require("express");
const controller = require("../controllers/registerController");

const router = express.Router();

router.post("", controller.registerUser);

module.exports = router;
