const express = require('express');
const { authJwt } = require("../middlewares");
const controller = require("../controller/user");
const router = express.Router();

router.post(
  "/signup",
  controller.signup
);
router.post(
  "/view-profile",
  authJwt.verifyToken,
  controller.profile
);
router.post(
  "/update-user-profile",
  authJwt.verifyToken,
  controller.depositToken
);
router.post(
  "/enter-contest",
  authJwt.verifyToken,
  controller.WithdrawToken
);

module.exports = router;