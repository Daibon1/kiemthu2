module.exports.loginPostApi = (req, res, next) => {

    if (!req.body.email || req.body.email.length === 0 || req.body.email.includes(" ")) {
        return res.json({
            success: false,
            message: "Email không được để trống!"
        });
    }

    if (req.body.email.length > 30) {
        return res.json({
            success: false,
            message: "Email tối đa 30 ký tự!"
        });
    }

    if (!req.body.password || req.body.password.length === 0 || req.body.password.includes(" ")) {
        return res.json({
            success: false,
            message: "Mật khẩu không được để trống!"
        });
    }

    if (req.body.password.length < 8) {
        return res.json({
            success: false,
            message: "Mật khẩu phải có ít nhất 8 ký tự!"
        });
    }

    if (req.body.password.length > 30) {
        return res.json({
            success: false,
            message: "Mật khẩu tối đa 30 ký tự!"
        });
    }

    next();
};