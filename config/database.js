const mongose = require("mongoose");
module.exports.connect = async () => {
    try {
        await mongose.connect(process.env.MONGO_URL);
        console.log("Connect Success!");
    } catch (error) {
        console.log("Connect error");
    }
}