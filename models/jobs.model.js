const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const jobSchema = new mongoose.Schema({
    title: String,
    location: String,
    thumbnail: String,
    salaryMin: Number,
    salaryMax: Number,
    type: String,
    experience: String,
    status: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    position: Number,
    deleteAt: Date
}, {
    timestamps: true
});


const Job = mongoose.model('Job', jobSchema, "jobs");
module.exports = Job;