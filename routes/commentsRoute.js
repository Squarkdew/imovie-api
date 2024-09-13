const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
router.post("/add", commentsController.add.bind(commentsController));
router.post("/delete", commentsController.delete.bind(commentsController));
router.post("/change", commentsController.change.bind(commentsController));

module.exports = router;
