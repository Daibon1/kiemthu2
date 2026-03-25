const checkNumber=require("../../helpers/checkNumber.js");
const isNumber=checkNumber.isNumber;
module.exports.createPost=(req,res,next)=>{
    if (!isNumber(req.body.salaryMin)) {
        req.body.salaryMin = 0;
        req.flash('error', 'Mức lương tối thiểu phải là số!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (!isNumber(req.body.salaryMax)) {
        req.body.salaryMax = 0;
        req.flash('error', 'Mức lương tối đa phải là số!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (parseInt(req.body.salaryMin) < 0) {
        req.body.salaryMin = 0;
        req.flash('error', 'Mức lương tối thiểu phải là số dương!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (parseInt(req.body.salaryMax) < 0) {
        req.body.salaryMax = 0;
        req.flash('error', 'Mức lương tối đa phải là số dương!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (req.body.title.length==0){
        // res.status(301).json({
        //     success: false,
        //     message: "Tiêu đề công việc không được để trống!"
        // });
        req.flash('error', 'Tiêu đề công việc không được để trống!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (parseInt(req.body.salaryMin) > parseInt(req.body.salaryMax)) {
        req.flash('error', 'Mức lương tối thiểu không được lớn hơn mức lương tối đa!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    next();
}