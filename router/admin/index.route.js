const dashboardRouter = require("./dashboard.route");
const jobRouter = require("./job.route");
const loginRouter = require("./auth.route");
const accountRouter = require("./account.route");
const authRouter = require("./auth.route");
const systemConfig = require("../../config/system");
const Auth = require("../../middlewares/admin/auth.middleware");
module.exports = (app) => {
    app.use(`${systemConfig.prefixAdmin}/login`, loginRouter);
    app.use(`${systemConfig.prefixAdmin}/dashboard`, Auth.requireAuth, dashboardRouter);
    app.use(`${systemConfig.prefixAdmin}/job`, Auth.requireAuth, jobRouter);
    app.use(`${systemConfig.prefixAdmin}/account`, Auth.requireAuth, accountRouter);
    app.use(`${systemConfig.prefixAdmin}/auth`, authRouter);
}