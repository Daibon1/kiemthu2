const Account = require("../../models/account.model");
module.exports.requireAuth =async (req, res, next) =>{
    if(!req.cookies.token){
        req.flash('error', 'Bạn chưa đăng nhập!');
        res.redirect(res.get("Referrer") || "/admin/auth/login");
    }
    else{
        const token=req.cookies.token;
        const user=await Account.findOne({token:token});
        if(!user){
            req.flash('error', 'Bạn chưa đăng nhập!');
            res.redirect(res.get("Referrer") || "/admin/auth/login");
        }
        else{
            next();
        }
    }
}