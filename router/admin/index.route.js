const dashboardRouter = require("./dashboard.route");
const jobRouter = require("./job.route");
const loginRouter = require("./login.route");
const systemConfig = require("../../config/system");
module.exports = (app) => {
    app.use(`${systemConfig.prefixAdmin}/login`, loginRouter);
    app.use(`${systemConfig.prefixAdmin}/dashboard`, dashboardRouter);
    app.use(`${systemConfig.prefixAdmin}/job`, jobRouter);
}