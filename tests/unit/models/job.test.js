// tests/unit/models/job.test.js
const mongoose = require('mongoose');
const Job = require('../../../models/jobs.model');

describe('Job Model - Kiểm thử model công việc', () => {
    
    // Dữ liệu mẫu
    const jobMau = {
        title: 'Lập trình viên Fullstack',
        location: 'Hà Nội',
        thumbnail: 'https://example.com/job.jpg',
        salaryMin: 15000000,
        salaryMax: 25000000,
        type: 'Full-time',
        experience: '2 năm',
        status: 'active',
        position: 1
    };

    // Xóa collection trước mỗi test
    beforeEach(async () => {
        await Job.deleteMany({});
        // Đảm bảo collection rỗng
        const count = await Job.countDocuments();
        console.log(`Số lượng job trước test: ${count}`);
    });

    // TC01: Tạo job thành công
    test('TC01 - Tạo job thành công', async () => {
        const job = new Job(jobMau);
        const savedJob = await job.save();

        expect(savedJob._id).toBeDefined();
        expect(savedJob.title).toBe('Lập trình viên Fullstack');
        expect(savedJob.slug).toBe('lap-trinh-vien-fullstack');
        expect(savedJob.deleted).toBe(false);
    });

    // TC02: Slug được tạo tự động
    test('TC02 - Slug được tạo tự động từ title', async () => {
        const job = new Job({ ...jobMau, title: 'Test Slug' });
        const savedJob = await job.save();

        expect(savedJob.slug).toBe('test-slug');
    });

    // TC03: Cập nhật job
    test('TC03 - Cập nhật job thành công', async () => {
        const job = new Job(jobMau);
        const savedJob = await job.save();

        savedJob.title = 'Lập trình viên Backend';
        savedJob.salaryMin = 20000000;
        const updatedJob = await savedJob.save();

        expect(updatedJob.title).toBe('Lập trình viên Backend');
        expect(updatedJob.salaryMin).toBe(20000000);
        expect(updatedJob.slug).toBe('lap-trinh-vien-backend');
    });

    // TC04: Xóa mềm job
    test('TC04 - Xóa mềm job', async () => {
        const job = new Job(jobMau);
        const savedJob = await job.save();

        savedJob.deleted = true;
        savedJob.deleteAt = new Date();
        const deletedJob = await job.save();

        expect(deletedJob.deleted).toBe(true);
        expect(deletedJob.deleteAt).toBeDefined();
    });

    // TC05: Tìm job theo type - Tạo từng job riêng lẻ thay vì insertMany
    test('TC05 - Tìm job theo type', async () => {
        // Tạo từng job riêng lẻ để dễ debug
        const job1 = new Job({
            title: 'Fullstack Developer',
            type: 'Full-time',
            location: 'Hà Nội',
            salaryMin: 10000000,
            salaryMax: 20000000,
            experience: '2 năm',
            status: 'active'
        });
        await job1.save();

        const job2 = new Job({
            title: 'Part-time Tester',
            type: 'Part-time',
            location: 'Hồ Chí Minh',
            salaryMin: 15000000,
            salaryMax: 25000000,
            experience: '1 năm',
            status: 'active'
        });
        await job2.save();

        const job3 = new Job({
            title: 'Senior Fullstack',
            type: 'Full-time',
            location: 'Đà Nẵng',
            salaryMin: 20000000,
            salaryMax: 30000000,
            experience: '3 năm',
            status: 'active'
        });
        await job3.save();

        const fulltimeJobs = await Job.find({ type: 'Full-time' });
        
        expect(fulltimeJobs.length).toBe(2);
        expect(fulltimeJobs[0].type).toBe('Full-time');
        expect(fulltimeJobs[1].type).toBe('Full-time');
    });

    // TC06: Timestamps tự động tạo
    test('TC06 - Tự động tạo createdAt và updatedAt', async () => {
        const job = new Job(jobMau);
        const savedJob = await job.save();

        expect(savedJob.createdAt).toBeDefined();
        expect(savedJob.updatedAt).toBeDefined();
        expect(savedJob.createdAt).toBeInstanceOf(Date);
    });
});