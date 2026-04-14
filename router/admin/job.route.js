const Controller = require("../../controller/admin/job.controller");
const validate = require("../../validates/admin/job.validate.js")
const express = require("express");
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware");
const router = express.Router();
// const storageMulter = require("../../helpers/storageMulter");

const multer = require('multer')
const upload = multer();
router.get("/", Controller.index);
router.get("/api", Controller.indexApi);
router.patch("/change-status/:status/:id", Controller.changeStatus);
router.patch("/change-multi", Controller.changeMulti);
router.delete("/delete/:id", Controller.deleteItem);
router.get("/create", Controller.create);
router.post("/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    Controller.createPost);
router.get("/edit/:id", Controller.edit);
router.patch("/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    Controller.editPatch);
router.get("/detail/:id", Controller.detail);
module.exports = router;