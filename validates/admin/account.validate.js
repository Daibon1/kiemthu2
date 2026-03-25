module.exports.createPost=(req,res,next)=>{
    if (req.body.fullName.length==0){
        req.flash('error', 'Tên không được để trống!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (req.body.email.length==0){
        req.flash('error', 'Email không được để trống!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (req.body.password.length<8){
        req.flash('error', 'Mật khẩu phải có ít nhất 8 ký tự!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    next();
}
module.exports.editPatch=(req,res,next)=>{
    if (req.body.fullName.length==0){
        req.flash('error', 'Tên không được để trống!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (req.body.email.length==0){
        req.flash('error', 'Email không được để trống!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    if (req.body.password.length<8&&req.body.password){
        req.flash('error', 'Mật khẩu phải có ít nhất 8 ký tự!');
        res.redirect(req.get("Referrer") || "/admin/job/create");
        return;
    }
    next();
}
