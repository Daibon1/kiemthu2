const Job=require("../../models/jobs.model");


module.exports.dashboard =async (req, res) => {
   const sumJob = await Job.countDocuments({deleted:false});
   const activeJob = await Job.countDocuments({deleted:false,status:'active'});
   const inactiveJob = await Job.countDocuments({deleted:false,status:'inactive'});
   res.render("admin/pages/dashboard/index", {
      title: "Trang Dashboard",
      message: 'Hello, world!',
      active:"active",
      activeJob:activeJob,
      inactiveJob:inactiveJob,
      sumJob:sumJob,
      currentUrl: req.originalUrl
   })
   // console.log(req.originalUrl);
}