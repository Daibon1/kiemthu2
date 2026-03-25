const request = require("supertest");
const app = require("../../app");
const Job=require("../../models/jobs.model");
describe("User API", () => {

    beforeEach(async () => {
    // 👇 tạo data test);
    await Job.create({
      title: "Job 1",
      description: "Job 1 description",
      location: "Location 1",
      experience: "Experience 1",
      type: "Full-time",
      salaryMin: 1000000,
      salaryMax: 2000000,
      position: 1,
      thumbnail: "/uploads/thumbnail.png",
      status: "active"
    });
    await Job.create({
      title: "Job 2",
      description: "Job 2 description",
      location: "Location 2",
      experience: "Experience 2",
      type: "Full-time",
      salaryMin: 1000000,
      salaryMax: 2000000,
      position: 2,
      thumbnail: "/uploads/thumbnail.png",
      status: "active",
      delete:true
    });
    await Job.create({
      title: "Job 3",
      description: "Job 3 description",
      location: "Location 3",
      experience: "Experience 3",
      type: "Full-time",
      salaryMin: 1000000,
      salaryMax: 2000000,
      position: 3,
      thumbnail: "/uploads/thumbnail.png",
      status: "active"
    });
    await Job.create({
      title: "Job 4",
      description: "Job 4 description",
      location: "Location 4",
      experience: "Experience 4",
      type: "Full-time",
      salaryMin: 1000000,
      salaryMax: 2000000,
      position: 4,
      thumbnail: "/uploads/thumbnail.png",
      status: "active"
    });
  });
//   it("POST /users - tạo user", async () => {
//     const res = await request(app)
//       .post("/users")
//       .send({ name: "An" });

//     expect(res.statusCode).toBe(201);
//     expect(res.body.name).toBe("An");
//   });

  it("GET /jobs - lấy danh sách", async () => {
    // await request(app).post("/api/job").send({

    const res = await request(app).get("/admin/api/job");

    expect(res.statusCode).toBe(200);
    // console.log(res.body);
    expect(res.body.length).toBe(4);
  });

});