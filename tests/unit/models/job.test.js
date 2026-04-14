const mongoose = require("mongoose");
const {
    MongoMemoryServer
} = require("mongodb-memory-server");

jest.setTimeout(30000);

let mongoServer;
let Job;
Job = require("../../../models/jobs.model");

describe("Job Model Test", () => {

    test("Create job successfully", async () => {
        const jobData = {
            title: "Backend Developer",
            location: "Hanoi",
            salaryMin: 1000,
            salaryMax: 2000,
            type: "Full-time",
            experience: "2 years",
            status: "active",
            position: 1
        };

        const job = await Job.create(jobData);

        expect(job._id).toBeDefined();
        expect(job.title).toBe("Backend Developer");
        expect(job.slug).toBe("backend-developer");
        expect(job.deleted).toBe(false);
    });

    test("Slug should auto generate unique value", async () => {

        const job1 = await Job.create({
            title: "Frontend Dev"
        });
        const job2 = await Job.create({
            title: "Frontend Dev"
        });

        expect(job1.slug).not.toBe(job2.slug);
    });

    test("Default deleted field is false", async () => {
        const job = await Job.create({
            title: "Tester"
        });

        expect(job.deleted).toBe(false);
    });

    test("Timestamps should exist", async () => {
        const job = await Job.create({
            title: "DevOps"
        });

        expect(job.createdAt).toBeDefined();
        expect(job.updatedAt).toBeDefined();
    });

    test("Soft delete field update", async () => {
        const job = await Job.create({
            title: "Designer"
        });

        job.deleted = true;
        await job.save();

        const updated = await Job.findById(job._id);

        expect(updated.deleted).toBe(true);
    });

});