// tests/setup.js
const mongoose = require('mongoose');

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://localhost:27017/test_db');
        console.log('✅ Đã kết nối database test');
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        // Xóa toàn bộ dữ liệu trong database test
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        console.log('✅ Đã đóng kết nối database test');
    }
});

// Reset dữ liệu trước mỗi test (nếu cần)
beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});