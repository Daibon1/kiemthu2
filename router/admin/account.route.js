const Controller=require("../../controller/admin/account.controller");
const validate = require("../../validates/admin/account.validate")
const express=require("express");
const router=express.Router();
const storageMulter = require("../../helpers/storageMulter");
const multer = require('multer')
const upload = multer({
    storage: storageMulter()
});
router.get("/",Controller.index);
router.get("/create",Controller.create);
router.post("/create",
    upload.single('avatar'),
    validate.createPost,
    Controller.createPost);
router.get("/edit/:id",Controller.edit);
router.patch("/edit/:id",
    upload.single('avatar'),
    validate.editPatch,
    Controller.editPatch);
module.exports=router;