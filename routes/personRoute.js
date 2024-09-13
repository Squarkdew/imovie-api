const express = require("express");
const router = express.Router();
const personController = require("../controllers/personController");
router.post("/add", personController.add.bind(personController));
router.post("/delete", personController.delete.bind(personController));
router.post("/get", personController.get.bind(personController));

module.exports = router;
