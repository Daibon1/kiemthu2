const mongoose = require("mongoose");
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect Success!");
        console.log(
            "STATE:",
            mongoose.connection.readyState
        );
    } catch (error) {
        console.log("Connect error:", error);
    }
}