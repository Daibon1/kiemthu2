const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());

  console.log("✅ Đã kết nối database test");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();

  console.log("✅ Đã đóng kết nối database test");
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
});