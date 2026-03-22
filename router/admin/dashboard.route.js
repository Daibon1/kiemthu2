const Controller=require("../../controller/admin/dashboard.controller");
const express=require("express");
const router=express.Router();


router.get("/",Controller.dashboard);

module.exports=router;