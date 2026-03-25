const express = require("express");
const router = express.Router();
const md5 = require('md5');
const validate = require("../../validatesapi/admin/auth.validate");
const Account = require("../../models/account.model");
router.post("/login", validate.loginPostApi, async (req, res) => {
    try {
        const email = String(req.body.email);
        const password = String(req.body.password);

        const user = await Account.findOne({
            email: email,
            deleted: false
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email không tồn tại'
            });
        }

        if (md5(password) !== user.password) {
            return res.status(401).json({
                success: false,
                message: 'Mật khẩu không đúng'
            });
        }

        if (user.status === "inactive") {
            return res.status(403).json({
                success: false,
                message: 'Tài khoản bị khóa'
            });
        }

        // Nếu muốn vẫn dùng cookie
        res.cookie('token', user.token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // Trả về dữ liệu người dùng hoặc token
        return res.json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                token: user.token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ, thử lại sau!'
        });
    }
});

module.exports = router;