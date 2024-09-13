const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
router.post("/add", favoritesController.add.bind(favoritesController));
router.post("/delete", favoritesController.delete.bind(favoritesController));

module.exports = router;
