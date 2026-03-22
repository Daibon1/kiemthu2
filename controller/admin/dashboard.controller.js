module.exports.dashboard = (req, res) => {
   res.render("admin/pages/dashboard/index", {
      title: "Trang Dashboard",
      message: 'Hello, world!',
      active:"active",
      currentUrl: req.originalUrl
   })
   console.log(req.originalUrl);
}