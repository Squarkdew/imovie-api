const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
router.post("/add", ratingController.add.bind(ratingController));
router.post("/delete", ratingController.delete.bind(ratingController));
router.post("/get", ratingController.get.bind(ratingController));

module.exports = router;
