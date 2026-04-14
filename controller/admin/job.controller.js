const Job = require("../../models/jobs.model")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const filterSearchHelper = require("../../helpers/filterSearch.js")
const paginationHelper = require("../../helpers/pagination.js")
const systemConfig = require("../../config/system.js");
// [GET] /admin/job
module.exports.index = async (req, res) => {
    let filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    let filterLocation = filterSearchHelper(req.query).filterLocation;
    const keyword = filterSearchHelper(req.query).title;
    const location = filterSearchHelper(req.query).location;
    const regex = filterSearchHelper(req.query).regex;
    if (regex) {
        find.title = regex;
    }
    if (location) {
        find.location = location;
    }
    // pagination
    const countJobs = await Job.countDocuments(find);
    let objectPagination = paginationHelper({
        limitItem: 4,
        skipItem: 0,
        page: 1
    }, req.query, countJobs);
    // console.log(req.originalUrl);
    // end pagination
    const jobs = await Job.find(find)
        .sort({
            position: "desc"
        })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skipItem);
    // res.json(jobs);
    res.render("admin/pages/job/index", {
        title: "Trang quản lý công việc",
        message: 'Hello, world!',
        currentUrl: req.originalUrl,
        jobs: jobs,
        filterStatus: filterStatus,
        keyword: keyword,
        filterLocation: filterLocation,
        pagination: objectPagination
    })
    // console.log(req.originalUrl);
    // console.log(req.body);
}
module.exports.indexApi = async (req, res) => {
    const jobs = await Job.find({
    });
    res.json(jobs);
}
//[PATCH] /admin/job/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;
    // console.log(status);
    // console.log(id);
    try {
        await Job.updateOne({
            _id: id
        }, {
            status: status
        })
        req.flash('success', 'Cập nhật trạng thái thành công!');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Có lỗi xảy ra khi cập nhật trạng thái!');
    }
    res.redirect(req.get("Referrer") || "/admin/job");
}
// [PATCH] /admin/job/change-multi
module.exports.changeMulti = async (req, res) => {
    let type = req.body.type;
    let ids = req.body.ids;
    ids = ids.split(", ");
    // console.log(ids);
    switch (type) {
        case "active":
            try {
                await Job.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    status: "active"
                })
                req.flash('success', `Cập nhật trạng thái cho ${ids.length} jobs thành công!`);

            } catch (error) {
                console.error(error);
                req.flash('error', `Có lỗi xảy ra khi cập nhật trạng thái cho ${ids.length} jobs!`);
            }
            break;
        case "inactive":
            try {
                await Job.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    status: "inactive"
                })
                req.flash('success', `Cập nhật trạng thái cho ${ids.length} jobs thành công!`);
            } catch (error) {
                console.error(error);
                req.flash('error', `Có lỗi xảy ra khi cập nhật trạng thái cho ${ids.length} jobs!`);
            }
            break;
        case "delete-all":
            try {
                await Job.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    deleted: true,
                    deleteAt: new Date()
                })
                req.flash('success', `Xóa thành công ${ids.length} jobs!`);
            } catch (error) {
                console.error(error);
                req.flash('error', `Có lỗi xảy ra khi xóa ${ids.length} jobs!`);
            }
            break;
        case "change-position":
            try {
                for (const item of ids) {
                    let [id, position] = item.split("-");
                    position = parseInt(position);
                    await Job.updateOne({
                        _id: id
                    }, {
                        position: position
                    })
                }
                req.flash('success', `Cập nhật vị trí cho ${ids.length} jobs thành công!`);
            } catch (error) {
                console.error(error);
                req.flash('error', `Có lỗi xảy ra khi cập nhật vị trí cho ${ids.length} jobs!`);
            }
            break;
    }
    res.redirect(req.get("Referrer") || "/admin/job");
}
//"[DELETE] /admin/job/delete/:id"
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        await Job.updateOne({
            _id: id
        }, {
            deleted: true,
            deleteAt: new Date()
        })
        req.flash('success', 'Xóa thành công!');
    } catch (error) {
        console.error(error);
    }
    res.redirect(req.get("Referrer") || "/admin/job");
}
//[GET] /admin/job/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/job/create", {
        title: "Trang tạo công việc"
    })
}
//[POST] /admin/job/create
module.exports.createPost = async (req, res) => {
    req.body.salaryMin = parseInt(req.body.salaryMin);
    req.body.salaryMax = parseInt(req.body.salaryMax);
    if (!req.body.position) {
        const countJobs = await Job.countDocuments();
        req.body.position = countJobs + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const newJob = new Job(req.body);
    try {
        await newJob.save();
        req.flash('success', 'Tạo công việc thành công!');
        res.redirect(`${systemConfig.prefixAdmin}/job`);
    } catch (error) {
        console.error(error);
        req.flash('error', 'Có lỗi xảy ra khi tạo công việc!');
        res.redirect(req.get("Referrer") || `${systemConfig.prefixAdmin}/job/create`);
    }
    // console.log(req.body);
}
// console.log(keyword);
// consolek.log(status);
//[GET] /admin/job/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        let find = {
            _id: id,
            deleted: false
        }
        const job = await Job.findOne(find);
        res.render("admin/pages/job/edit", {
            title: "Cập nhật công việc",
            job: job
        })
    } catch (error) {
        console.error(error);
        res.redirect(`${systemConfig.prefixAdmin}/job`);
    }
}
//[PATCH] /admin/job/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.salaryMin = parseInt(req.body.salaryMin);
    req.body.salaryMax = parseInt(req.body.salaryMax);
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    req.body.position = parseInt(req.body.position);
    try {
        await Job.updateOne({
            _id: id
        }, req.body);
        req.flash('success', 'Cập nhật công việc thành công!');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Có lỗi xảy ra khi cập nhật công việc!');
    }
    res.redirect(`${systemConfig.prefixAdmin}/job/edit/${id}`);
}
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    try {
        const job = await Job.findOne({
            _id: id
        });
        res.render("admin/pages/job/detail", {
            title: "Chi tiết công việc",
            job: job
        })
    } catch (error) {
        console.error(error);
        res.redirect(res.get("Referrer") || "/admin/job");
    }
}