const Job=require("../../models/jobs.model");
module.exports.index =async (req, res) => {
    const jobs=await Job.find({}).sort({position:"desc"});
    console.log(jobs);
    res.render("client/pages/jobs/index", {
        title: "Danh sách công việc",
        jobs:jobs
    });
}




module.exports.detail = async (req, res) => {
    try{
        const id=req.params.id;
        const job=await Job.findOne({_id:id});
        res.render("client/pages/jobs/detail",{
            title:"Chi tiết công việc",
            job:job
        })
    }
    catch(error){
        console.error(error);
        res.redirect(`/job`);
    }
}
