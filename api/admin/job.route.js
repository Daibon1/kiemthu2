const express = require("express");
const router = express.Router();
const Job = require("../../models/jobs.model");
router.get("/", async (req, res) => {
    const jobs = await Job.find({
        deleted: false
    });
    res.json(jobs);
})

module.exports = router;