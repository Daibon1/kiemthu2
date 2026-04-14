const request = require("supertest");
jest.mock("../../middlewares/admin/auth.middleware", () => ({
  requireAuth: (req, res, next) => next()
}));

const app = require("../../app");
const Job = require("../../models/jobs.model");

describe("Create Job Integration", () => {

  test("Create job success and redirect", async () => {

    const response = await request(app)
      .post("/admin/job/create")
      .send({
        title: "Backend Dev",
        salaryMin: "1000",
        salaryMax: "2000"
      });

    // ✅ controller redirect
    expect(response.statusCode).toBe(302);

    expect(response.headers.location)
      .toBe("/admin/job");

    // ✅ verify database
    const job = await Job.findOne({
      title: "Backend Dev"
    });

    expect(job).not.toBeNull();
    expect(job.salaryMin).toBe(1000);
    expect(job.position).toBe(1);
  });

});