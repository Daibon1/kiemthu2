const Job = require("../../models/jobs.model");
module.exports.index = async (req, res) => {
    const jobs = await Job.find({}).sort({
        position: "desc"
    });
    // console.log(jobs);
    res.render("client/pages/jobs/index", {
        title: "Danh sách công việc",
        jobs: jobs
    });
}

module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;
        const job = await Job.findOne({
            slug: slug,
            status: "active"
        });
        if (job!==null) {
            req.flash("success", "Thành công!");
            res.render("client/pages/jobs/detail", {
                title: "Chi tiết công việc",
                job: job
            })
        }
        else{
            req.flash("error", "Vui lòng thêm slug");
            return res.redirect("/jobs");
        }
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra khi tải dữ liệu!");
        res.redirect(`/jobs`);
    }
}