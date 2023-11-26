const express = require("express");
const path = require("path");

const controller = require("../../controllers/employeesController");

const router = express.Router();

router
  .route("/")
  .get(controller.getEmployees)
  .put(controller.addEmployee)
  .post(controller.updateEmployee)
  .delete(controller.deleteEmployee);

router.route("/:id").get(controller.getEmployee);

module.exports = router;
