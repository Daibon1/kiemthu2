module.exports.loginPost = (req, res, next) => {
    if (req.body.email.length == 0|| req.body.email.includes(" ")) {
        req.flash('error', 'Email không được để trống!');
        res.redirect(req.get("Referrer") || "/admin/auth/login");
        return;
    }
    if (req.body.email.length > 30) {
        req.flash('error', 'Email tối đa 30 ký tự!');
        res.redirect(req.get("Referrer") || "/admin/auth/login");
        return;
    }
    if (req.body.password.length < 8) {
        req.flash('error', 'Mật khẩu phải có ít nhất 8 ký tự!');
        res.redirect(req.get("Referrer") || "/admin/auth/login");
        return;
    }
    if (req.body.password.length > 30) {
        req.flash('error', 'Email tối đa 30 ký tự!');
        res.redirect(req.get("Referrer") || "/admin/auth/login");
        return;
    }
    if (req.body.password.length == 0 || req.body.password.includes(" ")) {
        req.flash('error', 'Mật khẩu không được để trống!');
        res.redirect(req.get("Referrer") || "/admin/auth/login");
        return;
    }
    next();
}