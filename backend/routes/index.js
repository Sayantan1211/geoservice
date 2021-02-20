const express = require("express");
const router = express.Router();

const location = require("./location");

router.get("/ping", function (req, res, next) {
  res.send({ message: "pong" });
});

router.get("/location", location.getLocation);

module.exports = router;
