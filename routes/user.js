const express = require('express');
const { authJwt } = require("../middlewares");
const controller = require("../controller/user");
const router = express.Router();

router.post(
  "/signup",
  controller.signup
);
router.post(
  "/signin",
  controller.signin
);
router.post(
  "/view-profile",
  authJwt.verifyToken,
  controller.profile
);
router.post(
  "/deposit-token",
  authJwt.verifyToken,
  controller.depositToken
);
router.post(
  "/withdraw-token",
  authJwt.verifyToken,
  controller.withdrawToken
);

module.exports = router;