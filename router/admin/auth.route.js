const Controller = require("../../controller/admin/auth.controller");
const express = require("express");
const router = express.Router();
const validate=require("../../validates/admin/auth.validate");

router.get("/login", Controller.login);
router.post("/login",validate.loginPost,Controller.loginPost);
router.get("/logout", Controller.logout);
module.exports = router;