const jobRouter = require("./job.route");
const authRouter = require("./auth.route");
const accountRouter = require("./account.route");
const systemConfig = require("../../config/system");

module.exports = (app) => {
    app.use(`${systemConfig.prefixAdmin}/api/job`, jobRouter);
    app.use(`${systemConfig.prefixAdmin}/api/auth`, authRouter);
}