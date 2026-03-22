module.exports.createPost=(req,res,next)=>{
    if (isNaN(req.body.salaryMin)) {
        req.body.salaryMin = 0;
        req.flash('error', 'Mức lương tối thiểu phải là số!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (isNaN(req.body.salaryMax)) {
        req.body.salaryMax = 0;
        req.flash('error', 'Mức lương tối đa phải là số!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
    }
    if (req.body.salaryMin < 0) {
        req.body.salaryMin = 0;
        req.flash('error', 'Mức lương tối thiểu phải là số nguyên!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (req.body.salaryMax < 0) {
        req.body.salaryMax = 0;
        req.flash('error', 'Mức lương tối đa phải là số nguyên!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (req.body.title.length==0){
        req.flash('error', 'Tiêu đề công việc không được để trống!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (req.body.salaryMin > req.body.salaryMax) {
        req.flash('error', 'Mức lương tối thiểu không được lớn hơn mức lương tối đa!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    next();
}